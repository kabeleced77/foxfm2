import { IDataModelIDbClub } from '../DataModel/DataModelIDbClub';
import { IClub } from '../IClub';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';

export class ClubIDb implements IClub {
  private source: FoxfmIndexedDb;
  private idValue: Number;

  constructor(db: FoxfmIndexedDb, id: Number) {
    this.source = db;
    this.idValue = id;
  }

  public id(): Number {
    return this.idValue;
  }
  public name(): Promise<String> {
    return this.source
      .clubs
      .get(this.idValue)
      .then((result: IDataModelIDbClub) => result.name);
  }
  public externalId(): Promise<Number> {
    return this.source
      .clubs
      .get(this.idValue)
      .then((result: IDataModelIDbClub) => result.externalId);
  }
}
