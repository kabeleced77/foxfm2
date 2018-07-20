import { MatchdayDataModel } from '../DataModel/MatchdayDataModel';
import { IMatchday } from '../IMatchday';
import { IMatchdays } from '../IMatchdays';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { MatchdayIDb } from './MatchdayIDb';

export class MatchdaysIDb implements IMatchdays {
  private dataBase: FoxfmIndexedDb;

  constructor(source: FoxfmIndexedDb) {
    this.dataBase = source;
  }

  public matchdays(): Promise<IMatchday[]> {
    let mds: IMatchday[] = [];
    return this.dataBase
      .matchdays
      .toCollection()
      .eachPrimaryKey((pk: Number) => mds.push(new MatchdayIDb(this.dataBase, pk)))
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
        return new MatchdayIDb(
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
