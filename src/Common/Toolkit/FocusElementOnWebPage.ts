import { IEasyLogger } from '../Logger/EasyLogger';
import { IFocusWebElement } from './FocusWebElement';
import { IUrl } from './Url';

export interface IFocusElementOnWebPage {
  focus(log: IEasyLogger): void;
}

export class FocusElementOnWebPage implements IFocusElementOnWebPage {
  private currentUrl: IUrl;
  private webElements: Array<IFocusWebElement>;

  constructor(
    currentUrl: IUrl,
    elements: Array<IFocusWebElement>,
  ) {
    this.currentUrl = currentUrl;
    this.webElements = elements;
  }

  public focus(log: IEasyLogger): void {
    this.webElements.forEach(webElement => {
      var currentUrl = this.currentUrl.url().toString();
      var targetUrl = webElement.targetUrl().url();
      var extendPage = currentUrl.match(targetUrl) !== null;
      log.info(`called from: ${currentUrl} compared to ${targetUrl}: ${extendPage}`);
      if (extendPage) webElement.focus();
    });
  }
}
