import { IDataModelIDbTaskExecution } from '../DataModel/DataModelIDbTaskExecution';
import { ITaskExecution } from '../Tasking/ITaskExecution';
import { ITaskName } from '../Tasking/ITaskName';
import { ITaskStatus } from '../Tasking/ITaskStatus';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { TaskNameIDb } from './TaskNameIDb';
import { TaskStatusIDb } from './TaskStatusIDb';
import { IMatchdayWithId } from "../IMatchdayWithId";
import { MatchdayIDb } from './MatchdayIDb';

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
          let taskStatusInDb = await this.dataBase.taskStatuses.get(taskExecutionInDb!.taskStatusId);
          return new TaskStatusIDb(
            this.dataBase,
            taskExecutionInDb!.taskStatusId,
          );
        });
  }

  public startDateTime(): Promise<Date> {
    return this.dataBase
      .taskExecutions
      .get(this.idValue)
      .then((result: IDataModelIDbTaskExecution) => result.startDateTime);
  }

  public endDateTime(): Promise<Date> {
    return this.dataBase
      .taskExecutions
      .get(this.idValue)
      .then((result: IDataModelIDbTaskExecution) => result.endDateTime);
  }

  public matchday(): Promise<IMatchdayWithId> {
    return this.dataBase
      .transaction(
        "r",
        this.dataBase.taskExecutions,
        this.dataBase.matchdays,
        async () => {
          let taskExecutionInDb = await this.dataBase.taskExecutions.get(this.id());
          return new MatchdayIDb(
            this.dataBase,
            taskExecutionInDb!.matchdayId,
          );
        });
  }


}
