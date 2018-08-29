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
import { HtmlTablesByTagName } from '../Toolkit/HtmlTablesByTagName';
import { NumberFromString } from '../Toolkit/NumberFromString';
import { ITable } from '../Toolkit/Table';
import { TextByXmlHttpRequest } from '../Toolkit/TextByXmlHttpRequest';
import { Url } from '../Toolkit/Url';
import { Value } from '../Toolkit/Value';
import { ITask } from './ITask';
import { ITaskConfiguration } from './ITaskConfiguration';
import { ITaskConfigurations } from './ITaskConfigurations';
import { ITaskStatus } from './ITaskStatus';
import { TaskStatusSuccessful } from './TaskStatusSuccessful';

export class Task implements ITask {
  private cacheTaskConfig: ITaskConfiguration;
  private ressourcePlayerTransferImportNumber: IRessource;
  private ressourcePlayerTransferImportPosition: IRessource;
  private ressourcePlayerTransferImportAge: IRessource;
  private ressourcePlayerTransferImportStrength: IRessource;
  private ressourcePlayerTransferImportPrice: IRessource;

  constructor(
    private taskConfigs: ITaskConfigurations,
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

  public async name(): Promise<String> {
    return (await this.taskConfig()).taskName();
  }

  public async run(): Promise<void> {
    let taskConfig = await this.taskConfig();
    let taskName = await taskConfig.taskName();
    let activated = await taskConfig.activated();
    let lastExecutionTime = await taskConfig.lastExectionDate();
    let lastExecutionState = await taskConfig.lastExecutionStatus();
    let executionIntervalSeconds = await taskConfig.exectionIntervalSeconds();
    let nextExecution = new Date(lastExecutionTime.getTime() + (1000 * executionIntervalSeconds.valueOf()));

    this.log.debug(`name: ${taskName};activated: ${activated}; last execution state: ${await lastExecutionState.name()}; last execution: ${await lastExecutionTime}; execution interval (sec): ${executionIntervalSeconds} => next planned execution: ${nextExecution}`);

    let now = new Date();
    if (
      true
      && activated
      && (!(await lastExecutionState.name()).match((await new TaskStatusSuccessful().name()).toString())
        || nextExecution <= now)) {
      this.log.debug(`${taskName}: started taks execution`);
      await this.save(this.matchday);
      await taskConfig.updateLastExecution(new TaskStatusSuccessful(), new Date());
      this.log.debug(`${taskName}: finished taks execution`);
    }
  }

  private async taskConfig(): Promise<ITaskConfiguration> {
    if (this.cacheTaskConfig === undefined) {
      // fill cache
      this.log.debug(`fill caching object with new task configuration`);
      this.cacheTaskConfig = await this.taskConfigs.add(
        this.taskName,
        this.activated,
        await this.lastExecutionStatus.name(),
        this.lastExecutionTime,
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
    let serverUri = await (await matchday.gameServer()).uri();
    let day = await matchday.day();
    let downloadUrl = `transfer/spielerwechsel_export.php`;
    let uri = `http://${serverUri}/${downloadUrl}?select_spieltag=${day}&seite=alle`;
    this.log.debug(`about to download player transfers from: ${uri}`);
    let dom = (await new DomFromStringAsync(
      new TextByXmlHttpRequest(
        new Url(uri),
        "GET",
        true))
      .dom())
      .documentElement;
    this.log.debug(`downloaded player transfers from: ${uri}`);

    let tables = new HtmlTablesByTagName(dom).tables();
    this.log.debug(`number of tables: ${tables.length}`);

    return tables[1];
  }
}
