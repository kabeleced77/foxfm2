import { IEasyLogger } from '../Logger/EasyLogger';
import { IExtendWebElement } from './IExtendWebElement';
import { IUrl } from './Url';

export interface IExtendWebPage {
  extend(log: IEasyLogger): void;
}

export class ExtendWebPage implements IExtendWebPage {
  private currentUrl: IUrl;
  private webElements: Array<IExtendWebElement>;

  constructor(
    currentUrl: IUrl,
    elements: Array<IExtendWebElement>,
  ) {
    this.currentUrl = currentUrl;
    this.webElements = elements;
  }

  public extend(log: IEasyLogger): void {
    this.webElements.forEach(webElement => {
      var currentUrl = this.currentUrl.url().toString();
      var targetUrl = webElement.targetUrl().url();
      var extendPage = currentUrl.match(targetUrl) !== null;
      log.info(`called from: ${currentUrl} compared to ${targetUrl}: ${extendPage}`);
      if (extendPage) webElement.extend();
    });
  }
}
