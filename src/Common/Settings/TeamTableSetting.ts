import { ISetting } from "../Toolkit/Setting"
import { ITeamTable } from "../TeamTable"
import { TeamTable } from "../TeamTable"
import { StorageLocal } from "../Toolkit/StorageLocal";
import { SettingNameTeamTable } from "./SettingNameTeamTable";

export interface ITeamTableSetting {
  setting(): Promise<ITeamTable>;
}

export class TeamTableSetting implements ITeamTableSetting {
  private teamTableSetting: ISetting<ITeamTable>;

  constructor() {
    this.teamTableSetting = new StorageLocal<ITeamTable>(
      new SettingNameTeamTable(),
      new TeamTable(
        true,
        true,
        true
      )
    );
  }

  public setting(): Promise<ITeamTable> {
    return this.teamTableSetting.value();
  }
}
