import { IEasyLogger } from "../Logger/EasyLogger";
import { IUrl } from "./Url";
import { IWebPageToExtend } from "./WebPageToExtend";

export interface IExtendWebPage {
  extend(): void;
}

export class ExtendWebPage implements IExtendWebPage {
  private log: IEasyLogger;
  private currentUrl: IUrl;
  private webPage: IWebPageToExtend;

  constructor(
    currentUrl: IUrl,
    page: IWebPageToExtend,
    logger: IEasyLogger
  ) {
    this.currentUrl = currentUrl;
    this.webPage = page;
    this.log = logger;
  }

  public extend(): void {
    var currentUrl = this.currentUrl.url().toString();
    var targetUrl = this.webPage.pageUrl().url().toString();
    var extendPage = currentUrl.match(targetUrl) !== null;
    this.log.info(`called from: ${currentUrl} compared to ${targetUrl}: ${extendPage}`);
    if (extendPage) this.webPage.extend();
  }
}
