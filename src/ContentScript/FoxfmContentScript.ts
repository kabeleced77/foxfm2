import { IEasyLogger } from '../Common/Logger/EasyLogger';
import { IFoxfmSetting } from '../Common/Settings/FoxfmSetting';
import { IExtendWebPage } from '../Common/Toolkit/ExtendWebPage';
import { IFocusElementOnWebPage } from '../Common/Toolkit/FocusElementOnWebPage';
import { ISetting } from '../Common/Toolkit/Setting';
import { IImports } from "../Common/Toolkit/IImports";
import { IClickElementOnWebPage } from '../Common/Toolkit/IClickElementOnWebPage';

export class FoxfmContentScript {
  constructor(
    private readonly settings: ISetting<IFoxfmSetting>,
    private readonly logger: IEasyLogger,
    private readonly extendWebPage: IExtendWebPage,
    private readonly focusElementOnWebPage: IFocusElementOnWebPage,
    private readonly clickElementOnWebPage: IClickElementOnWebPage,
    private readonly imports: IImports,
  ) { }

  public async main(): Promise<void> {
    var doc = window.document;
    var location = doc.location.href;
    this.logger.info(`S t a r t e d on ${location}`);
    this.logger.info(`Will try to extend page '${location}'`);
    this.extendWebPage.extend(this.logger);
    this.logger.info(`Will try to focus element on page '${location}'`);
    this.focusElementOnWebPage.focus(this.logger);
    try {
      this.logger.info(`Will try to click on element on page '${location}'`);
      this.clickElementOnWebPage.click(this.logger);
    } catch (error) {
      this.logger.error(`Could not automatically click elements: ${error}`);
    }
    this.logger.info(`Will try to import data from '${location}'`);
    this.imports.import(this.logger).catch(reason => { throw `Could not execute imports: ${reason}`; });
  }
}
