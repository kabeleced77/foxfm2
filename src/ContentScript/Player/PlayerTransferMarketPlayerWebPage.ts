import { IWebElementToExtend } from "../../Common/Toolkit/WebElementToExtend";
import { IWebPageToExtend } from "../../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../../Common/Toolkit/Url";
import { IWebElementToFocus } from "../../Common/Toolkit/WebElementToFocus";

export class PlayerTransferMarketPlayerWebPage implements IWebPageToExtend {
  private urlField: IUrl;
  private transferMarketDurationSelect: IWebElementToExtend;
  private transferMarketFocusElement: IWebElementToFocus;

  constructor(
    url: IUrl,
    transferMarketDurationSelect: IWebElementToExtend,
    transferMarketFocusElement: IWebElementToFocus
  ) {
    this.urlField = url;
    this.transferMarketDurationSelect = transferMarketDurationSelect;
    this.transferMarketFocusElement = transferMarketFocusElement;
  }

  public pageUrl(): IUrl {
    return this.urlField;
  }
  public extend(): void {
    this.transferMarketDurationSelect.extend();
    this.transferMarketFocusElement.focus();
  }
}
