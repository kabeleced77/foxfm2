import { DataModelIDbTaskConfiguration } from '../DataModel/DataModelIDbTaskConfiguration';
import { IEasyLogger } from '../Logger/EasyLogger';
import { ITaskConfiguration } from '../Tasking/ITaskConfiguration';
import { ITaskConfigurations } from '../Tasking/ITaskConfigurations';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { TaskConfigurationIDb } from './TaskConfigurationIDb';
import { TaskNamesIDb } from './TaskNamesIDb';
import { TaskStatusesIDb } from './TaskStatusesIDb';

export class TaskConfigurationsIDb implements ITaskConfigurations {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) { }

  public all(): Promise<ITaskConfiguration[]> {
    let vals: ITaskConfiguration[] = [];
    return this.dataBase
      .taskConfigurations
      .toCollection()
      .eachPrimaryKey((pk: Number) => vals.push(new TaskConfigurationIDb(this.dataBase, pk, this.logger)))
      .then(() => vals);
  }

  public byTaskName(taskName: String): Promise<ITaskConfiguration[]> {
    return this.dataBase
      .transaction(
        "rw",
        this.dataBase.taskConfigurations,
        this.dataBase.taskNames,
        async () => {
          let taskNameInDb = await new TaskNamesIDb(this.dataBase, this.logger).getOrAdd(taskName);
          return this.dataBase
            .taskConfigurations
            .filter(tc => tc.taskNameId === taskNameInDb.id())
            .toArray(tc => tc.map(tc => new TaskConfigurationIDb(this.dataBase, tc.id!, this.logger)));
        });
  }

  public async add(
    taskName: String,
    activated: Boolean,
    lastExecutionTaskStatusName: String,
    lastExecutionDate: Date,
    intervalSeconds: Number,
  ): Promise<ITaskConfiguration> {
    this.logger.debug(`about to add new task configuration to IDb: name=${taskName}, status=${lastExecutionTaskStatusName}, interval=${intervalSeconds} sec'`);
    return this.dataBase
      .transaction(
        "rw",
        this.dataBase.taskConfigurations,
        this.dataBase.taskStatuses,
        this.dataBase.taskNames,
        async () => {
          let taskConfigInDb: ITaskConfiguration;
          let taskConfigsInDb = await this.byTaskName(taskName);
          if (await taskConfigsInDb.length === 1) {
            taskConfigInDb = await taskConfigsInDb[0];
            this.logger.debug(`already in IDb: task configuration for task: '${await taskConfigInDb.taskName()}'`);
          } else {
            let taskStatusInDb = await new TaskStatusesIDb(this.dataBase, this.logger).getOrAdd(lastExecutionTaskStatusName);
            let taskNameInDb = await new TaskNamesIDb(this.dataBase, this.logger).getOrAdd(taskName);
            taskConfigInDb = await this.dataBase
              .taskConfigurations
              .add(new DataModelIDbTaskConfiguration(
                activated,
                taskNameInDb.id(),
                taskStatusInDb.id(),
                lastExecutionDate,
                intervalSeconds,
              ))
              .then(id => {
                this.logger.debug(`added to IDb: new task configuration: '${taskName} ${lastExecutionTaskStatusName}-${intervalSeconds}'`);
                return new TaskConfigurationIDb(
                  this.dataBase,
                  id,
                  this.logger,
                );
              })
              .catch(e => { throw `Could not add new task configuration to IDb '${taskName} ${lastExecutionTaskStatusName}-${intervalSeconds}': ${e}` }
              );
          }
          return taskConfigInDb;
        });
  }
}
