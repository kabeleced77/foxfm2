import Dexie from 'dexie';

import { IClubDataModel } from '../DataModel/ClubDataModel';
import { IMatchdayDataModel } from '../DataModel/MatchdayDataModel';
import { IGameServerDataModel } from '../DataModel/GamerServerDataModel';
import { IPlayerTransferDataModel } from '../DataModel/PlayerTransferDataModel';

export class FoxfmIndexedDb extends Dexie {
  public matchdays: Dexie.Table<IMatchdayDataModel, Number>;
  public clubs: Dexie.Table<IClubDataModel, Number>;
  public gameServer: Dexie.Table<IGameServerDataModel, Number>;
  public transfers: Dexie.Table<IPlayerTransferDataModel, Number>;

  constructor() {
    super("foxfm");

    // scheme migration
    this.version(1)
      .stores({
        matchdays: "++id, &[serverValue+seasonValue+dayValue], serverValue, seasonValue, dayValue",
        clubs: "++id, name, &externalId",
        gameServer: "++id, uri",
        transfers: "++id",
      });
  }
}
