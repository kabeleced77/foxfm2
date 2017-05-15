import { IEasyLogger } from "../Logger/EasyLogger";
import { IUrl } from "./Url";
import { IWebElementToExtend } from "./WebElementToExtend";

export interface IExtendTargetWebPage {
  extend(): void;
}

export class ExtendTargetWebPage implements IExtendTargetWebPage {
  private log: IEasyLogger;
  private currentUrl: IUrl;
  private targetUrl: IUrl;
  private page: IWebElementToExtend;

  constructor(
    logger: IEasyLogger,
    currentUrl: IUrl,
    targetUrl: IUrl,
    page: IWebElementToExtend
  ) {
    this.log = logger;
    this.currentUrl = currentUrl;
    this.targetUrl = targetUrl;
    this.page = page;
  }

  public extend(): void {
    var currentUrl = this.currentUrl.url().toString();
    var targetUrl = this.targetUrl.url().toString();
    var extendPage = currentUrl.match(targetUrl) !== null;
    this.log.info(`called from: ${currentUrl} compared to ${targetUrl}: ${extendPage}`);
    if (extendPage) this.page.extend(this.log);
  }
}
