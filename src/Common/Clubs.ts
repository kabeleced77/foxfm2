import { Club, IClub } from './Club';
import { ClubDataModel } from './DataModel/ClubDataModel';
import { FoxfmIndexedDb } from './IndexedDb/FoxfmIndexedDb';

export interface IClubs {
  clubs(): Promise<IClub[]>;
  add(gameServerId: Number, name: String, externalId: Number): Promise<void | IClub>;
}

export class Clubs implements IClubs {
  private dataBase: FoxfmIndexedDb;

  constructor(source: FoxfmIndexedDb) {
    this.dataBase = source;
  }

  public clubs(): Promise<IClub[]> {
    let vals: IClub[] = [];
    return this.dataBase
      .clubs
      .toCollection()
      .eachPrimaryKey((pk: Number) => vals.push(new Club(this.dataBase, pk)))
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
        return new Club(
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
