import { Logger, ILogger } from "../Common/Logger/Logger"
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { LogLevelError, ILogLevel } from '../Common/Logger/LogLevel';
import { StadiumManagerUi } from "./Stadium/StadiumManagerUi"
import { TeamWebPage } from "./Team/TeamWebPage"
import { StrengthsLimitsSetting } from "../Common/Settings/StrengthsLimitsSetting"
import { TeamTableSetting, ITeamTableSetting } from "../Common/Settings/TeamTableSetting"
import { TransferMarketOfferWebPage } from "./TransferMarket/TransferMarketOfferWebPage"
import { TransferOfferTableSettings, ITransferOfferTableSettings } from "../Common/Settings/TransferOfferTableSettings";
import { XPathHtmlTableCell2, XPathHtmlTableCell } from "../Common/Toolkit/XPathHtmlTableCell";
import { XPathSingleResult2, XPathSingleResult } from "../Common/Toolkit/XPathSingleResult";
import { XPathAllResults2, XPathAllResults } from "../Common/Toolkit/XPathAllResults";
import { XPathInformation, XPathString } from "../Common/Toolkit/XPathString";
import { TransferOfferWebPageUrl } from "../Common/Urls/TransferOfferWebPageUrl";
import { TransferMarketProfessionalWebPage } from "./TransferMarket/TransferMarketProfessionalWebPage";
import { TransferMarketProfessionalPlayerTable } from "./TransferMarket/TransferMarketProfessionalPlayerTable";
import { TransferMarketProfessionalsUiUrl } from "../Common/Urls/TransferMarketProfessionalsUiUrl";
import { TransferMarketAmateurWebPageUrl } from "../Common/Urls/TransferMarketAmateurWebPageUrl";
import { ExperienceAndTrainingColumn } from "../Common/ExperienceAndTrainingColumn";
import { Url } from "../Common/Toolkit/Url";
import { HtmlTableColumnByXpath } from "../Common/Toolkit/HtmlTableColumnByXpath";
import { Mutex } from "../Common/Toolkit/Mutex";
import { IRegisteredLoggingModules, RegisteredLoggingModules } from "../Common/Logger/RegisteredLoggingModules";
import { SettingNameLoggingModules } from "../Common/Settings/SettingNameLoggingModules";
import { SettingNameTransferTablePossibleOffers } from "../Common/Settings/SettingNameTransferTablePossibleOffers";
import { SettingNameTransferMarketProfessionalsSearchResultTable } from "../Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable";
import { SettingNameTransferMarketAmateurTable } from "../Common/Settings/SettingNameTransferMarketAmateurTable";
import { StorageLocal } from "../Common/Toolkit/StorageLocal";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";
import { SettingNameApplicationLogLevel } from "../Common/Settings/SettingNameApplicationLogLevel";
import { IEasyLogger, EasyLogger } from "../Common/Logger/EasyLogger";
import { ExtendWebPage, IExtendWebPage } from "../Common/Toolkit/ExtendWebPage";
import { Dom } from "../Common/Toolkit/Dom";
import { ExtendWebPages, IExtendWebPages } from "../Common/Toolkit/ExtendWebPages";
import { TeamWebPageUrl } from "../Common/Urls/TeamWebPageUrl";
import { StadiumWebPageUrl } from "../Common/Urls/StadiumWebPageUrl";
import { ITransferMarketAmateurPlayerTableSettings, TransferMarketAmateurPlayerTableSettings } from "../Common/Settings/TransferMarketAmateurPlayerTableSettings";
import { TransferMarketAmateurWebPage } from "./TransferMarket/TransferMarketAmateurWebPage";
import { TransferMarketAmateurPlayerTable } from "./TransferMarket/TransferMarketAmateurPlayerTable";
import { HtmlTable } from "../Common/Toolkit/HtmlTable";
import { HtmlTableByXPath } from "../Common/Toolkit/HtmlTableByXPath";
import { FirstElementInXPathNodeOrParents } from "../Common/Toolkit/FirstElementInXPathNodeOrParents";
import { HtmlTableColumn } from "../Common/Toolkit/HtmlTableColumn";
import { HtmlTableColumnNumberValues } from "../Common/Toolkit/HtmlTableColumnNumberValues";
import { HtmlTableColumnHeader } from "../Common/Toolkit/HtmlTableColumnHeader";
import { HtmlAttribute, IHtmlAttribute } from "../Common/Toolkit/HtmlAttribute";
import { HtmlElement } from "../Common/Toolkit/HtmlElement";
import { StrengthLevels } from "../Common/StrengthLevels";
import { AwpPointsByEpTp, AwpPoints, AwpPointsBySplittedString } from "../Common/Toolkit/AwpPoints";
import { StrengthValues } from "../Common/StrengthValues";
import { TeamPlayerTable } from "./Team/TeamPlayerTable";
import { TransferMarketOfferPlayerTable } from "./TransferMarket/TransferMarketOfferPlayerTable";
import { TransferMarketSearchResultTableSettings, ITransferMarketSearchResultTableSettings } from "../Common/Settings/TransferMarketSearchResultTableSettings";
import { HtmlTableColumnStringValues } from "../Common/Toolkit/HtmlTableColumnStringValues";
import { SplitStringsToNumbers } from "../Common/Toolkit/SplitStrings";
import { SettingNameTeamTable } from "../Common/Settings/SettingNameTeamTable";
import { PlayerTransferMarketWebPage } from "./Player/PlayerTransferMarketWebPage";
import { HtmlSelect } from "../Common/Toolkit/HtmlSelect";
import { PlayerTransferMarketSellingWebPageUrl } from "../Common/Urls/PlayerTransferMarketSellingWebPageUrl";
import { PlayerTransferMarketDurationSelect } from "./Player/PlayerTransferMarketDurationSelect";
import { TransferMarketSellingDurationSettings, ITransferMarketSellingDurationSettings } from "../Common/Settings/TransferMarketSellingDurationSettings";
import { SettingNameTransferMarketSellingDuration } from "../Common/Settings/SettingNameTransferMarketDuration";
import { HtmlSelectById } from "../Common/Toolkit/HtmlSelectById";
import { TransferMarketOfferDurationSelect } from "./TransferMarket/TransferMarketOfferDurationSelect";
import { PlayerInformationWebPage } from "./Player/PlayerInformationWebPage";
import { PlayerInformationWebPageUrl } from "../Common/Urls/PlayerInformationWebPageUrl";
import { FocusElementByXPathConfigureable } from "../Common/Toolkit/FocusElementByXPathConfigureable";
import { FocusElementSetting } from "../Common/Settings/FocusElementSetting";
import { SettingNamePlayerInformationWebPageFocusElement } from "../Common/Settings/SettingNamePlayerInformationWebPageFocusElement";
import { RessourcePlayerInformationWebPageElementTransferMarket } from "../Common/Ressource";

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
            new StorageLocal(
              new SettingNamePlayerInformationWebPageFocusElement(),
              new FocusElementSetting(
                false,
                "/html/body[1]/div[2]/table[3]/tbody[1]/tr[1]/td[2]/a[3]",
                new RessourcePlayerInformationWebPageElementTransferMarket()
              )
            ),
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
      // Extend player transfer market - selling duration
      new ExtendWebPage(
        new Url(currentUrl),
        new PlayerTransferMarketWebPage(
          new PlayerTransferMarketSellingWebPageUrl(),
          new PlayerTransferMarketDurationSelect(
            new HtmlSelect(
              new HtmlSelectById(
                new Dom(doc),
                "startwoche")),
            new StorageLocal<ITransferMarketSellingDurationSettings>(
              new SettingNameTransferMarketSellingDuration(),
              new TransferMarketSellingDurationSettings(
                false,
                3)),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "PlayerTransferMarketSelling",
                new LogLevelError())))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "PlayerTransferMarketWebPage",
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
              new TransferMarketSellingDurationSettings(
                false,
                3)),
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
