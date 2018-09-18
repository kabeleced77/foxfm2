import { IMatchday } from '../IMatchday';
import { FoxfmIndexedDb } from '../IndexedDb/FoxfmIndexedDb';
import { PlayerTransfersIDb } from '../IndexedDb/PlayerTransfersIDb';
import { IEasyLogger } from '../Logger/EasyLogger';
import {
  IRessource,
  RessourcePlayerTransferImportFieldAge,
  RessourcePlayerTransferImportFieldNumber,
  RessourcePlayerTransferImportFieldPosition,
  RessourcePlayerTransferImportFieldPrice,
  RessourcePlayerTransferImportFieldStrength,
} from '../Ressource';
import { DomFromStringAsync } from '../Toolkit/DomFromStringAsync';
import { FetchedText } from '../Toolkit/FetchedText';
import { HtmlTablesByTagName } from '../Toolkit/HtmlTablesByTagName';
import { NumberFromString } from '../Toolkit/NumberFromString';
import { ITable } from '../Toolkit/Table';
import { Url } from '../Toolkit/Url';
import { Value } from '../Toolkit/Value';
import { ITask } from './ITask';
import { ITaskConfiguration } from './ITaskConfiguration';
import { ITaskConfigurations } from './ITaskConfigurations';
import { ITaskExecution } from './ITaskExecution';
import { ITaskExecutions } from './ITaskExecutions';
import { ITaskName } from './ITaskName';
import { ITaskStatus } from './ITaskStatus';
import { TaskStatusFailed } from './TaskStatusFailed';
import { TaskStatusSuccessful } from './TaskStatusSuccessful';

export class Task implements ITask {
  private cacheTaskConfig: ITaskConfiguration;
  private cacheTaskExecution: ITaskExecution;
  private ressourcePlayerTransferImportNumber: IRessource;
  private ressourcePlayerTransferImportPosition: IRessource;
  private ressourcePlayerTransferImportAge: IRessource;
  private ressourcePlayerTransferImportStrength: IRessource;
  private ressourcePlayerTransferImportPrice: IRessource;

  constructor(
    private taskConfigs: ITaskConfigurations,
    private taskExecutions: ITaskExecutions,
    private taskName: String,
    private activated: Boolean,
    private lastExecutionStatus: ITaskStatus,
    private lastExecutionTime: Date,
    private executionIntervalSeconds: Number,
    private matchday: IMatchday,
    private dataBase: FoxfmIndexedDb,
    private log: IEasyLogger,
  ) {
    this.ressourcePlayerTransferImportNumber = new RessourcePlayerTransferImportFieldNumber();
    this.ressourcePlayerTransferImportPosition = new RessourcePlayerTransferImportFieldPosition();
    this.ressourcePlayerTransferImportAge = new RessourcePlayerTransferImportFieldAge();
    this.ressourcePlayerTransferImportStrength = new RessourcePlayerTransferImportFieldStrength();
    this.ressourcePlayerTransferImportPrice = new RessourcePlayerTransferImportFieldPrice();
  }

  public async name(): Promise<ITaskName> {
    return (await this.taskConfig()).taskName();
  }

  public async run(): Promise<void> {
    try {
      // get task configuration
      let taskConfig = await this.taskConfig();
      let taskName = await (await taskConfig.taskName()).name();
      let activated = await taskConfig.activated();
      let executionIntervalSeconds = await taskConfig.exectionIntervalSeconds();
      // get last task execution
      let taskExecution = await this.taskExecution();
      let lastExecutionTime = await taskExecution.exectionDate();
      let lastExecutionState = await taskExecution.executionStatus();
      let nextExecution = new Date(lastExecutionTime.getTime() + (1000 * executionIntervalSeconds.valueOf()));

      this.log.debug(`name: ${taskName};activated: ${activated}; last execution state: ${await lastExecutionState.name()}; last execution: ${await lastExecutionTime}; execution interval (sec): ${executionIntervalSeconds} => next planned execution: ${nextExecution}`);

      let now = new Date();
      let executionStatus: ITaskStatus = new TaskStatusFailed();
      if (
        true
        && activated
        && (!(await lastExecutionState.name()).match((await new TaskStatusSuccessful().name()).toString())
          || nextExecution <= now)) {
        try {
          this.log.debug(`${taskName}: started taks execution`);
          await this.save(this.matchday);
          executionStatus = new TaskStatusSuccessful();
        } catch (e) {
          throw new Error(`Could not save player transfers into db: '${taskName}': ${e}`);
        } finally {
          let statusName = await executionStatus.name();
          let time = new Date();
          this.log.info(`task '${taskName}' finished execution '${statusName}' at ${time}.`);
          await this.taskExecutions.getOrAdd(
            taskName,
            statusName,
            time,
            this.matchday,
          );
        }
      }
    } catch (e) {
      throw new Error(`Running task: ${e}`);
    }
  }

  private async taskExecution(): Promise<ITaskExecution> {
    if (this.cacheTaskExecution === undefined) {
      // fill cache
      this.log.debug(`fill caching object with new task execution`);
      this.cacheTaskExecution = await this.taskExecutions
        .getOrAdd(
          this.taskName,
          await this.lastExecutionStatus.name(),
          this.lastExecutionTime,
          this.matchday,
        );
    } else {
      this.log.debug(`using cached object`);
    }
    return this.cacheTaskExecution;
  }

  private async taskConfig(): Promise<ITaskConfiguration> {
    if (this.cacheTaskConfig === undefined) {
      // fill cache
      this.log.debug(`fill caching object with new task configuration`);
      this.cacheTaskConfig = await this.taskConfigs.getOrAdd(
        this.taskName,
        this.activated,
        this.executionIntervalSeconds,
      );
    } else {
      this.log.debug(`using cached object`);
    }
    return this.cacheTaskConfig;
  }

  private async save(matchday: IMatchday): Promise<void> {
    this.log.info(`will now get player transfers of matchday 'Season: ${await matchday.season()}-Day: ${await matchday.day()}'`);

    let transferTable = (await this.playerTransferTable(matchday)).table();
    let transferTableFirstRow = transferTable.rows.item(0);

    let columnValues = "";
    for (let i = 0; i < transferTableFirstRow.cells.length; i++) {
      columnValues += `${transferTableFirstRow.cells.item(i).innerHTML};`;
    }
    this.log.debug(`first row: ${columnValues}`);
    this.log.debug(`number of rows of 2nd table: ${transferTable.rows.length}`);

    let colIdxNumber = this.columnIndex(transferTableFirstRow, this.ressourcePlayerTransferImportNumber.value());
    let colIdxPosition = this.columnIndex(transferTableFirstRow, this.ressourcePlayerTransferImportPosition.value());
    let colIdxAge = this.columnIndex(transferTableFirstRow, this.ressourcePlayerTransferImportAge.value());
    let colIdxStrength = this.columnIndex(transferTableFirstRow, this.ressourcePlayerTransferImportStrength.value());
    let colIdxPrice = this.columnIndex(transferTableFirstRow, this.ressourcePlayerTransferImportPrice.value());

    let playerTransfersIDb = new PlayerTransfersIDb(this.dataBase);
    let gameServerId = await matchday.gameServerId();
    let matchdayId = matchday.id();

    // start from second row
    for (let i = 1; i < transferTable.rows.length; i++) {
      let cells = transferTable.rows.item(i).cells;

      await playerTransfersIDb.add(
        gameServerId,
        matchdayId,
        this.stringToNumberArray(cells.item(colIdxNumber).innerHTML),
        cells.item(colIdxPosition).innerHTML,
        this.stringToNumberArray(cells.item(colIdxAge).innerHTML),
        this.stringToNumberArray(cells.item(colIdxStrength).innerHTML),
        this.stringToNumberArray(cells.item(colIdxPrice).innerHTML),
      );
    }
  }

  private stringToNumberArray(value: String): Number {
    return new NumberFromString(
      new Value<String>(
        value,
      ),
      ""
    ).value();
  }

  private columnIndex(row: HTMLTableRowElement, name: String): any {
    let index = -1;
    for (let i = 0; i < row.cells.length; i++) {
      if (row.cells.item(i).innerHTML === name) {
        index = i;
        break;
      }
    }
    this.log.debug(`index of column '${name}' in column ${JSON.stringify(row)}: ${index}`);
    return index;
  }

  private async playerTransferTable(matchday: IMatchday): Promise<ITable<HTMLTableElement>> {
    try {
      let serverUri = await (await matchday.gameServer()).uri();
      let day = await matchday.day();
      let downloadUrl = `transfer/spielerwechsel_export.php`;
      let uri = `http://${serverUri}/${downloadUrl}?select_spieltag=${day}&seite=alle`;
      this.log.debug(`about to download player transfers from: ${uri}`);
      let dom = (await new DomFromStringAsync(
        new FetchedText(
          new Url(uri),
        ))
        .dom())
        .documentElement;
      this.log.debug(`downloaded player transfers from: ${uri}`);

      let tables = new HtmlTablesByTagName(dom).tables();
      this.log.debug(`number of tables: ${tables.length}`);

      return tables[1];
    } catch (e) {
      throw new Error(`Could not get tables from player transfer downloaded file: ${e}`);
    }
  }
}
