import { IWebPageToExtend } from "../../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../../Common/Toolkit/Url";
import { IWebElementToExtend } from "../../Common/Toolkit/WebElementToExtend";

export class TransferMarketOfferWebPage implements IWebPageToExtend {
  private urlField: IUrl;
  private table: IWebElementToExtend;
  private transferMarketDurationSelect: IWebElementToExtend;

  constructor(
    webPageUrl: IUrl,
    offerTable: IWebElementToExtend,
    transferMarketDurationSelect: IWebElementToExtend,
  ) {
    this.urlField = webPageUrl;
    this.table = offerTable;
    this.transferMarketDurationSelect = transferMarketDurationSelect;
  }
  public pageUrl(): IUrl {
    return this.urlField;
  }
  public extend(): void {
    this.table.extend();
    this.transferMarketDurationSelect.extend();
  }
}
