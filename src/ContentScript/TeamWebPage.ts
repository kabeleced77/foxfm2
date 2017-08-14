import { IWebElementToExtend } from "../Common/Toolkit/WebElementToExtend";
import { IWebPageToExtend } from "../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../Common/Toolkit/Url";

export class TeamWebPage implements IWebPageToExtend {
  private urlField: IUrl;
  private teamTable: IWebElementToExtend;

  constructor(
    url: IUrl,
    teamPlayerTable: IWebElementToExtend,
  ) {
    this.urlField = url;
    this.teamTable = teamPlayerTable;
  }

  public pageUrl(): IUrl {
    return this.urlField;
  }
  public extend(): void {
    this.teamTable.extend();
  }
}
