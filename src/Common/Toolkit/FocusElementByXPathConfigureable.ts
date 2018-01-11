import { IEasyLogger } from "../Logger/EasyLogger";
import { IWebElementToFocus } from "./WebElementToFocus";
import { ISetting } from "./Setting";
import { IFocusElementSetting } from "../Settings/FocusElementSetting";
import { FocusElementByXPath } from "./FocusElementByXPath";
import { XPathSingleResult } from "./XPathSingleResult";
import { IDom } from "./Dom";
import { XPathAllResults } from "./XPathAllResults";
import { XPathString } from "./XPathString";
import { IFocusElementsSetting } from "../Settings/FocusElementsSetting";

export class FocusElementByXPathConfigureable<T extends HTMLElement> implements IWebElementToFocus {
  private readonly settings: ISetting<IFocusElementsSetting>;
  private readonly log: IEasyLogger;
  private readonly dom: IDom;

  constructor(
    settings: ISetting<IFocusElementsSetting>,
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
        if (setting.activated()) {
          let elements = this.elementsToFocus(setting.elements().array());
          if (elements.length === 0) {
            return;
          } else if (elements.length > 1) {
            throw new Error(`More than one element has been activated to be focused.`);
          }
          let focusElement = elements[0].focusElement();
          let xPath = elements[0].xPathToElement();

          this.log.info(`if activated the focus will be set to the element given by following xpath: ${xPath} (configration status: ${focusElement})`);
          if (focusElement) {
            new FocusElementByXPath<T>(
              new XPathSingleResult<T>(
                new XPathAllResults(this.dom.dom(),
                  new XPathString(xPath))),
              this.log)
              .focus();
          }
        }
      });
  }

  private elementsToFocus(settings: Array<IFocusElementSetting>): Array<IFocusElementSetting> {
    let activatedSetting: IFocusElementSetting[] = [];
    settings.forEach(setting => {
      if (setting.focusElement()) {
        activatedSetting.push(setting);
      }
    });
    return activatedSetting;
  }
}
