import { IEasyLogger } from "../Logger/EasyLogger";
import { IWebElementToFocus } from "./WebElementToFocus";
import { ISetting } from "./Setting";
import { IFocusElementSetting } from "../Settings/FocusElementSetting";
import { FocusElementByXPath } from "./FocusElementByXPath";
import { XPathSingleResult } from "./XPathSingleResult";
import { IDom } from "./Dom";
import { XPathAllResults } from "./XPathAllResults";
import { XPathString } from "./XPathString";

export class FocusElementByXPathConfigureable<T extends HTMLElement> implements IWebElementToFocus {
  private readonly settings: ISetting<IFocusElementSetting>;
  private readonly log: IEasyLogger;
  private readonly dom: IDom;

  constructor(
    settings: ISetting<IFocusElementSetting>,
    dom: IDom,
    log: IEasyLogger
  ) {
    this.settings = settings;
    this.dom = dom;
    this.log = log;
  }

  public focus(): void {
    this.settings
      .value()
      .then(setting => {
        let configStatus = setting.focusElement();
        let xPath = setting.xPathToElement();
        this.log.info(`if activated the focus will be set to the element given by following xpath: ${xPath} (configration status: ${configStatus})`);
        if (configStatus) {
          let element = new FocusElementByXPath<T>(
            new XPathSingleResult<T>(
              new XPathAllResults(this.dom.dom(),
                new XPathString(xPath))),
            this.log);
          element.focus();
        }
      });
  }
}
