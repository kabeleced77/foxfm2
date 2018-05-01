import Dexie from 'dexie';

import { IClubDataModel } from '../DataModel/ClubDataModel';
import { IMatchdayDataModel } from '../DataModel/MatchdayDataModel';
import { IPlayerPositionDataModel } from '../DataModel/PlayerPositionDataModel';
import { IGameServerDataModel } from '../DataModel/GamerServerDataModel';
import { IPlayerTransferDataModel } from '../DataModel/PlayerTransferDataModel';

export class FoxfmIndexedDb extends Dexie {
  public matchdays: Dexie.Table<IMatchdayDataModel, Number>;
  public clubs: Dexie.Table<IClubDataModel, Number>;
  public playerPosition: Dexie.Table<IPlayerPositionDataModel, Number>;
  public gameServer: Dexie.Table<IGameServerDataModel, Number>;
  public transfers: Dexie.Table<IPlayerTransferDataModel, Number>;

  constructor() {
    super("foxfm");

    // scheme migration
    this.version(1)
      .stores({
        matchdays: "++id, &[serverValue+seasonValue+dayValue], serverValue, seasonValue, dayValue",
        clubs: "++id, name, &externalId",
        playerPosition: "++id, &i18nName, &i18nShortName",
        gameServer: "++id, uri",
        transfers: "++id",
      });

    // initial data population - also after upgrades and only diffs to previous version
    this.on("populate", () => this.playerPosition
      .bulkAdd([
        { i18nName: "playerPosNameGoalKeeper", i18nShortName: "playerPosShortNameGoalKeeper" },
        { i18nName: "playerPosNameSweeper", i18nShortName: "playerPosShortNameSweeper" },
        { i18nName: "playerPosNameLeftBack", i18nShortName: "playerPosShortNameLeftBack" },
        { i18nName: "playerPosNameLeftCentreBack", i18nShortName: "playerPosShortNameLeftCentreBack" },
        { i18nName: "playerPosNameRightCentreBack", i18nShortName: "playerPosShortNameRightCentreBack" },
        { i18nName: "playerPosNameRightBack", i18nShortName: "playerPosShortNameRightBack" },
        { i18nName: "playerPosNameCentreHalf", i18nShortName: "playerPosShortNameCentreHalf" },
        { i18nName: "playerPosNameLeftMidfield", i18nShortName: "playerPosShortNameLeftMidfield" },
        { i18nName: "playerPosNameDefensiveMidfield", i18nShortName: "playerPosShortNameDefensiveMidfield" },
        { i18nName: "playerPosNameRightMidfield", i18nShortName: "playerPosShortNameRightMidfield" },
        { i18nName: "playerPosNameCentralMidfield", i18nShortName: "playerPosShortNameCentralMidfield" },
        { i18nName: "playerPosNameLeftWing", i18nShortName: "playerPosShortNameLeftWing" },
        { i18nName: "playerPosNameStriker", i18nShortName: "playerPosShortNameStriker" },
        { i18nName: "playerPosNameRightWing", i18nShortName: "playerPosShortNameRightWing" },
      ]));
  }
}
