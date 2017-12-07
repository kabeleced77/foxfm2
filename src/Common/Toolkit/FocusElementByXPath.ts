import { IEasyLogger } from "../Logger/EasyLogger";
import { IWebElementToFocus } from "./WebElementToFocus";
import { IXPathSingleResult } from "./XPathSingleResult";

export class FocusElementByXPath<T extends HTMLElement> implements IWebElementToFocus {
  private readonly element: IXPathSingleResult<T>;
  private readonly log: IEasyLogger;

  constructor(
    element: IXPathSingleResult<T>,
    log: IEasyLogger
  ) {
    this.element = element;
    this.log = log;
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
