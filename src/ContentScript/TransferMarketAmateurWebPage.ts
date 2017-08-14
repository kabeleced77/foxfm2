import { IWebElementToExtend } from "../Common/Toolkit/WebElementToExtend";
import { IWebPageToExtend } from "../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../Common/Toolkit/Url";

export class TransferMarketAmateurWebPage implements IWebPageToExtend {
  private urlField: IUrl;
  private playerTableField: IWebElementToExtend;

  constructor(
    url: IUrl,
    playerTable: IWebElementToExtend
  ) {
    this.urlField = url;
    this.playerTableField = playerTable;
  }

  public pageUrl(): IUrl {
    return this.urlField;
  }
  public extend(): void {
    this.playerTableField.extend();
  }
}
