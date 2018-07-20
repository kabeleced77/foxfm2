import { MatchdayDataModel } from "../DataModel/MatchdayDataModel";
import { MatchdayIndexedDb, IMatchday } from "./MatchdayIndexedDb";
import { FoxfmIndexedDb } from "./FoxfmIndexedDb";

export interface IMatchdays {
  matchdays(): Promise<IMatchday[]>;
  add(gameServerId: Number, day: Number, season: Number, date: Date): Promise<void | IMatchday>;
}
export class Matchdays implements IMatchdays {
  private dataBase: FoxfmIndexedDb;

  constructor(source: FoxfmIndexedDb) {
    this.dataBase = source;
  }

  public matchdays(): Promise<IMatchday[]> {
    let mds: IMatchday[] = [];
    return this.dataBase
      .matchdays
      .toCollection()
      .eachPrimaryKey((pk: Number) => mds.push(new MatchdayIndexedDb(this.dataBase, pk)))
      .then(() => mds);
  }
  public add(gameServer: Number, season: Number, day: Number, date: Date): Promise<void | IMatchday> {
    return this.dataBase
      .matchdays
      .add(new MatchdayDataModel(
        gameServer,
        season,
        day,
        date,
      ))
      .then(id => {
        return new MatchdayIndexedDb(
          this.dataBase,
          id,
        );
      })
      .catch('ConstraintError',
        e => { /* accepted, no handling necessary */ })
      .catch(
        e => { throw `Could not add new matchday: ${e}` }
      );
  }
}
