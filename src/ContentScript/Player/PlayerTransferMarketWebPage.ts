import { IWebElementToExtend } from "../../Common/Toolkit/WebElementToExtend";
import { IWebPageToExtend } from "../../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../../Common/Toolkit/Url";
import { IWebElementToFocus } from "../../Common/Toolkit/WebElementToFocus";

export class PlayerTransferMarketWebPage implements IWebPageToExtend {
  private urlField: IUrl;
  private transferMarketFocusElement: IWebElementToFocus;

  constructor(
    url: IUrl,
    transferMarketFocusElement: IWebElementToFocus
  ) {
    this.urlField = url;
    this.transferMarketFocusElement = transferMarketFocusElement;
  }

  public pageUrl(): IUrl {
    return this.urlField;
  }
  public extend(): void {
    this.transferMarketFocusElement.focus();
  }
}
