import { IEasyLogger } from '../Logger/EasyLogger';
import { IFocusElementSetting } from '../Settings/FocusElementSetting';
import { IFocusElementsSetting } from '../Settings/FocusElementsSetting';
import { IDom } from './Dom';
import { FocusElementByXPath } from './FocusElementByXPath';
import { IFocusWebElement } from './FocusWebElement';
import { ISetting } from './Setting';
import { IUrl } from './Url';
import { XPathAllResults } from './XPathAllResults';
import { XPathSingleResult } from './XPathSingleResult';
import { XPathString } from './XPathString';

export class FocusElementByXPathConfigureable<T extends HTMLElement> implements IFocusWebElement {
  private readonly url: IUrl;
  private readonly settings: ISetting<IFocusElementsSetting>;
  private readonly log: IEasyLogger;
  private readonly dom: IDom;

  constructor(
    targetUrl: IUrl,
    settings: ISetting<IFocusElementsSetting>,
    dom: IDom,
    log: IEasyLogger,
  ) {
    this.url = targetUrl;
    this.settings = settings;
    this.dom = dom;
    this.log = log;
  }

  public targetUrl(): IUrl {
    return this.url;
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
          let focusElement = elements[0].activated();
          let xPath = elements[0].xPathToElement();

          this.log.info(`if activated the focus will be set to the element given by following xpath: ${xPath} (configration status: ${focusElement})`);
          if (focusElement) {
            new FocusElementByXPath<T>(
              this.url,
              new XPathSingleResult<T>(
                new XPathAllResults(
                  this.dom.dom(),
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
      if (setting.activated()) {
        activatedSetting.push(setting);
      }
    });
    return activatedSetting;
  }
}
