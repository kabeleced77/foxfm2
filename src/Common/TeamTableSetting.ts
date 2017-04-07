import { ISetting } from "./Setting"
import { SettingInStorage } from "./SettingInStorage"
import { ITeamTable } from "./TeamTable"
import { TeamTable } from "./TeamTable"
import { XPathString } from "./Toolkit/XPathString"
import { Url } from "./Toolkit/Url"
import { HtmlId } from "./Toolkit/HtmlId"
import { TeamTableExistingColumns } from "./TeamTableExistingColumns"
import { AwpColumn } from "./AwpColumn"
import { StrengthColumn } from "./StrengthColumn"

export interface ITeamTableSetting {
  setting(): Promise<ITeamTable>;
}

export class TeamTableSetting implements ITeamTableSetting {
  private teamTableSetting: ISetting<ITeamTable>;

  constructor() {
    this.teamTableSetting = new SettingInStorage<ITeamTable>(
      "foxfm2.teamui.setting",
      new TeamTable(
        new Url("team/players.php"),
        new HtmlId("playerTable"),
        true,
        new TeamTableExistingColumns(
          new AwpColumn(
            new XPathString("//./table[1]/thead[1]/tr[1]/th[15]"),
            true
          ),
          new StrengthColumn(
            new XPathString("//./table[1]/thead[1]/tr[1]/th[10]"),
            true
          )
        )
      )
    );
  }

  public setting(): Promise<ITeamTable> {
    return this.teamTableSetting.value();
  }
}
