import Dexie from "dexie";

import { IDataModelIDbClub } from "../DataModel/DataModelIDbClub";
import { IDataModelIDbGameServer } from "../DataModel/DataModelIDbGameServer";
import { IDataModelIDbMatchday } from "../DataModel/DataModelIDbMatchday";
import { IDataModelIDbPlayerTransfer } from "../DataModel/DataModelIDbPlayerTransfer";
import { IDataModelIDbImportedTransfersOfMatchday } from "../DataModel/DataModelIDbImportedTransfersOfMatchday";
import { IDataModelIDbOfmFeature } from "../DataModel/DataModelIDbOfmFeature";
import { IDataModelIDbXPath } from "../DataModel/DataModelIDbXPath";

export class FoxfmIndexedDb extends Dexie {
  public matchdays: Dexie.Table<IDataModelIDbMatchday, Number>;
  public clubs: Dexie.Table<IDataModelIDbClub, Number>;
  public gameServers: Dexie.Table<IDataModelIDbGameServer, Number>;
  public playerTransfers: Dexie.Table<IDataModelIDbPlayerTransfer, Number>;
  public importedTransfersOfMatchdays: Dexie.Table<
    IDataModelIDbImportedTransfersOfMatchday,
    Number
  >;
  public ofmFeatures: Dexie.Table<IDataModelIDbOfmFeature, Number>;
  public xPaths: Dexie.Table<IDataModelIDbXPath, Number>;

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
    this.version(2).stores({
      stadiumXPaths: "++id, &name",
    });
    // XPaths of all OFM features in one table, each referring to its feature
    this.version(3).stores({
      ofmFeatures: "++id, &name",
      xPaths: "++id, &[ofmFeatureId+meaningXPath], ofmFeatureId",
      stadiumXPaths: null,
    });
    // column 'meaningXPath' of table 'xPaths' has been renamed to 'name'
    this.version(4)
      .stores({
        xPaths: "++id, &[ofmFeatureId+name], ofmFeatureId",
      })
      .upgrade((transaction) =>
        transaction
          .table("xPaths")
          .toCollection()
          .modify((row: any) => {
            row.name = row.meaningXPath;
            delete row.meaningXPath;
          }),
      );

    // tell Typescript about the tables
    this.matchdays = this.table("matchdays");
    this.clubs = this.table("clubs");
    this.gameServers = this.table("gameServers");
    this.playerTransfers = this.table("playerTransfers");
    this.importedTransfersOfMatchdays = this.table(
      "importedTransfersOfMatchdays",
    );
    this.ofmFeatures = this.table("ofmFeatures");
    this.xPaths = this.table("xPaths");

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
