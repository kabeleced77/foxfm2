import { IEasyLogger } from '../Common/Logger/EasyLogger';
import { IFoxfmSetting } from '../Common/Settings/FoxfmSetting';
import { IExtendWebPage } from '../Common/Toolkit/ExtendWebPage';
import { IFocusElementOnWebPage } from '../Common/Toolkit/FocusElementOnWebPage';
import { IScrabWebPage } from '../Common/Toolkit/ScrabWebPage';
import { ISetting } from '../Common/Toolkit/Setting';
import { ISaveSoldPlayers } from './TransferMarket/TransferMarketSaveSoldPlayers';

export class FoxfmApp {
  constructor(
    private readonly settings: ISetting<IFoxfmSetting>,
    private readonly logger: IEasyLogger,
    private readonly extendWebPage: IExtendWebPage,
    private readonly focusElementOnWebPage: IFocusElementOnWebPage,
    private readonly scrabWebPage: IScrabWebPage,
    private readonly saveListOfSoldPlayers: ISaveSoldPlayers,
  ) { }

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
