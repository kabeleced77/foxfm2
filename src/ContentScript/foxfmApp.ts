import { EasyLogger, IEasyLogger } from '../Common/Logger/EasyLogger';
import { Logger } from '../Common/Logger/Logger';
import { ILogLevel, LogLevelError } from '../Common/Logger/LogLevel';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import { IFocusElementsSetting } from '../Common/Settings/FocusElementsSetting';
import {
  PlayerTransferMarketPageFocusElementSettingName,
} from '../Common/Settings/PlayerTransferMarketPageFocusElementSettingName';
import { SettingNameApplicationLogLevel } from '../Common/Settings/SettingNameApplicationLogLevel';
import { SettingNameLoggingModules } from '../Common/Settings/SettingNameLoggingModules';
import {
  SettingNamePlayerInformationWebPageFocusElement,
} from '../Common/Settings/SettingNamePlayerInformationWebPageFocusElement';
import { SettingNameTeamTable } from '../Common/Settings/SettingNameTeamTable';
import { SettingNameTransferMarketAmateurTable } from '../Common/Settings/SettingNameTransferMarketAmateurTable';
import { SettingNameTransferMarketSellingDuration } from '../Common/Settings/SettingNameTransferMarketDuration';
import {
  SettingNameTransferMarketProfessionalsSearchResultTable,
} from '../Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable';
import { SettingNameTransferTablePossibleOffers } from '../Common/Settings/SettingNameTransferTablePossibleOffers';
import { StrengthsLimitsSetting } from '../Common/Settings/StrengthsLimitsSetting';
import { ITeamTableSetting, TeamTableSetting } from '../Common/Settings/TeamTableSetting';
import {
  ITransferMarketAmateurPlayerTableSettings,
  TransferMarketAmateurPlayerTableSettings,
} from '../Common/Settings/TransferMarketAmateurPlayerTableSettings';
import {
  ITransferMarketSearchResultTableSettings,
  TransferMarketSearchResultTableSettings,
} from '../Common/Settings/TransferMarketSearchResultTableSettings';
import { ITransferMarketSellingDurationSettings } from '../Common/Settings/TransferMarketSellingDurationSettings';
import { ITransferOfferTableSettings, TransferOfferTableSettings } from '../Common/Settings/TransferOfferTableSettings';
import {
  PlayerInformationPageFocusElementSettingDefaultValue,
} from '../Common/SettingsDefaultValues/PlayerInformationPageFocusElementSettingDefaultValue';
import {
  PlayerTransferMarketPageFocusElementSettingDefaultValue,
} from '../Common/SettingsDefaultValues/PlayerTransferMarketPageFocusElementSettingDefaultValue';
import {
  TransferMarketSellingDurationSettingsDefaultValue,
} from '../Common/SettingsDefaultValues/TransferMarketSellingDurationSettingsDefaultValue';
import { StrengthLevels } from '../Common/StrengthLevels';
import { StrengthValues } from '../Common/StrengthValues';
import { AwpPoints, AwpPointsByEpTp, AwpPointsBySplittedString } from '../Common/Toolkit/AwpPoints';
import { Dom } from '../Common/Toolkit/Dom';
import { ExtendWebPage, IExtendWebPage } from '../Common/Toolkit/ExtendWebPage';
import { ExtendWebPages, IExtendWebPages } from '../Common/Toolkit/ExtendWebPages';
import { FirstElementInXPathNodeOrParents } from '../Common/Toolkit/FirstElementInXPathNodeOrParents';
import { FocusElementByXPathConfigureable } from '../Common/Toolkit/FocusElementByXPathConfigureable';
import { HtmlSelect } from '../Common/Toolkit/HtmlSelect';
import { HtmlSelectById } from '../Common/Toolkit/HtmlSelectById';
import { HtmlTable } from '../Common/Toolkit/HtmlTable';
import { HtmlTableByXPath } from '../Common/Toolkit/HtmlTableByXPath';
import { HtmlTableColumnByXpath } from '../Common/Toolkit/HtmlTableColumnByXpath';
import { HtmlTableColumnNumberValues } from '../Common/Toolkit/HtmlTableColumnNumberValues';
import { HtmlTableColumnStringValues } from '../Common/Toolkit/HtmlTableColumnStringValues';
import { Mutex } from '../Common/Toolkit/Mutex';
import { SplitStringsToNumbers } from '../Common/Toolkit/SplitStrings';
import { StorageLocal } from '../Common/Toolkit/StorageLocal';
import { StorageLocalSync } from '../Common/Toolkit/StorageLocalSync';
import { Url } from '../Common/Toolkit/Url';
import { XPathAllResults } from '../Common/Toolkit/XPathAllResults';
import { XPathHtmlTableCell } from '../Common/Toolkit/XPathHtmlTableCell';
import { XPathSingleResult } from '../Common/Toolkit/XPathSingleResult';
import { XPathString } from '../Common/Toolkit/XPathString';
import { PlayerInformationWebPageUrl } from '../Common/Urls/PlayerInformationWebPageUrl';
import { PlayerTransferMarketWebPageUrl } from '../Common/Urls/PlayerTransferMarketWebPageUrl';
import { StadiumWebPageUrl } from '../Common/Urls/StadiumWebPageUrl';
import { TeamWebPageUrl } from '../Common/Urls/TeamWebPageUrl';
import { TransferMarketAmateurWebPageUrl } from '../Common/Urls/TransferMarketAmateurWebPageUrl';
import { TransferMarketProfessionalsUiUrl } from '../Common/Urls/TransferMarketProfessionalsUiUrl';
import { TransferOfferWebPageUrl } from '../Common/Urls/TransferOfferWebPageUrl';
import { PlayerInformationWebPage } from './Player/PlayerInformationWebPage';
import { PlayerTransferMarketDurationSelect } from './Player/PlayerTransferMarketDurationSelect';
import { PlayerTransferMarketWebPage } from './Player/PlayerTransferMarketWebPage';
import { StadiumManagerUi } from './Stadium/StadiumManagerUi';
import { TeamPlayerTable } from './Team/TeamPlayerTable';
import { TeamWebPage } from './Team/TeamWebPage';
import { TransferMarketAmateurPlayerTable } from './TransferMarket/TransferMarketAmateurPlayerTable';
import { TransferMarketAmateurWebPage } from './TransferMarket/TransferMarketAmateurWebPage';
import { TransferMarketOfferDurationSelect } from './TransferMarket/TransferMarketOfferDurationSelect';
import { TransferMarketOfferPlayerTable } from './TransferMarket/TransferMarketOfferPlayerTable';
import { TransferMarketOfferWebPage } from './TransferMarket/TransferMarketOfferWebPage';
import { TransferMarketProfessionalPlayerTable } from './TransferMarket/TransferMarketProfessionalPlayerTable';
import { TransferMarketProfessionalWebPage } from './TransferMarket/TransferMarketProfessionalWebPage';
import { PlayerTransferMarketPlayerWebPageUrl } from '../Common/Urls/PlayerTransferMarketPlayerWebPageUrl';
import { PlayerTransferMarketPlayerWebPage } from './Player/PlayerTransferMarketPlayerWebPage';
import { PlayerTransferMarketPlayerPageFocusElementSettingName } from '../Common/Settings/PlayerTransferMarketPlayerPageFocusElementSettingName';
import { PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue } from '../Common/SettingsDefaultValues/PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue';

class foxfmApp {
  private logger: IEasyLogger;
  private extendWebPages: IExtendWebPages;

  constructor(logger: IEasyLogger, extendWebPages: IExtendWebPages) {
    this.logger = logger;
    this.extendWebPages = extendWebPages;
  }

  public main(): void {
    var doc = window.document;
    var location = doc.location.href;
    this.logger.info(`S t a r t e d on ${location}`);
    this.extendWebPages.extend();
  }
}

var doc = window.document;
var currentUrl = doc.location.href;

// use Singleton to prevent race condition saving registered logging modules from different instances
// --> Nevertheless, if loaded several times in parallel (mainly more than one fram on a web site), 
//     race condition still happens
// ==> 
var logger = new Logger(
  new StorageLocal<ILogLevel>(
    new SettingNameApplicationLogLevel(),
    new LogLevelError()),
  new StorageLocalSync<IRegisteredLoggingModules>(
    new Mutex<IRegisteredLoggingModules>(),
    new StorageLocal<IRegisteredLoggingModules>(
      new SettingNameLoggingModules(),
      new RegisteredLoggingModules(
        new Array<IRegisteredLoggingModule>()))));

var app = new foxfmApp(
  new EasyLogger(
    logger,
    new RegisteredLoggingModule(
      "foxfmApp",
      new LogLevelError())
  ),
  new ExtendWebPages(
    new Array<IExtendWebPage>(
      // Extend player information - set focus
      new ExtendWebPage(
        new Url(currentUrl),
        new PlayerInformationWebPage(
          new PlayerInformationWebPageUrl(),
          new FocusElementByXPathConfigureable(
            new StorageLocal<IFocusElementsSetting>(
              new SettingNamePlayerInformationWebPageFocusElement(),
              new PlayerInformationPageFocusElementSettingDefaultValue()),
            new Dom(doc),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "FocusElementByXPathConfigureable",
                new LogLevelError())))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "PlayerInformationWebPage",
            new LogLevelError()))),
      // Extend player transfer market - focus elements
      new ExtendWebPage(
        new Url(currentUrl),
        new PlayerTransferMarketWebPage(
          new PlayerTransferMarketWebPageUrl(),
          new FocusElementByXPathConfigureable(
            new StorageLocal<IFocusElementsSetting>(
              new PlayerTransferMarketPageFocusElementSettingName(),
              new PlayerTransferMarketPageFocusElementSettingDefaultValue()),
            new Dom(doc),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "FocusElementByXPathConfigureable",
                new LogLevelError())))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "PlayerTransferMarketWebPage",
            new LogLevelError()))),
      // Extend player transfer market player - selling duration & focus element
      new ExtendWebPage(
        new Url(currentUrl),
        new PlayerTransferMarketPlayerWebPage(
          new PlayerTransferMarketPlayerWebPageUrl(),
          new PlayerTransferMarketDurationSelect(
            new HtmlSelect(
              new HtmlSelectById(
                new Dom(doc),
                "startwoche")),
            new StorageLocal<ITransferMarketSellingDurationSettings>(
              new SettingNameTransferMarketSellingDuration(),
              new TransferMarketSellingDurationSettingsDefaultValue()),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "PlayerTransferMarketPlayerDurationSelect",
                new LogLevelError()))),
          new FocusElementByXPathConfigureable(
            new StorageLocal<IFocusElementsSetting>(
              new PlayerTransferMarketPlayerPageFocusElementSettingName(),
              new PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue()),
            new Dom(doc),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "FocusElementByXPathConfigureable",
                new LogLevelError())))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "PlayerTransferMarketPlayerWebPage",
            new LogLevelError()))),
      // Extend transfer market - search result table
      new ExtendWebPage(
        new Url(currentUrl),
        new TransferMarketProfessionalWebPage(
          new TransferMarketProfessionalsUiUrl(),
          new TransferMarketProfessionalPlayerTable(
            new HtmlTable(
              new HtmlTableByXPath<HTMLTableCellElement>(
                new FirstElementInXPathNodeOrParents<HTMLTableCellElement, HTMLTableElement>(
                  new XPathSingleResult<HTMLTableCellElement>(
                    new XPathAllResults(
                      window.document,
                      new XPathString('//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[2]'))),
                  "table"))),
            new HtmlTableColumnByXpath(
              new XPathHtmlTableCell(
                new XPathSingleResult<HTMLTableCellElement>(
                  new XPathAllResults(
                    window.document,
                    new XPathString('//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[5]'))))),
            new StrengthLevels(
              new StrengthsLimitsSetting(),
              new StrengthValues(
                new HtmlTableColumnByXpath(
                  new XPathHtmlTableCell(
                    new XPathSingleResult<HTMLTableCellElement>(
                      new XPathAllResults(
                        window.document,
                        new XPathString('//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[5]')))))),
              new AwpPointsBySplittedString(
                new SplitStringsToNumbers(
                  new HtmlTableColumnStringValues(
                    new HtmlTableColumnByXpath(
                      new XPathHtmlTableCell(
                        new XPathSingleResult<HTMLTableCellElement>(
                          new XPathAllResults(
                            window.document,
                            new XPathString('//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[6]')))))),
                  "/",
                  ","))),
            new StorageLocal<ITransferMarketSearchResultTableSettings>(
              new SettingNameTransferMarketProfessionalsSearchResultTable(),
              new TransferMarketSearchResultTableSettings(
                false,
                false,
                false,
                false)))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "ExtendWebPage",
            new LogLevelError())
        )
      ),
      // Extend transfer market - possible offer table
      new ExtendWebPage(
        new Url(currentUrl),
        new TransferMarketOfferWebPage(
          new TransferOfferWebPageUrl(),
          new TransferMarketOfferPlayerTable(
            new HtmlTable(
              new HtmlTableByXPath<HTMLTableCellElement>(
                new FirstElementInXPathNodeOrParents<HTMLTableCellElement, HTMLTableElement>(
                  new XPathSingleResult<HTMLTableCellElement>(
                    new XPathAllResults(
                      window.document,
                      new XPathString('//*[@id="players_to_market"]'))),
                  "table"))),
            new HtmlTableColumnByXpath(
              new XPathHtmlTableCell(
                new XPathSingleResult<HTMLTableCellElement>(
                  new XPathAllResults(
                    window.document,
                    new XPathString('//*[@id="staerke"]'))))),
            new StrengthLevels(
              new StrengthsLimitsSetting(),
              new StrengthValues(
                new HtmlTableColumnByXpath(
                  new XPathHtmlTableCell(
                    new XPathSingleResult<HTMLTableCellElement>(
                      new XPathAllResults(
                        window.document,
                        new XPathString('//*[@id="staerke"]')))))),
              new AwpPoints(
                new HtmlTableColumnNumberValues(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="punkte"]')))))))),
            new StorageLocal<ITransferOfferTableSettings>(
              new SettingNameTransferTablePossibleOffers(),
              new TransferOfferTableSettings(
                true,
                true,
                true))),
          new TransferMarketOfferDurationSelect(
            new HtmlSelect(
              new HtmlSelectById(
                new Dom(doc),
                "startwoche")),
            new StorageLocal<ITransferMarketSellingDurationSettings>(
              new SettingNameTransferMarketSellingDuration(),
              new TransferMarketSellingDurationSettingsDefaultValue()),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "TransferMarketOfferDurationSelect",
                new LogLevelError()))
          )),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "ExtendWebPage",
            new LogLevelError()))),
      // Extend team table
      new ExtendWebPage(
        new Url(currentUrl),
        new TeamWebPage(
          new TeamWebPageUrl(),
          new TeamPlayerTable(
            new HtmlTable(
              new HtmlTableByXPath<HTMLTableCellElement>(
                new FirstElementInXPathNodeOrParents<HTMLTableCellElement, HTMLTableElement>(
                  new XPathSingleResult<HTMLTableCellElement>(
                    new XPathAllResults(
                      window.document,
                      new XPathString('//*[@id="playerTable"]'))),
                  "table"))),
            new HtmlTableColumnByXpath(
              new XPathHtmlTableCell(
                new XPathSingleResult<HTMLTableCellElement>(
                  new XPathAllResults(
                    window.document,
                    new XPathString('//*[@id="playerTable"]/thead/tr/th[10]'))))),
            new StrengthLevels(
              new StrengthsLimitsSetting(),
              new StrengthValues(
                new HtmlTableColumnByXpath(
                  new XPathHtmlTableCell(
                    new XPathSingleResult<HTMLTableCellElement>(
                      new XPathAllResults(
                        window.document,
                        new XPathString('//*[@id="playerTable"]/thead/tr/th[10]')))))),
              new AwpPointsByEpTp(
                new HtmlTableColumnNumberValues(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="playerTable"]/thead/tr/th[13]')))))),
                new HtmlTableColumnNumberValues(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="playerTable"]/thead/tr/th[14]')))))))),
            new StorageLocal<ITeamTableSetting>(
              new SettingNameTeamTable(),
              new TeamTableSetting(
                false,
                false,
                false)),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "TeamUi",
                new LogLevelError())))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "ExtendWebPage",
            new LogLevelError()))),
      // Extend amateur transfer market
      new ExtendWebPage(
        new Url(currentUrl),
        new TransferMarketAmateurWebPage(
          new TransferMarketAmateurWebPageUrl(),
          new TransferMarketAmateurPlayerTable(
            new HtmlTable(
              new HtmlTableByXPath<HTMLTableCellElement>(
                new FirstElementInXPathNodeOrParents<HTMLTableCellElement, HTMLTableElement>(
                  new XPathSingleResult<HTMLTableCellElement>(
                    new XPathAllResults(
                      window.document,
                      new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[7]')
                    )
                  ),
                  "table"
                )
              )),
            new HtmlTableColumnByXpath(
              new XPathHtmlTableCell(
                new XPathSingleResult<HTMLTableCellElement>(
                  new XPathAllResults(
                    window.document,
                    new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[5]'))))),
            new StrengthLevels(
              new StrengthsLimitsSetting(),
              new StrengthValues(
                new HtmlTableColumnByXpath(
                  new XPathHtmlTableCell(
                    new XPathSingleResult<HTMLTableCellElement>(
                      new XPathAllResults(
                        window.document,
                        new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[5]')))))),
              new AwpPointsByEpTp(
                new HtmlTableColumnNumberValues(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[6]')))))),
                new HtmlTableColumnNumberValues(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[7]')))))))),
            new StorageLocal<ITransferMarketAmateurPlayerTableSettings>(
              new SettingNameTransferMarketAmateurTable(),
              new TransferMarketAmateurPlayerTableSettings(
                false,
                false,
                false,
                false)))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "ExtendWebPage",
            new LogLevelError()))),
      // Extend stadium
      new ExtendWebPage(
        new Url(currentUrl),
        new StadiumManagerUi(
          new Dom(doc),
          new StadiumWebPageUrl(),
          new EasyLogger(
            logger,
            new RegisteredLoggingModule(
              "StadiumManagerUi",
              new LogLevelError())
          )
        ),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "ExtendWebPage",
            new LogLevelError())
        )
      ),
    )
  )
);
app.main();
