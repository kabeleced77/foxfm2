import { DataModelIDbTaskName } from '../DataModel/DataModelIDbTaskName';
import { IEasyLogger } from '../Logger/EasyLogger';
import { ITaskName } from '../Tasking/ITaskName';
import { ITaskNames } from '../Tasking/ITaskNames';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { TaskNameIDb } from './TaskNameIDb';

export class TaskNamesIDb implements ITaskNames {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) { }

  public all(): Promise<ITaskName[]> {
    let vals: ITaskName[] = [];
    return this.dataBase
      .taskNames
      .toCollection()
      .eachPrimaryKey((pk: Number) => vals.push(new TaskNameIDb(this.dataBase, pk)))
      .then(() => vals);
  }

  public getOrAdd(
    taskName: String,
  ): Promise<ITaskName> {
    return this.dataBase
      .transaction(
        "rw",
        this.dataBase.taskNames,
        async () => {
          let taskNameInDb: ITaskName;
          let taskNamesInDb = await this.dataBase
            .taskNames
            .filter(ts => ts.name === name)
            .toArray(ts => ts.map(ts => new TaskNameIDb(this.dataBase, ts.id!)));
          if (taskNamesInDb.length === 1) {
            taskNameInDb = taskNamesInDb[0];
            this.logger.debug(`already in IDb: task name: '${await taskNameInDb.name()}'`);
          } else {
            taskNameInDb = await this.dataBase
              .taskNames
              .add(new DataModelIDbTaskName(
                taskName,
              ))
              .then(id => {
                this.logger.debug(`added to IDb: new task name: '${taskName}'`);
                return new TaskNameIDb(
                  this.dataBase,
                  id,
                );
              })
              .catch(e => { throw `Could not add new task name to IDb '${taskName}': ${e}` });
          }
          return taskNameInDb;
        });
  }
}
