import { IDataModelIDbTaskConfiguration } from '../DataModel/DataModelIDbTaskConfiguration';
import { IEasyLogger } from '../Logger/EasyLogger';
import { ITaskConfiguration } from '../Tasking/ITaskConfiguration';
import { ITaskName } from '../Tasking/ITaskName';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { TaskNameIDb } from './TaskNameIDb';

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
}
