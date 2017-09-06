import { IUrl } from "../../Common/Toolkit/Url";
import { IWebPageToExtend } from "../../Common/Toolkit/WebPageToExtend";
import { IWebElementToExtend } from "../../Common/Toolkit/WebElementToExtend";

export class TransferMarketSearchWebPage implements IWebPageToExtend {
  private webPageUrl: IUrl;
  private searchResultTable: IWebElementToExtend;

  constructor(
    webPageUrl: IUrl,
    searchResultTable: IWebElementToExtend
  ) {
    this.webPageUrl = webPageUrl;
    this.searchResultTable = searchResultTable;
  }
  public pageUrl(): IUrl {
    return this.webPageUrl;
  }
  public extend(): void {
    this.searchResultTable.extend();
  }
}
