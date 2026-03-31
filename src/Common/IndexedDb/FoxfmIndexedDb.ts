import Dexie from "dexie";

import { IDataModelIDbClub } from "../DataModel/DataModelIDbClub";
import { IDataModelIDbTaskConfiguration } from "../DataModel/DataModelIDbTaskConfiguration";
import { IDataModelIDbTaskStatus } from "../DataModel/DataModelIDbTaskStatus";
import { IDataModelIDbGameServer } from "../DataModel/DataModelIDbGameServer";
import { IDataModelIDbMatchday } from "../DataModel/DataModelIDbMatchday";
import { IDataModelIDbPlayerTransfer } from "../DataModel/DataModelIDbPlayerTransfer";
import { IDataModelIDbTaskName } from "../DataModel/DataModelIDbTaskName";
import { IDataModelIDbTaskExecution } from "../DataModel/DataModelIDbTaskExecution";
import { IDataModelIDbImportedTransfersOfMatchday } from "../DataModel/DataModelIDbImportedTransfersOfMatchday";

export class FoxfmIndexedDb extends Dexie {
  public matchdays: Dexie.Table<IDataModelIDbMatchday, Number>;
  public clubs: Dexie.Table<IDataModelIDbClub, Number>;
  public gameServers: Dexie.Table<IDataModelIDbGameServer, Number>;
  public playerTransfers: Dexie.Table<IDataModelIDbPlayerTransfer, Number>;
  public taskNames: Dexie.Table<IDataModelIDbTaskName, Number>;
  public taskConfigurations: Dexie.Table<
    IDataModelIDbTaskConfiguration,
    Number
  >;
  public taskStatuses: Dexie.Table<IDataModelIDbTaskStatus, Number>;
  public taskExecutions: Dexie.Table<IDataModelIDbTaskExecution, Number>;
  public importedTransfersOfMatchdays: Dexie.Table<
    IDataModelIDbImportedTransfersOfMatchday,
    Number
  >;

  constructor() {
    super("foxfm");

    // scheme migration
    this.version(1).stores({
      matchdays: `++id, &[gameServerId+season+day], gameServerId, season, day`,
      clubs: "++id, &[gameServerId+externalId+name]",
      gameServers: "++id, &uri",
      playerTransfers: `++id, &[matchdayId+externalTransferId], [gameServerId+position+age+strength]`,
      importedTransfersOfMatchdays: `++id, &matchdayId, dateTime`,
    });

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
