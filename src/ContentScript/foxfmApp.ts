import { Logger, ILogger } from "../Common/Logger/Logger"
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { LogLevelError, ILogLevel } from '../Common/Logger/LogLevel';
import { StadiumManagerUi } from "./StadiumManagerUi"
import { TeamWebPage } from "./TeamWebPage"
import { StrengthsLimitsSetting } from "../Common/Settings/StrengthsLimitsSetting"
import { TeamTableSetting } from "../Common/Settings/TeamTableSetting"
import { TransferTableUi } from "./TransferTableUi"
import { TransferTablePossibleOffers, ITransferTablePossibleOffers } from "../Common/TransferTablePossibleOffers";
import { AwpAndStrengthColumns } from "../Common/AwpAndStrengthColumns";
import { XPathHtmlTableCell2, XPathHtmlTableCell } from "../Common/Toolkit/XPathHtmlTableCell";
import { XPathSingleResult2, XPathSingleResult } from "../Common/Toolkit/XPathSingleResult";
import { XPathAllResults2, XPathAllResults } from "../Common/Toolkit/XPathAllResults";
import { XPathInformation, XPathString } from "../Common/Toolkit/XPathString";
import { TransferTablePossibleOffersUiUrl } from "../Common/Urls/TransferTablePossibleOffersUiUrl";
import { TransferMarketSearchResultTableUi } from "./TransferMarketSearchResultTableUi";
import { ITransferMarketSearchResultTable, TransferMarketSearchResultTable } from "../Common/TransferMarketSearchResultTable";
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
import { ITransferMarketAmateurPlayerTableExtensionSetting, TransferMarketAmateurPlayerTableExtensionSetting } from "../Common/Settings/TransferMarketAmateurPlayerTableExtensionSetting";
import { TransferMarketAmateurWebPage } from "../Common/TransferMarketAmateurWebPage";
import { TransferMarketAmateurPlayerTable } from "../Common/TransferMarketAmateurPlayerTable";
import { HtmlTable } from "../Common/Toolkit/HtmlTable";
import { HtmlTableByXPath } from "../Common/Toolkit/HtmlTableByXPath";
import { FirstElementInXPathNodeOrParents } from "../Common/Toolkit/FirstElementInXPathNodeOrParents";
import { AwpPointsByTrainingAndExperience } from "../Common/AwpPointsByTrainingAndExperience";
import { TrainingPoints } from "../Common/TrainingPoints";
import { ExperiencePoints } from "../Common/ExperiencePoints";
import { HtmlTableColumn } from "../Common/Toolkit/HtmlTableColumn";
import { HtmlTableColumnNumberValues } from "../Common/Toolkit/HtmlTableColumnNumberValues";
import { HtmlTableColumnHeader } from "../Common/Toolkit/HtmlTableColumnHeader";
import { HtmlAttribute, IHtmlAttribute } from "../Common/Toolkit/HtmlAttribute";
import { HtmlElement } from "../Common/Toolkit/HtmlElement";
import { AwpDiffPointsByTrainingAndExperience } from "../Common/AwpDiffPointsByTrainingAndExperience";
import { StrengthLevels } from "../Common/StrengthLevels";
import { AwpPointsByEpTp } from "../Common/Toolkit/AwpPoints";
import { StrengthValues } from "../Common/StrengthValues";
import { TeamPlayerTable } from "../Common/TeamPlayerTable";

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
      // Extend transfer market - search result table
      new ExtendWebPage(
        new Url(currentUrl),
        new TransferMarketSearchResultTableUi(
          new Dom(doc),
          new TransferMarketProfessionalsUiUrl(),
          new StrengthsLimitsSetting(),
          new StorageLocal<ITransferMarketSearchResultTable>(
            new SettingNameTransferMarketProfessionalsSearchResultTable(),
            new TransferMarketSearchResultTable(
              new TransferMarketProfessionalsUiUrl(),
              new ExperienceAndTrainingColumn(
                new XPathHtmlTableCell2(
                  new XPathSingleResult2<HTMLTableCellElement>(
                    new XPathAllResults2(
                      new XPathInformation(
                        new TransferMarketProfessionalsUiUrl(),
                        '//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[6]')))),
                new XPathHtmlTableCell2(
                  new XPathSingleResult2<HTMLTableCellElement>(
                    new XPathAllResults2(
                      new XPathInformation(
                        new TransferMarketProfessionalsUiUrl(),
                        '//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[5]'
                      )
                    )
                  )
                ),
                true
              )
            )
          ),
          new EasyLogger(
            logger,
            new RegisteredLoggingModule(
              "TransferMarketSearchResultTableUi",
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
      // Extend transfer market - possible offer table
      new ExtendWebPage(
        new Url(currentUrl),
        new TransferTableUi(
          new Dom(doc),
          new TransferTablePossibleOffersUiUrl(),
          new StrengthsLimitsSetting(),
          new StorageLocal<ITransferTablePossibleOffers>(
            new SettingNameTransferTablePossibleOffers(),
            new TransferTablePossibleOffers(
              new AwpAndStrengthColumns(
                new XPathHtmlTableCell2(
                  new XPathSingleResult2<HTMLTableCellElement>(
                    new XPathAllResults2(
                      new XPathInformation(
                        new TransferTablePossibleOffersUiUrl(),
                        '//*[@id="punkte"]')))),
                new XPathHtmlTableCell2(
                  new XPathSingleResult2<HTMLTableCellElement>(
                    new XPathAllResults2(
                      new XPathInformation(
                        new TransferTablePossibleOffersUiUrl(),
                        '//*[@id="staerke"]')))),
                true
              )
            )
          ),
          new EasyLogger(
            logger,
            new RegisteredLoggingModule(
              "TransferTableUi",
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
                new ExperiencePoints(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="playerTable"]/thead/tr/th[13]')))))),
                new TrainingPoints(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="playerTable"]/thead/tr/th[14]')))))))),
            new TeamTableSetting(),
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
                new ExperiencePoints(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[6]')))))),
                new TrainingPoints(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[7]')))))))),
            new StorageLocal<ITransferMarketAmateurPlayerTableExtensionSetting>(
              new SettingNameTransferMarketAmateurTable(),
              new TransferMarketAmateurPlayerTableExtensionSetting(
                true,
                true)),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "TransferMarketAmateurPlayerTable",
                new LogLevelError())))),
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
