import { ClubDataModel } from '../DataModel/ClubDataModel';
import { IClub } from '../IClub';
import { IClubs } from '../IClubs';
import { ClubIDb } from './ClubIDb';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';

export class ClubsIDb implements IClubs {
  private dataBase: FoxfmIndexedDb;

  constructor(source: FoxfmIndexedDb) {
    this.dataBase = source;
  }

  public clubs(): Promise<IClub[]> {
    let vals: IClub[] = [];
    return this.dataBase
      .clubs
      .toCollection()
      .eachPrimaryKey((pk: Number) => vals.push(new ClubIDb(this.dataBase, pk)))
      .then(() => vals);
  }
  public add(gameServerId: Number, name: String, externalId: Number): Promise<void | IClub> {
    return this.dataBase
      .clubs
      .add(new ClubDataModel(
        gameServerId,
        name,
        externalId,
      ))
      .then(id => {
        return new ClubIDb(
          this.dataBase,
          id,
        );
      })
      .catch('ConstraintError',
        e => { /* accepted, no handling necessary */ })
      .catch(
        e => { throw `Could not add new club: ${e}` }
      );
  }
}
