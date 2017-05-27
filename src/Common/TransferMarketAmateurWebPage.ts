import { IWebElementToExtend } from "./Toolkit/WebElementToExtend";
import { IWebPageToExtend } from "./Toolkit/WebPageToExtend";
import { IDom } from "./Toolkit/Dom";
import { IUrl } from "./Toolkit/Url";

export class TransferMarketAmateurWebPage implements IWebPageToExtend {
  private domField: IDom;
  private urlField: IUrl;
  private playerTableField: IWebElementToExtend;

  constructor(
    dom: IDom,
    url: IUrl,
    playerTable: IWebElementToExtend
  ) {
    this.domField = dom;
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
