import { IMatchdayDataModel } from "./DataModel/MatchdayDataModel";
import { FoxfmIndexedDb } from "./IndexedDb/FoxfmIndexedDb";
import { IClubDataModel } from "./DataModel/ClubDataModel";

export interface IClub {
  id(): Number;
  name(): Promise<String>;
  externalId(): Promise<Number>;
}

export class Club implements IClub {
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
      .then((result: IClubDataModel) => result.name);
  }
  public externalId(): Promise<Number> {
    return this.source
      .clubs
      .get(this.idValue)
      .then((result: IClubDataModel) => result.externalId);
  }
}
