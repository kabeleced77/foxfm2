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
    intervalSeconds: Number,
  ): Promise<ITaskConfiguration> {
    try {
      this.logger.debug(`will add new task configuration to IDb: name='${taskName}', activated='${activated}', interval[sec]='${intervalSeconds}'`);
      return this.dataBase
        .transaction(
          "rw",
          this.dataBase.taskConfigurations,
          this.dataBase.taskStatuses,
          this.dataBase.taskNames,
          async () => {
            let taskNameInDb = await new TaskNamesIDb(this.dataBase, this.logger).getOrAdd(taskName);
            let id = await this.dataBase
              .taskConfigurations
              .add(new DataModelIDbTaskConfiguration(
                activated,
                taskNameInDb.id(),
                intervalSeconds,
              ));
            this.logger.debug(`added to IDb: new task configuration: name='${taskName}', activated='${activated}', interval[sec]='${intervalSeconds}'`);
            return new TaskConfigurationIDb(
              this.dataBase,
              id,
              this.logger,
            );
          });
    } catch (e) {
      throw new Error(`Could not add new task configuration to IDb name='${taskName}', activated='${activated}', interval[sec]='${intervalSeconds}': ${e}`);
    }
  }

  public async getOrAdd(
    taskName: String,
    activated: Boolean,
    intervalSeconds: Number,
  ): Promise<ITaskConfiguration> {
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
            taskConfigInDb = await this.add(
              taskName,
              activated,
              intervalSeconds,
            );
          }
          return taskConfigInDb;
        });
  }
}
