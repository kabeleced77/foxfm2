import Dexie from 'dexie';

import { IClubDataModel } from '../DataModel/ClubDataModel';
import { IMatchdayDataModel } from '../DataModel/MatchdayDataModel';
import { IGameServerDataModel } from '../DataModel/GameServerDataModel';
import { IPlayerTransferDataModel } from '../DataModel/PlayerTransferDataModel';

export class FoxfmIndexedDb extends Dexie {
  public matchdays: Dexie.Table<IMatchdayDataModel, Number>;
  public clubs: Dexie.Table<IClubDataModel, Number>;
  public gameServers: Dexie.Table<IGameServerDataModel, Number>;
  public playerTransfers: Dexie.Table<IPlayerTransferDataModel, Number>;

  constructor() {
    super("foxfm");

    // scheme migration
    this.version(1)
      .stores({
        matchdays: "++id, &[gameServerId+seasonValue+dayValue], gameServerId, seasonValue, dayValue",
        clubs: "++id, &[gameServerId+externalId+name]",
        gameServers: "++id, uri",
        playerTransfers: "++id, &[gameServerId+matchdayId+externalTransferId]",
      });

    // initial data population - also after upgrades and only diffs to previous version
    this.on("populate", () => this.gameServers
      .bulkAdd([
        { uri: "www.onlinefussballmanager.de" },
        { uri: "en.onlinefootballmanager.com" },
        { uri: "server2.onlinefussballmanager.de" },
      ]));
  }
}
