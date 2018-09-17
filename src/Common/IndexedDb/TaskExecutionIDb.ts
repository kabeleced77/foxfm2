import { IDataModelIDbTaskExecution } from '../DataModel/DataModelIDbTaskExecution';
import { ITaskExecution } from '../Tasking/ITaskExecution';
import { ITaskName } from '../Tasking/ITaskName';
import { ITaskStatus } from '../Tasking/ITaskStatus';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { TaskNameIDb } from './TaskNameIDb';
import { TaskStatusIDb } from './TaskStatusIDb';

export class TaskExecutionIDb implements ITaskExecution {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private idValue: Number,
  ) { }

  public id(): Number {
    return this.idValue;
  }

  public taskName(): Promise<ITaskName> {
    return this.dataBase
      .transaction(
        "r",
        this.dataBase.taskExecutions,
        this.dataBase.taskNames,
        async () => {
          let taskExecutionInDb = await this.dataBase.taskExecutions.get(this.id());
          return new TaskNameIDb(
            this.dataBase,
            taskExecutionInDb!.taskNameId,
          );
        });
  }

  public executionStatus(): Promise<ITaskStatus> {
    return this.dataBase
      .transaction(
        "r",
        this.dataBase.taskExecutions,
        this.dataBase.taskStatuses,
        async () => {
          let taskExecutionInDb = await this.dataBase.taskExecutions.get(this.id());
          return new TaskStatusIDb(
            this.dataBase,
            taskExecutionInDb!.executionStatusId,
          );
        });
  }

  public exectionDate(): Promise<Date> {
    return this.dataBase
      .taskExecutions
      .get(this.idValue)
      .then((result: IDataModelIDbTaskExecution) => result.executionDate);
  }
}
