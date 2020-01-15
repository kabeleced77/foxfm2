import { IEasyLogger } from '../Logger/EasyLogger';
import { IUrl } from './Url';
import { IClickElementOnWebPage } from './IClickElementOnWebPage';
import { IClickWebElement } from './IClickWebElement';

export class ClickElementOnWebPage implements IClickElementOnWebPage {
  private currentUrl: IUrl;
  private webElements: Array<IClickWebElement>;

  constructor(
    currentUrl: IUrl,
    elements: Array<IClickWebElement>,
  ) {
    this.currentUrl = currentUrl;
    this.webElements = elements;
  }

  public click(log: IEasyLogger): void {
    this.webElements.forEach(webElement => {
      var targetUrl = webElement.targetUrl().url();
      try {
        var currentUrl = this.currentUrl.url().toString();
        var click = currentUrl.match(targetUrl) !== null;
        log.info(`called from: ${currentUrl} compared to ${targetUrl}: perform 'click': ${click}`);
        if (click) webElement.click();
      } catch (error) {
        throw `Could not automatically click element on ${targetUrl}: ${error}`;
      }
    });
  }
}
