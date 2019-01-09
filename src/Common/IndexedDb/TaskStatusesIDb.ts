import { DataModelIDbTaskStatus } from '../DataModel/DataModelIDbTaskStatus';
import { IEasyLogger } from '../Logger/EasyLogger';
import { ITaskStatus } from '../Tasking/ITaskStatus';
import { ITaskStatuses } from '../Tasking/ITaskStatuses';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { TaskStatusIDb } from './TaskStatusIDb';

export class TaskStatusesIDb implements ITaskStatuses {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) { }

  public all(): Promise<ITaskStatus[]> {
    let vals: ITaskStatus[] = [];
    return this.dataBase
      .taskStatuses
      .toCollection()
      .eachPrimaryKey((pk: Number) => vals.push(new TaskStatusIDb(this.dataBase, pk)))
      .then(() => vals);
  }

  public byName(statusName: String): Promise<ITaskStatus[]> {
    return this.dataBase
      .taskStatuses
      .filter(ts => ts.name === statusName)
      .toArray(ts => ts.map(ts => new TaskStatusIDb(this.dataBase, ts.id!)));
  }

  public getOrAdd(
    taskStatusName: String,
    final: Boolean,
  ): Promise<ITaskStatus> {
    return this.dataBase
      .transaction("rw", this.dataBase.taskStatuses, async () => {
        let taskStatusInDb: ITaskStatus;
        let taskStatusesInDb = await this.byName(taskStatusName);
        if (taskStatusesInDb.length === 1) {
          taskStatusInDb = taskStatusesInDb[0];
          this.logger.debug(`already in IDb: task status: '${await taskStatusInDb.name()}'`);
        } else {
          taskStatusInDb = await this.dataBase
            .taskStatuses
            .add(new DataModelIDbTaskStatus(
              taskStatusName,
              final,
            ))
            .then(id => {
              this.logger.debug(`added to IDb: new task status: '${taskStatusName}'`);
              return new TaskStatusIDb(
                this.dataBase,
                id,
              );
            })
            .catch(e => { throw `Could not add new task status to IDb '${taskStatusName}': ${e}` });
        }
        return taskStatusInDb;
      });
  }
}
