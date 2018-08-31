import { DataModelIDbTaskConfiguration, IDataModelIDbTaskConfiguration } from '../DataModel/DataModelIDbTaskConfiguration';
import { IEasyLogger } from '../Logger/EasyLogger';
import { ITaskConfiguration } from '../Tasking/ITaskConfiguration';
import { ITaskName } from '../Tasking/ITaskName';
import { ITaskStatus } from '../Tasking/ITaskStatus';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { TaskNameIDb } from './TaskNameIDb';
import { TaskStatusesIDb } from './TaskStatusesIDb';
import { TaskStatusIDb } from './TaskStatusIDb';

export class TaskConfigurationIDb implements ITaskConfiguration {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private idValue: Number,
    private logger: IEasyLogger,
  ) { }

  public id(): Number {
    return this.idValue;
  }

  public activated(): Promise<Boolean> {
    return this.dataBase
      .taskConfigurations
      .get(this.idValue)
      .then((result: IDataModelIDbTaskConfiguration) => result.activated);
  }

  public taskName(): Promise<ITaskName> {
    return this.dataBase
      .transaction("r",
        this.dataBase.taskConfigurations,
        this.dataBase.taskNames,
        async () => {
          let taskNameId = await this.dataBase
            .taskConfigurations
            .get(this.idValue)
            .then((result: IDataModelIDbTaskConfiguration) => result.taskNameId);
          return new TaskNameIDb(this.dataBase, taskNameId);
        });
  }

  public exectionIntervalSeconds(): Promise<Number> {
    return this.dataBase
      .taskConfigurations
      .get(this.idValue)
      .then((result: IDataModelIDbTaskConfiguration) => result.executionIntervalSeconds);
  }

  public lastExectionDate(): Promise<Date> {
    return this.dataBase
      .taskConfigurations
      .get(this.idValue)
      .then((result: IDataModelIDbTaskConfiguration) => result.lastExecutionDate);
  }

  public lastExecutionStatus(): Promise<ITaskStatus> {
    return this.dataBase
      .transaction("r", this.dataBase.taskConfigurations, this.dataBase.taskStatuses, async () => {
        let taskConfigurationInDb = await this.dataBase.taskConfigurations.get(this.id());
        let taskStatesInDb = this.dataBase.taskStatuses.filter(ts => ts.id === taskConfigurationInDb!.lastExecutionStatusId);
        if (await taskStatesInDb.count() === 1) {
          return new TaskStatusIDb(
            this.dataBase,
            (await taskStatesInDb.first())!.id!
          );
        } else {
          throw `${taskConfigurationInDb!.taskNameId}: no task state found`;
        }
      });
  }

  public async updateLastExecution(
    lastExecutionStatus: ITaskStatus,
    lastExecutionTime: Date,
  ): Promise<void> {
    let lastExecutionStatusName = await lastExecutionStatus.name();
    this.logger.debug(`update: new last execution status: ${lastExecutionStatusName}; last execution time: ${lastExecutionTime}`);
    this.dataBase
      .transaction(
        "rw",
        this.dataBase.taskConfigurations,
        this.dataBase.taskStatuses,
        this.dataBase.taskNames,
        async () => {
          let taskStatusInDb = await (new TaskStatusesIDb(this.dataBase, this.logger).getOrAdd(lastExecutionStatusName));
          this.dataBase
            .taskConfigurations
            .update(this.id(),
              new DataModelIDbTaskConfiguration(
                await this.activated(),
                (await this.taskName()).id(),
                taskStatusInDb.id(),
                lastExecutionTime,
                await this.exectionIntervalSeconds()
              ));
        });
  }
}
