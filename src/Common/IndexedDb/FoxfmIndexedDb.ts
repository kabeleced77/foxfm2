import Dexie from 'dexie';

import { IClubDataModel } from '../DataModel/ClubDataModel';
import { IMatchdayDataModel } from '../DataModel/MatchdayDataModel';

export class FoxfmIndexedDb extends Dexie {
  public matchdays: Dexie.Table<IMatchdayDataModel, Number>;
  public clubs: Dexie.Table<IClubDataModel, Number>;

  constructor() {
    super("foxfm");
    this.version(1).stores({
      matchdays: "++id, &[serverValue+seasonValue+dayValue], serverValue, seasonValue, dayValue"
    });
    this.version(2).stores({
      clubs: "++id, name, &externalId",
    });
  }
}
