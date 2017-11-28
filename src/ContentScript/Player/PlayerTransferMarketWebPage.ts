import { IWebElementToExtend } from "../../Common/Toolkit/WebElementToExtend";
import { IWebPageToExtend } from "../../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../../Common/Toolkit/Url";

export class PlayerTransferMarketWebPage implements IWebPageToExtend {
  private urlField: IUrl;
  private transferMarketDurationSelect: IWebElementToExtend;

  constructor(
    url: IUrl,
    transferMarketDurationSelect: IWebElementToExtend,
  ) {
    this.urlField = url;
    this.transferMarketDurationSelect = transferMarketDurationSelect;
  }

  public pageUrl(): IUrl {
    return this.urlField;
  }
  public extend(): void {
    this.transferMarketDurationSelect.extend();
  }
}
