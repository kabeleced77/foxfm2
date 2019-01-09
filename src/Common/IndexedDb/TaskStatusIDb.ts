import { IDataModelIDbTaskStatus } from '../DataModel/DataModelIDbTaskStatus';
import { ITaskStatus } from '../Tasking/ITaskStatus';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';

export class TaskStatusIDb implements ITaskStatus {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private idValue: Number,
  ) { }

  public id(): Number {
    return this.idValue;
  }

  public name(): Promise<String> {
    return this.dataBase
      .taskStatuses
      .get(this.idValue)
      .then((result: IDataModelIDbTaskStatus) => result.name);
  }

  public final(): Promise<Boolean> {
    return this.dataBase
      .taskStatuses
      .get(this.idValue)
      .then((result: IDataModelIDbTaskStatus) => result.final);
  }
  /*
  public updateNextExecution(nextExection: Date): void {
    this.dataBase
    .taskConfigurations
    .update(this.id(), new )
  }
  */
}
