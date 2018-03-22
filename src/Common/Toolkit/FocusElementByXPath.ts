import { IEasyLogger } from '../Logger/EasyLogger';
import { IFocusWebElement } from './FocusWebElement';
import { IUrl } from './Url';
import { IXPathSingleResult } from './XPathSingleResult';

export class FocusElementByXPath<T extends HTMLElement> implements IFocusWebElement {
  private readonly url: IUrl;
  private readonly element: IXPathSingleResult<T>;
  private readonly log: IEasyLogger;

  constructor(
    targetUrl: IUrl,
    element: IXPathSingleResult<T>,
    log: IEasyLogger
  ) {
    this.url = targetUrl;
    this.element = element;
    this.log = log;
  }

  public targetUrl(): IUrl {
    return this.url;
  }
  public focus(): void {
    let element = this.element.element();
    this.log.info(`will set focus to element '${element}`);
    try {
      element.focus();
    } catch (e) {
      throw new Error(`Could not set focus to element '${element}': ${e}. ${e.stack}`);
    }
  }
}
