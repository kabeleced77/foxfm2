import { IEasyLogger } from '../Logger/EasyLogger';
import { IScrabWebElement } from './ScrabWebElement';
import { IUrl } from './Url';

export interface IScrabWebPage {
  scrab(log: IEasyLogger): void;
}

export class ScrabWebPage implements IScrabWebPage {
  private currentUrl: IUrl;
  private webElements: Array<IScrabWebElement>;

  constructor(
    currentUrl: IUrl,
    elements: Array<IScrabWebElement>,
  ) {
    this.currentUrl = currentUrl;
    this.webElements = elements;
  }

  public scrab(log: IEasyLogger): void {
    this.webElements.forEach(webElement => {
      var currentUrl = this.currentUrl.url().toString();
      var targetUrl = webElement.targetUrl().url();
      var scrab = currentUrl.match(targetUrl) !== null;
      log.info(`called from: ${currentUrl} compared to ${targetUrl}: ${scrab}`);
      if (scrab) webElement.scrab();
    });
  }
}
