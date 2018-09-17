import Dexie from 'dexie';

import { IClubDataModel } from '../DataModel/ClubDataModel';
import { IDataModelIDbTaskConfiguration } from '../DataModel/DataModelIDbTaskConfiguration';
import { IDataModelIDbTaskStatus } from '../DataModel/DataModelIDbTaskStatus';
import { IGameServerDataModel } from '../DataModel/GameServerDataModel';
import { IMatchdayDataModel } from '../DataModel/MatchdayDataModel';
import { IPlayerTransferDataModel } from '../DataModel/PlayerTransferDataModel';
import { IDataModelIDbTaskName } from '../DataModel/DataModelIDbTaskName';
import { IDataModelIDbTaskExecution } from '../DataModel/DataModelIDbTaskExecution';

export class FoxfmIndexedDb extends Dexie {
  public matchdays: Dexie.Table<IMatchdayDataModel, Number>;
  public clubs: Dexie.Table<IClubDataModel, Number>;
  public gameServers: Dexie.Table<IGameServerDataModel, Number>;
  public playerTransfers: Dexie.Table<IPlayerTransferDataModel, Number>;
  public taskNames: Dexie.Table<IDataModelIDbTaskName, Number>;
  public taskConfigurations: Dexie.Table<IDataModelIDbTaskConfiguration, Number>;
  public taskStatuses: Dexie.Table<IDataModelIDbTaskStatus, Number>;
  public taskExecutions: Dexie.Table<IDataModelIDbTaskExecution, Number>;

  constructor() {
    super("foxfm");

    // scheme migration
    this.version(1)
      .stores({
        matchdays: "++id, &[gameServerId+seasonValue+dayValue], gameServerId, seasonValue, dayValue",
        clubs: "++id, &[gameServerId+externalId+name]",
        gameServers: "++id, uri",
        playerTransfers: "++id, &[gameServerId+matchdayId+externalTransferId]",
        taskNames: "++id, &name",
        taskConfigurations: "++id, &taskNameId",
        taskStatuses: "++id, &name",
        taskExecutions: "++id, &name",
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
