import { IEasyLogger } from "../Logger/EasyLogger";
import { IWebElementToFocus } from "./WebElementToFocus";
import { IXPathSingleResult } from "./XPathSingleResult";

export class FocusElementsByXPaths<T extends HTMLElement> implements IWebElementToFocus {
  private readonly elements: Array<IXPathSingleResult<T>>;
  private readonly log: IEasyLogger;

  constructor(
    elements: Array<IXPathSingleResult<T>>,
    log: IEasyLogger
  ) {
    this.elements = elements;
    this.log = log;
  }

  public focus(): void {
    this.elements.forEach(e => {
      let element = e.element();
      this.log.info(`will set focus to element '${element}`);
      try {
        element.focus();
      } catch (e) {
        throw new Error(`Could not set focus to element '${element}': ${e}. ${e.stack}`);
      }
    });
  }
}
