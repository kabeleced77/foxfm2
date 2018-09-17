import { DataModelIDbTaskExecution } from '../DataModel/DataModelIDbTaskExecution';
import { IMatchday } from '../IMatchday';
import { IEasyLogger } from '../Logger/EasyLogger';
import { ITaskExecution } from '../Tasking/ITaskExecution';
import { ITaskExecutions } from '../Tasking/ITaskExecutions';
import { ITaskStatus } from '../Tasking/ITaskStatus';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { TaskExecutionIDb } from './TaskExecutionIDb';
import { TaskNamesIDb } from './TaskNamesIDb';
import { TaskStatusIDb } from './TaskStatusIDb';
import { TaskStatusesIDb } from './TaskStatusesIDb';

export class TaskExecutionsIDb implements ITaskExecutions {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) { }

  public all(): Promise<ITaskExecution[]> {
    let vals: ITaskExecution[] = [];
    return this.dataBase
      .taskExecutions
      .toCollection()
      .eachPrimaryKey((pk: Number) => vals.push(new TaskExecutionIDb(this.dataBase, pk)))
      .then(() => vals);
  }

  public byTaskName(
    taskName: String,
  ): Promise<ITaskExecution[]> {
    return this.dataBase
      .transaction(
        "rw",
        this.dataBase.taskExecutions,
        this.dataBase.taskNames,
        async () => {
          let taskNameInDb = await new TaskNamesIDb(this.dataBase, this.logger).getOrAdd(taskName);
          return this.dataBase
            .taskExecutions
            .filter(taskExecution => taskExecution.taskNameId === taskNameInDb.id())
            .toArray(te => te.map(te => new TaskExecutionIDb(this.dataBase, te.id!)));
        });
  }

  public async getOrAdd(
    taskName: String,
    executionStatusName: String,
    executionDate: Date,
    executionMatchday: IMatchday,
  ): Promise<ITaskExecution> {
    this.logger.debug(`about to add new task execution to IDb: name=${taskName}, status=${executionStatusName}, date=${executionDate}'`);
    return this.dataBase
      .transaction(
        "rw",
        this.dataBase.taskExecutions,
        this.dataBase.taskStatuses,
        this.dataBase.taskNames,
        async () => {
          let taskExecutionInDb: ITaskExecution;
          let taskNameInDb = await new TaskNamesIDb(this.dataBase, this.logger).getOrAdd(taskName);
          let taskStatusInDb = await new TaskStatusesIDb(this.dataBase, this.logger).getOrAdd(executionStatusName);
          taskExecutionInDb = await this.dataBase
            .taskExecutions
            .add(new DataModelIDbTaskExecution(
              taskNameInDb.id(),
              await taskStatusInDb.id(),
              executionDate,
              executionMatchday.id(),
            ))
            .then(id => {
              this.logger.debug(`added to IDb: new task execution: '${taskName}' from '${executionDate}'`);
              return new TaskExecutionIDb(
                this.dataBase,
                id,
              );
            })
            .catch(e => { throw `Could not add new task execution to IDb '${taskName}' from ${executionDate}: ${e}` }
            );
          return taskExecutionInDb;
        });
  }
}
