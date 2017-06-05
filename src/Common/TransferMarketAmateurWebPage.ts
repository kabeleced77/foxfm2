import { IWebElementToExtend } from "./Toolkit/WebElementToExtend";
import { IWebPageToExtend } from "./Toolkit/WebPageToExtend";
import { IUrl } from "./Toolkit/Url";

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
