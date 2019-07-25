import { IEasyLogger } from '../Common/Logger/EasyLogger';
import { IFoxfmSetting } from '../Common/Settings/FoxfmSetting';
import { IExtendWebPage } from '../Common/Toolkit/ExtendWebPage';
import { IFocusElementOnWebPage } from '../Common/Toolkit/FocusElementOnWebPage';
import { IScrapeWebPage } from '../Common/Toolkit/ScrapeWebPage';
import { ISetting } from '../Common/Toolkit/Setting';

export class FoxfmContentScript {
  constructor(
    private readonly settings: ISetting<IFoxfmSetting>,
    private readonly logger: IEasyLogger,
    private readonly extendWebPage: IExtendWebPage,
    private readonly focusElementOnWebPage: IFocusElementOnWebPage,
    private readonly scrapeWebPage: IScrapeWebPage,
  ) { }

  public async main(): Promise<void> {
    var doc = window.document;
    var location = doc.location.href;
    this.logger.info(`S t a r t e d on ${location}`);
    this.extendWebPage.extend(this.logger);
    this.focusElementOnWebPage.focus(this.logger);
    if ((await this.settings.value()).persistInBrowser()) this.scrapeWebPage.scrape(this.logger);
  }
}
