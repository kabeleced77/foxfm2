import { IMatchdayDataModel } from "../DataModel/MatchdayDataModel";
import { FoxfmIndexedDb } from "./FoxfmIndexedDb";

export interface IMatchday {
  id(): Number;
  gameServerId(): Promise<Number>;
  day(): Promise<Number>;
  season(): Number;
  date(): Date;
}

export class MatchdayIDb implements IMatchday {
  private source: FoxfmIndexedDb;
  private idValue: Number;

  constructor(db: FoxfmIndexedDb, id: Number) {
    this.source = db;
    this.idValue = id;
  }

  public id(): Number {
    return this.idValue;
  }
  public gameServerId(): Promise<Number> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IMatchdayDataModel) => result.gameServerId);
  }
  public day(): Promise<Number> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IMatchdayDataModel) => result.dayValue);
  }
  public season(): Number {
    throw new Error("Method not implemented.");
  }
  public date(): Date {
    throw new Error("Method not implemented.");
  }
}
