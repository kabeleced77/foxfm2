import { IEasyLogger } from '../Common/Logger/EasyLogger';
import { IFoxfmSetting } from '../Common/Settings/FoxfmSetting';
import { IExtendWebPage } from '../Common/Toolkit/ExtendWebPage';
import { IFocusElementOnWebPage } from '../Common/Toolkit/FocusElementOnWebPage';
import { ISetting } from '../Common/Toolkit/Setting';
import { IImports } from "../Common/Toolkit/IImports";

export class FoxfmContentScript {
  constructor(
    private readonly settings: ISetting<IFoxfmSetting>,
    private readonly logger: IEasyLogger,
    private readonly extendWebPage: IExtendWebPage,
    private readonly focusElementOnWebPage: IFocusElementOnWebPage,
    private readonly imports: IImports,
  ) { }

  public async main(): Promise<void> {
    var doc = window.document;
    var location = doc.location.href;
    this.logger.info(`S t a r t e d on ${location}`);
    this.logger.info(`Will extend page${location}`);
    this.extendWebPage.extend(this.logger);
    this.logger.info(`Will focuse element on page${location}`);
    this.focusElementOnWebPage.focus(this.logger);
    this.logger.info(`Will import data${location}`);
    this.imports.import(this.logger).catch(reason => { throw `Could not execute imports: ${reason}`; });
  }
}
