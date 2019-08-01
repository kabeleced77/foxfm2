import { DataModelIDbTaskExecution } from '../DataModel/DataModelIDbTaskExecution';
import { IMatchdayWithId } from "../IMatchdayWithId";
import { IEasyLogger } from '../Logger/EasyLogger';
import { ITaskExecution } from '../Tasking/ITaskExecution';
import { ITaskExecutions } from '../Tasking/ITaskExecutions';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { TaskExecutionIDb } from './TaskExecutionIDb';
import { TaskNamesIDb } from './TaskNamesIDb';
import { TaskStatusesIDb } from './TaskStatusesIDb';
import { TaskExecutionNotFound } from './TaskExecutionNotFound';
import { TaskStatusRunning } from '../Tasking/TaskStatusRunning';
import { TaskStatusExecuted } from '../Tasking/TaskStatusExecuted';
import { ITaskStatus } from '../Tasking/ITaskStatus';

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

  public latest(
    taskName: String,
  ): Promise<ITaskExecution> {

    return this.dataBase
      .transaction(
        "rw",
        this.dataBase.taskExecutions,
        this.dataBase.taskNames,
        async () => {
          const taskNameInDb = await new TaskNamesIDb(this.dataBase, this.logger).getOrAdd(taskName);
          const executions = await this.dataBase
            .taskExecutions
            .filter(v => v.taskNameId === taskNameInDb.id());
          let latestExecution: Promise<ITaskExecution>;
          if (await executions.count() > 0) {
            latestExecution = executions
              .reverse() // see also Dexie doc: To sort in descending order, use Collection.reverse() on the collection before calling sortBy().
              .sortBy('endDateTime')
              .then(values => new TaskExecutionIDb(this.dataBase, values[0]!.id!));
          } else {
            latestExecution = new Promise<ITaskExecution>(resolve => resolve(new TaskExecutionNotFound()));
          }
          this.logger.debug(`latest task execution: id: ${(await latestExecution).id()}, name: ${await (await (await latestExecution).taskName()).name()}`);
          return latestExecution;
        });
  }

  public deleteFinalised(
    taskName: String,
    lastExecutionsToKeep: Number,
  ): Promise<Number> {

    return this.dataBase
      .transaction(
        "rw",
        this.dataBase.taskExecutions,
        this.dataBase.taskStatuses,
        async () => {
         const finalStatusIds = await this.dataBase
            .taskStatuses
            .filter(status => status.final === true)
            .primaryKeys();

          return this.dataBase
            .taskExecutions
            .filter(te => finalStatusIds.find(ft => ft === te.taskStatusId) !== undefined)
            .reverse()
            .offset(lastExecutionsToKeep.valueOf())
            .delete()
            ;
        });
  }

  public async getOrAdd(
    taskName: String,
    executionStatusName: ITaskStatus,
    startDateTime: Date,
    endDateTime: Date,
    executionMatchday: IMatchdayWithId,
  ): Promise<ITaskExecution> {

    this.logger.debug(`about to add new task execution to IDb: name=${taskName}, status=${executionStatusName}, date=${startDateTime}'`);
    return this.dataBase
      .transaction(
        "rw",
        this.dataBase.taskExecutions,
        this.dataBase.taskStatuses,
        this.dataBase.taskNames,
        this.dataBase.matchdays,
        async () => {
          let taskExecutionInDb: ITaskExecution;
          let taskNameInDb = await new TaskNamesIDb(this.dataBase, this.logger).getOrAdd(taskName);
          let taskStatusInDb = await new TaskStatusesIDb(this.dataBase, this.logger)
            .getOrAdd(
              await executionStatusName.name(),
              await executionStatusName.final(),
            );
          taskExecutionInDb = await this.dataBase
            .taskExecutions
            .add(new DataModelIDbTaskExecution(
              taskNameInDb.id(),
              await taskStatusInDb.id(),
              startDateTime,
              endDateTime,
              executionMatchday.id(),
            ))
            .then(id => {
              this.logger.debug(`added new task execution: taskNameId: '${taskNameInDb.id()}', taskName: '${taskName}', startDateTime: '${startDateTime}'`);
              return new TaskExecutionIDb(
                this.dataBase,
                id,
              );
            })
            .catch(e => { throw `Could not add new task execution to IDb '${taskName}' from ${startDateTime}: ${e}` }
            );
          return taskExecutionInDb;
        });
  }

  public updateStatusEndDateTime(
    id: Number,
    taskStatus: ITaskStatus,
    endDateTime: Date,
  ): Promise<ITaskExecution> {

    return this.dataBase
      .transaction(
        "rw",
        this.dataBase.taskExecutions,
        this.dataBase.taskStatuses,
        this.dataBase.taskNames,
        this.dataBase.matchdays,
        async () => {
          let taskStatusInDb = await new TaskStatusesIDb(this.dataBase, this.logger)
            .getOrAdd(
              await taskStatus.name(),
              await taskStatus.final(),
            );
          let lastestTaskExecution = new TaskExecutionIDb(this.dataBase, id);

          if (lastestTaskExecution.id() > 0) {
            const updateExecution = new DataModelIDbTaskExecution(
              (await lastestTaskExecution.taskName()).id(),
              await taskStatusInDb.id(),
              await lastestTaskExecution.startDateTime(),
              endDateTime,
              await (await lastestTaskExecution.matchday()).id(),
            );

            this.logger.debug(`about to update task execution to: ${JSON.stringify(updateExecution)}`);

            const taskName = await (await lastestTaskExecution.taskName()).name();
            return await this.dataBase
              .taskExecutions
              .update(id, updateExecution)
              .then(async updated => {
                if (updated) {
                  this.logger.debug(`updated task execution in IDb '${taskName}': '${taskStatus}', ${endDateTime}`);
                }
                else {
                  this.logger.debug(`did NOT update task execution in IDb '${taskName}': '${taskStatus}', ${endDateTime}`);
                }
                return new TaskExecutionIDb(
                  this.dataBase,
                  lastestTaskExecution.id(),
                );
              })
              .catch(e => {
                throw `Could not update status and endDateTime of task execution '${taskName}': ${e}`;
              });
          }
          else {
            return new Promise((resolve) => {
              resolve(new TaskExecutionIDb(this.dataBase, -1));
            });
          }
        });
  }
}
