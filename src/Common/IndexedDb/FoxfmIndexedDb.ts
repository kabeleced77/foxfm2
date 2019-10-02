import Dexie from 'dexie';

import { IDataModelIDbClub } from '../DataModel/DataModelIDbClub';
import { IDataModelIDbTaskConfiguration } from '../DataModel/DataModelIDbTaskConfiguration';
import { IDataModelIDbTaskStatus } from '../DataModel/DataModelIDbTaskStatus';
import { IDataModelIDbGameServer } from '../DataModel/DataModelIDbGameServer';
import { IDataModelIDbMatchday } from '../DataModel/DataModelIDbMatchday';
import { IDataModelIDbPlayerTransfer } from '../DataModel/DataModelIDbPlayerTransfer';
import { IDataModelIDbTaskName } from '../DataModel/DataModelIDbTaskName';
import { IDataModelIDbTaskExecution } from '../DataModel/DataModelIDbTaskExecution';
import { IDataModelIDbImportedTransfersOfMatchday } from '../DataModel/DataModelIDbImportedTransfersOfMatchday';

export class FoxfmIndexedDb extends Dexie {
  public matchdays: Dexie.Table<IDataModelIDbMatchday, Number>;
  public clubs: Dexie.Table<IDataModelIDbClub, Number>;
  public gameServers: Dexie.Table<IDataModelIDbGameServer, Number>;
  public playerTransfers: Dexie.Table<IDataModelIDbPlayerTransfer, Number>;
  public taskNames: Dexie.Table<IDataModelIDbTaskName, Number>;
  public taskConfigurations: Dexie.Table<IDataModelIDbTaskConfiguration, Number>;
  public taskStatuses: Dexie.Table<IDataModelIDbTaskStatus, Number>;
  public taskExecutions: Dexie.Table<IDataModelIDbTaskExecution, Number>;
  public importedTransfersOfMatchdays: Dexie.Table<IDataModelIDbImportedTransfersOfMatchday, Number>;

  constructor() {
    super("foxfm");

    // scheme migration
    this.version(1)
      .stores({
        // following usages of "nameof"s are a little bit unhandy but ensure type safety for changes to underlying data models
        matchdays: `++${nameof<IDataModelIDbMatchday>(o => o.id)}, &[${nameof<IDataModelIDbMatchday>(o => o.gameServerId)}+${nameof<IDataModelIDbMatchday>(o => o.season)}+${nameof<IDataModelIDbMatchday>(o => o.day)}], ${nameof<IDataModelIDbMatchday>(o => o.gameServerId)}, ${nameof<IDataModelIDbMatchday>(o => o.season)}, ${nameof<IDataModelIDbMatchday>(o => o.day)}`,
        clubs: "++id, &[gameServerId+externalId+name]",
        gameServers: "++id, &uri",
        playerTransfers: `++${nameof<IDataModelIDbPlayerTransfer>(o => o.id)}, &[${nameof<IDataModelIDbPlayerTransfer>(o => o.matchdayId)}+${nameof<IDataModelIDbPlayerTransfer>(o => o.externalTransferId)}], [${nameof<IDataModelIDbPlayerTransfer>(o => o.gameServerId)}+${nameof<IDataModelIDbPlayerTransfer>(o => o.position)}+${nameof<IDataModelIDbPlayerTransfer>(o => o.age)}+${nameof<IDataModelIDbPlayerTransfer>(o => o.strength)}]`,
        importedTransfersOfMatchdays: `++${nameof<IDataModelIDbImportedTransfersOfMatchday>(o => o.id)}, &${nameof<IDataModelIDbImportedTransfersOfMatchday>(o => o.matchdayId)}, ${nameof<IDataModelIDbImportedTransfersOfMatchday>(o => o.dateTime)}`,
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
