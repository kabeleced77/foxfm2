import { IEasyLogger } from "../Logger/EasyLogger";
import { IUrl } from "./Url";
import { IWebElementToExtend } from "./WebElementToExtend";

export interface IExtendWebPage {
  extend(): void;
}

export class ExtendWebPage implements IExtendWebPage {
  private log: IEasyLogger;
  private currentUrl: IUrl;
  private targetUrl: IUrl;
  private webElement: IWebElementToExtend;

  constructor(
    logger: IEasyLogger,
    currentUrl: IUrl,
    targetUrl: IUrl,
    page: IWebElementToExtend
  ) {
    this.log = logger;
    this.currentUrl = currentUrl;
    this.targetUrl = targetUrl;
    this.webElement = page;
  }

  public extend(): void {
    var currentUrl = this.currentUrl.url().toString();
    var targetUrl = this.targetUrl.url().toString();
    var extendPage = currentUrl.match(targetUrl) !== null;
    this.log.info(`called from: ${currentUrl} compared to ${targetUrl}: ${extendPage}`);
    if (extendPage) this.webElement.extend(this.log);
  }
}
