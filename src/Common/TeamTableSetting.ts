import { ISetting } from "./Settings/Setting"
import { ITeamTable } from "./TeamTable"
import { TeamTable } from "./TeamTable"
import { XPathInformation } from "./Toolkit/XPathString"
import { HtmlId } from "./Toolkit/HtmlId"
import { AwpAndStrengthColumns } from "./AwpAndStrengthColumns";
import { XPathHtmlTableCell2 } from "./Toolkit/XPathHtmlTableCell";
import { XPathSingleResult2 } from "./Toolkit/XPathSingleResult";
import { XPathAllResults2 } from "./Toolkit/XPathAllResults";
import { TeamTableUiUrl } from "./Urls/TeamTableUiUrl";
import { ISettingName } from "./Settings/SettingName";
import { StorageLocal } from "./Storage";

export interface ITeamTableSetting {
  setting(): Promise<ITeamTable>;
}

export class SettingNameTeamTable implements ISettingName {
  private settingName: String = "foxfm2.teamui.setting";
  constructor() { }
  public name(): String {
    return this.settingName;
  }
}

export class TeamTableSetting implements ITeamTableSetting {
  private teamTableSetting: ISetting<ITeamTable>;

  constructor() {
    this.teamTableSetting = new StorageLocal<ITeamTable>(
      new SettingNameTeamTable(),
      new TeamTable(
        new TeamTableUiUrl(),
        new HtmlId("playerTable"),
        new AwpAndStrengthColumns(
          new XPathHtmlTableCell2(
            new XPathSingleResult2<HTMLTableCellElement>(
              new XPathAllResults2(
                new XPathInformation(
                  new TeamTableUiUrl(),
                  "//./table[1]/thead[1]/tr[1]/th[15]")))),
          new XPathHtmlTableCell2(
            new XPathSingleResult2<HTMLTableCellElement>(
              new XPathAllResults2(
                new XPathInformation(
                  new TeamTableUiUrl(),
                  "//./table[1]/thead[1]/tr[1]/th[10]")))),
          true
        )
      )
    );
  }

  public setting(): Promise<ITeamTable> {
    return this.teamTableSetting.value();
  }
}
