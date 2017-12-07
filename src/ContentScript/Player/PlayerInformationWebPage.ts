import { IWebPageToExtend } from "../../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../../Common/Toolkit/Url";
import { IWebElementToFocus } from "../../Common/Toolkit/WebElementToFocus";

export class PlayerInformationWebPage implements IWebPageToExtend {
  private urlField: IUrl;
  private elementToFocus: IWebElementToFocus;

  constructor(
    url: IUrl,
    elementToFocus: IWebElementToFocus
  ) {
    this.urlField = url;
    this.elementToFocus = elementToFocus;
  }

  public pageUrl(): IUrl {
    return this.urlField;
  }
  public extend(): void {
    this.elementToFocus.focus();
  }
}
