import { IWebPageToExtend } from "../../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../../Common/Toolkit/Url";
import { IWebElementToExtend } from "../../Common/Toolkit/WebElementToExtend";

export class TransferOfferWebPage implements IWebPageToExtend {
  private urlField: IUrl;
  private table: IWebElementToExtend;

  constructor(
    webPageUrl: IUrl,
    offerTable: IWebElementToExtend,
  ) {
    this.urlField = webPageUrl;
    this.table = offerTable;
  }
  public pageUrl(): IUrl {
    return this.urlField;
  }
  public extend(): void {
    this.table.extend();
  }
}
