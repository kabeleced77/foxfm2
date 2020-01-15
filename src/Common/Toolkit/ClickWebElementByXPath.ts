import { IEasyLogger } from '../Logger/EasyLogger';
import { IUrl } from './Url';
import { IXPathFirstResult } from './IXPathFirstResult';
import { IClickWebElementXPath } from './IClickWebElementByXPath';

export class ClickWebElementByXPath<T extends HTMLElement> implements IClickWebElementXPath {
  constructor(
    private readonly url: IUrl,
    private readonly nodeByXpath: IXPathFirstResult<T>,
    private readonly log: IEasyLogger
  ) { }

  public targetUrl(): IUrl {
    return this.url;
  }

  public xPath(): String {
    return this.nodeByXpath.xPathString();
  }

  public click(): void {
    try {
      let element = this.nodeByXpath.node();
      this.log.info(`will click on element '${element}`);
      element.click();
    } catch (e) {
      throw `Could not click on element given by Xpath '${this.nodeByXpath.xPathString()}': ${e}`;
    }
  }
}
