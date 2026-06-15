import Dexie from "dexie";

import { IDataModelIDbClub } from "../DataModel/DataModelIDbClub";
import { IDataModelIDbGameServer } from "../DataModel/DataModelIDbGameServer";
import { IDataModelIDbMatchday } from "../DataModel/DataModelIDbMatchday";
import { IDataModelIDbPlayerTransfer } from "../DataModel/DataModelIDbPlayerTransfer";
import { IDataModelIDbImportedTransfersOfMatchday } from "../DataModel/DataModelIDbImportedTransfersOfMatchday";

export class FoxfmIndexedDb extends Dexie {
  public matchdays: Dexie.Table<IDataModelIDbMatchday, Number>;
  public clubs: Dexie.Table<IDataModelIDbClub, Number>;
  public gameServers: Dexie.Table<IDataModelIDbGameServer, Number>;
  public playerTransfers: Dexie.Table<IDataModelIDbPlayerTransfer, Number>;
  public importedTransfersOfMatchdays: Dexie.Table<
    IDataModelIDbImportedTransfersOfMatchday,
    Number
  >;

  constructor() {
    super("foxfm");

    // scheme migration
    this.version(1).stores({
      matchdays: "++id, &[gameServerId+season+day], gameServerId, season, day",
      clubs: "++id, &[gameServerId+externalId+name]",
      gameServers: "++id, &uri",
      playerTransfers: `++id, &[matchdayId+externalTransferId], [gameServerId+position+age+strength]`,
      importedTransfersOfMatchdays: `++id, &matchdayId, dateTime`,
    });

    // tell Typescript about the tables
    this.matchdays = this.table("matchdays");
    this.clubs = this.table("clubs");
    this.gameServers = this.table("gameServers");
    this.playerTransfers = this.table("playerTransfers");
    this.importedTransfersOfMatchdays = this.table(
      "importedTransfersOfMatchdays",
    );

    // initial data population - also after upgrades and only diffs to previous version
    this.on("populate", () => {
      this.gameServers.bulkAdd([
        { uri: "www.onlinefussballmanager.de" },
        { uri: "en.onlinefootballmanager.com" },
        { uri: "server2.onlinefussballmanager.de" },
      ]);
    });
  }
}

// Instantiate it
var db = new FoxfmIndexedDb();

// Open it
db.open().catch(err => {
    console.error(`Open failed: ${err.stack}`);
});

export { db };
