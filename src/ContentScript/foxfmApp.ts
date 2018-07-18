import { IEasyLogger } from '../Common/Logger/EasyLogger';
import { IFoxfmSetting } from '../Common/Settings/FoxfmSetting';
import { IExtendWebPage } from '../Common/Toolkit/ExtendWebPage';
import { IFocusElementOnWebPage } from '../Common/Toolkit/FocusElementOnWebPage';
import { IScrabWebPage } from '../Common/Toolkit/ScrabWebPage';
import { ISetting } from '../Common/Toolkit/Setting';
import { ISaveSoldPlayers } from './TransferMarket/TransferMarketSaveSoldPlayers';

export class FoxfmApp {
  private readonly settings: ISetting<IFoxfmSetting>;
  private logger: IEasyLogger;
  private extendWebPage: IExtendWebPage;
  private focusElementOnWebPage: IFocusElementOnWebPage;
  private scrabWebPage: IScrabWebPage;
  private saveListOfSoldPlayers: ISaveSoldPlayers;

  constructor(
    settings: ISetting<IFoxfmSetting>,
    logger: IEasyLogger,
    extendWebPage: IExtendWebPage,
    focuElementOnWebPage: IFocusElementOnWebPage,
    scrabWebPage: IScrabWebPage,
    saveListOfSoldPlayers: ISaveSoldPlayers,
  ) {
    this.settings = settings;
    this.logger = logger;
    this.extendWebPage = extendWebPage;
    this.focusElementOnWebPage = focuElementOnWebPage;
    this.scrabWebPage = scrabWebPage;
    this.saveListOfSoldPlayers = saveListOfSoldPlayers;
  }

  public async main(): Promise<void> {
    var doc = window.document;
    var location = doc.location.href;
    this.logger.info(`S t a r t e d on ${location}`);
    this.extendWebPage.extend(this.logger);
    this.focusElementOnWebPage.focus(this.logger);
    if ((await this.settings.value()).persistInBrowser()) this.scrabWebPage.scrab(this.logger);
    this.saveListOfSoldPlayers.save();
  }
}
