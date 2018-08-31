import { IDataModelIDbTaskName } from '../DataModel/DataModelIDbTaskName';
import { ITaskName } from '../Tasking/ITaskName';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';

export class TaskNameIDb implements ITaskName {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private idValue: Number,
  ) { }

  public id(): Number {
    return this.idValue;
  }

  public name(): Promise<String> {
    return this.dataBase
      .taskNames
      .get(this.idValue)
      .then((result: IDataModelIDbTaskName) => result.name);
  }
}
