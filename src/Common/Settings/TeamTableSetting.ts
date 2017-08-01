import { ISetting } from "../Toolkit/Setting"
import { ITeamTable } from "../TeamTable"
import { TeamTable } from "../TeamTable"
import { XPathInformation } from "../Toolkit/XPathString"
import { HtmlId } from "../Toolkit/HtmlId"
import { AwpAndStrengthColumns } from "../AwpAndStrengthColumns";
import { XPathHtmlTableCell2 } from "../Toolkit/XPathHtmlTableCell";
import { XPathSingleResult2 } from "../Toolkit/XPathSingleResult";
import { XPathAllResults2 } from "../Toolkit/XPathAllResults";
import { TeamWebPageUrl } from "../Urls/TeamWebPageUrl";
import { ISettingName } from "../Toolkit/SettingName";
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
        new TeamWebPageUrl(),
        new HtmlId("playerTable"),
        new AwpAndStrengthColumns(
          new XPathHtmlTableCell2(
            new XPathSingleResult2<HTMLTableCellElement>(
              new XPathAllResults2(
                new XPathInformation(
                  new TeamWebPageUrl(),
                  "//./table[1]/thead[1]/tr[1]/th[15]")))),
          new XPathHtmlTableCell2(
            new XPathSingleResult2<HTMLTableCellElement>(
              new XPathAllResults2(
                new XPathInformation(
                  new TeamWebPageUrl(),
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
