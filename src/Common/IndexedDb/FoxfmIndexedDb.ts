import Dexie from 'dexie';

import { IClubDataModel } from '../DataModel/ClubDataModel';
import { IDataModelIDbTaskConfiguration } from '../DataModel/DataModelIDbTaskConfiguration';
import { IDataModelIDbTaskStatus } from '../DataModel/DataModelIDbTaskStatus';
import { IDataModelIDbGameServer } from '../DataModel/DataModelIDbGameServer';
import { IDataModelIDbMatchday } from '../DataModel/DataModelIDbMatchday';
import { IDataModelIDbPlayerTransfer } from '../DataModel/PlayerTransferDataModel';
import { IDataModelIDbTaskName } from '../DataModel/DataModelIDbTaskName';
import { IDataModelIDbTaskExecution } from '../DataModel/DataModelIDbTaskExecution';
import { IDataModelImportedTransfersOfMatchday } from '../DataModel/IDataModelImportedTransfersOfMatchday';

export class FoxfmIndexedDb extends Dexie {
  public matchdays: Dexie.Table<IDataModelIDbMatchday, Number>;
  public clubs: Dexie.Table<IClubDataModel, Number>;
  public gameServers: Dexie.Table<IDataModelIDbGameServer, Number>;
  public playerTransfers: Dexie.Table<IDataModelIDbPlayerTransfer, Number>;
  public taskNames: Dexie.Table<IDataModelIDbTaskName, Number>;
  public taskConfigurations: Dexie.Table<IDataModelIDbTaskConfiguration, Number>;
  public taskStatuses: Dexie.Table<IDataModelIDbTaskStatus, Number>;
  public taskExecutions: Dexie.Table<IDataModelIDbTaskExecution, Number>;
  public importedTransfersOfMatchdays: Dexie.Table<IDataModelImportedTransfersOfMatchday, Number>;

  constructor() {
    super("foxfm");

    // scheme migration
    this.version(1)
      .stores({
        // following usages of "nameof"s are a little bit unhandy but ensure type safety for changes to underlying data models
        matchdays: "++id, &[gameServerId+seasonValue+dayValue], gameServerId, seasonValue, dayValue",
        clubs: "++id, &[gameServerId+externalId+name]",
        gameServers: "++id, uri",
        playerTransfers: "++id, &[gameServerId+matchdayId+externalTransferId]",
        taskNames: "++id, &name",
        taskConfigurations: "++id, &taskNameId",
        taskStatuses: "++id, &name",
        taskExecutions: "++id, &[taskNameId+startDateTime], startDateTime",
        importedTransfersOfMatchdays: `++${nameof<IDataModelImportedTransfersOfMatchday>(o => o.id)}, &${nameof<IDataModelImportedTransfersOfMatchday>(o => o.matchdayId)}, ${nameof<IDataModelImportedTransfersOfMatchday>(o => o.dateTime)}`,
      });

    // initial data population - also after upgrades and only diffs to previous version
    this.on("populate", () => {
      this.gameServers
        .bulkAdd([
          { uri: "www.onlinefussballmanager.de" },
          { uri: "en.onlinefootballmanager.com" },
          { uri: "server2.onlinefussballmanager.de" },
        ]);
    });
  }
}
