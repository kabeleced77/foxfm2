import { Logger, ILogger } from "../Common/Logger/Logger"
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { LogLevelError, ILogLevel } from '../Common/Logger/LogLevel';
import { StadiumManagerUi } from "./StadiumManagerUi"
import { TeamUi } from "./TeamUi"
import { StrengthLevelsSetting, IStrengthLevelsSetting } from "../Common/Settings/StrengthLevelsSetting"
import { TeamTableSetting } from "../Common/Settings/TeamTableSetting"
import { TransferTableUi } from "./TransferTableUi"
import { TransferTablePossibleOffers, ITransferTablePossibleOffers } from "../Common/TransferTablePossibleOffers";
import { AwpAndStrengthColumns } from "../Common/AwpAndStrengthColumns";
import { XPathHtmlTableCell2 } from "../Common/Toolkit/XPathHtmlTableCell";
import { XPathSingleResult2, XPathSingleResult3 } from "../Common/Toolkit/XPathSingleResult";
import { XPathAllResults2, XPathAllResults3 } from "../Common/Toolkit/XPathAllResults";
import { XPathInformation, XPathString } from "../Common/Toolkit/XPathString";
import { TransferTablePossibleOffersUiUrl } from "../Common/Urls/TransferTablePossibleOffersUiUrl";
import { TransferMarketSearchResultTableUi } from "./TransferMarketSearchResultTableUi";
import { ITransferMarketSearchResultTable, TransferMarketSearchResultTable } from "../Common/TransferMarketSearchResultTable";
import { TransferMarketProfessionalsUiUrl } from "../Common/Urls/TransferMarketProfessionalsUiUrl";
import { TransferMarketAmateurWebPageUrl } from "../Common/Urls/TransferMarketAmateurWebPageUrl";
import { ExperienceAndTrainingColumn } from "../Common/ExperienceAndTrainingColumn";
import { IUrl, Url } from "../Common/Toolkit/Url";
import { TransferMarketAmateurTable, ITransferMarketAmateurTable } from "../Common/TransferMarketAmateurTable";
import { TrainingColumn } from "../Common/TrainingColumn";
import { Mutex } from "../Common/Toolkit/Mutex";
import { IRegisteredLoggingModules, RegisteredLoggingModules } from "../Common/Logger/RegisteredLoggingModules";
import { SettingNameLoggingModules } from "../Common/Settings/SettingNameLoggingModules";
import { ISettingName } from "../Common/Toolkit/SettingName";
import { SettingNameTransferTablePossibleOffers } from "../Common/Settings/SettingNameTransferTablePossibleOffers";
import { SettingNameTransferMarketProfessionalsSearchResultTable } from "../Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable";
import { SettingNameTransferMarketAmateurTable } from "../Common/Settings/SettingNameTransferMarketAmateurTable";
import { StorageLocal } from "../Common/Toolkit/StorageLocal";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";
import { SettingNameApplicationLogLevel } from "../Common/Settings/SettingNameApplicationLogLevel";
import { IEasyLogger, EasyLogger } from "../Common/Logger/EasyLogger";
import { ExtendWebPage, IExtendWebPage } from "../Common/Toolkit/ExtendWebPage";
import { IWebElementToExtend } from "../Common/Toolkit/WebElementToExtend";
import { IWebPageToExtend } from "../Common/Toolkit/WebPageToExtend";
import { ISetting } from "../Common/Toolkit/Setting";
import { AwpColumn } from "../Common/AwpColumn";
import { IExistingColumn } from "../Common/Toolkit/ExisitingColumn";
import { IDom, Dom } from "../Common/Toolkit/Dom";
import { ExtendWebPages, IExtendWebPages } from "../Common/Toolkit/ExtendWebPages";
import { TeamTableUiUrl } from "../Common/Urls/TeamTableUiUrl";
import { StadiumWebPageUrl } from "../Common/Urls/StadiumWebPageUrl";
import { ITransferMarketAmateurPlayerTableExtensionSetting, TransferMarketAmateurPlayerTableExtensionSetting } from "../Common/Settings/TransferMarketAmateurPlayerTableExtensionSetting";
import { TransferMarketAmateurWebPage } from "../Common/TransferMarketAmateurWebPage";
import { TransferMarketAmateurPlayerTable } from "../Common/TransferMarketAmateurPlayerTable";

export class SettingNameTeamTable implements ISettingName {
  private settingName: String = "foxfm2.teamui.setting";
  constructor() { }
  public name(): String {
    return this.settingName;
  }
}

class foxfmApp {
  private logger: ILogger;
  private loggingModule: IRegisteredLoggingModule;
  private extendWebPages: IExtendWebPages;

  constructor(logger: ILogger, extendTransferMarketAmateurTable: IExtendWebPages) {
    this.logger = logger;
    this.loggingModule = new RegisteredLoggingModule("foxfmApp", new LogLevelError());
    this.extendWebPages = extendTransferMarketAmateurTable;
  }

  public main(): void {
    var doc = window.document;
    var location = doc.location.href;
    this.info(`S t a r t e d on ${location}`);
    this.extendWebPages.extend();
  }

  private info(msg: string): void {
    this.logger.info(this.loggingModule.name().toString(), msg);
  }
  private error(msg: string): void {
    this.logger.error(this.loggingModule.name().toString(), msg);
  }
  private debug(msg: string): void {
    this.logger.debug(this.loggingModule.name().toString(), msg);
  }
}

/*
new TransferMarketAmateurWebPage(
  new EasyLogger(),
  new Dom(doc),
  new TransferMarketAmateurWebPageUrl(),
  new TransferMarketAmateurTable(
    new StrengthLevelsSetting(),
    new StorageLocal<ITransferMarketAmateurTableSettings>(
      new SettingNameTransferMarketAmateurTable(),
      new TransferMarketAmateurTableSettings(
        new AwpColumnToAdd(
          true,
          new TrainingColumnByXpath(
            new XPathHtmlTableCell2(
              new XPathSingleResult3<HTMLTableCellElement>(
                new XPathAllResults3(
                  new TransferMarketAmateurUiUrl(),
                  new XPathString(
                    '//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[7]'
                  )
                )
              )
            )
          ),
          new ExperienceColumnByXpath(
            new XPathHtmlTableCell2(
              new XPathSingleResult3<HTMLTableCellElement>(
                new XPathAllResults3(
                  new TransferMarketAmateurUiUrl(),
                  new XPathString(
                    '//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[7]'
                  )
                )
              )
            )
          )
        )
      )
    )
  )
),
*/
/*
new TransferMarketAmateurWebPageUrl(),
*/


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
  logger,
  new ExtendWebPages(
    new Array<IExtendWebPage>(
      // Extend transfer market - search result table
      new ExtendWebPage(
        new Url(currentUrl),
        new TransferMarketSearchResultTableUi(
          new Dom(doc),
          new TransferMarketProfessionalsUiUrl(),
          new StrengthLevelsSetting(),
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
          new StrengthLevelsSetting(),
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
        new TeamUi(
          new Dom(doc),
          new TeamTableUiUrl(),
          new StrengthLevelsSetting(),
          new TeamTableSetting(),
          new EasyLogger(
            logger,
            new RegisteredLoggingModule(
              "TeamUi",
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
      // Extend amateur transfer market
      new ExtendWebPage(
        new Url(currentUrl),
        new TransferMarketAmateurWebPage(
          new Dom(doc),
          new TransferMarketAmateurWebPageUrl(),
          new TransferMarketAmateurPlayerTable(
            new Dom(doc),
            new StrengthLevelsSetting(),
            new StorageLocal<ITransferMarketAmateurPlayerTableExtensionSetting>(
              new SettingNameTransferMarketAmateurTable(),
              new TransferMarketAmateurPlayerTableExtensionSetting(
                true,
                new TrainingColumn(
                  new XPathHtmlTableCell2(
                    new XPathSingleResult3<HTMLTableCellElement>(
                      new XPathAllResults3(
                        new TransferMarketAmateurWebPageUrl(),
                        new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[7]'))))))),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "TransferMarketAmateurPlayerTable",
                new LogLevelError())
            )
          )
        ),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "ExtendWebPage",
            new LogLevelError())
        )
      ),
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


/*** BEGING experimental ***

export class CurrentUrl implements IUrl {
  private urlField: String;

  constructor(url: String) {
    this.urlField = url;
  }
  public url(): String {
    return this.urlField;
  }
  public fromJson(jsonString: String): IUrl {
    return new CurrentUrl(jsonString["urlField"]);
  }

}

export interface IWebPage {
}
export interface IColumnToAdd {

}
export class AwpColumnToAdd implements IColumnToAdd {

  constructor(trainingColumng: IColumn, experienceColumn: IColumn) {

  }
}
export interface IColumnToExtend {

}

// Transfer market amateur - player table 
new ExtendWebPage(
  new EasyLogger(
    logger,
    new RegisteredLoggingModule(
      "ExtendWebPage",
      new LogLevelError())),
  new CurrentUrl(
    new String(document.location.href)),
  new TransferMarketAmateurWebPage(
    new Dom(),
    new TransferMarketAmateurWebPageUrl(),
    new TransferMarketAmateurPlayerTable(
      new StrengthLevelsSetting(),
      new StorageLocal<ITransferMarketAmateurExtendPlayerTableSetting>(
        new SettingNameTransferMarketAmateurTable(),
        new TransferMarketAmateurExtendPlayerTableSetting(
          new TrainingColumnByXpath(),
          new ExperienceColumnByXpath(),
          new StrengthColumnByXpath(),
          new AddAwpColumn(true),
          new ExtendStrengthColumn(true)
        ),
        new StrengthColumnToExtend(
        )
      )
    )
  ),
  new EasyLogger()
)

// Transfer market professionals - table watch list
new TransferMarketProfessionalsExtendWatchTableSetting(
  new AwpColumnToAdd(
    new AwpColumn(
      new TrainingColumnByXpath(),
      new ExperienceColumnByXpath()
    ),
    new AddAwpColumn(true)
  ),
  new StrengthColumnToExtend(
    new StrengthColumnByXpath(),
    new AwpColumn(
      new TrainingColumnByXpath(),
      new ExperienceColumnByXpath()
    ),
    new ExtendStrengthColumn(true)
  )

)

// Transfer market professionals - table search results
new TransferMarketProfessionalsExtendSearchResultTableSetting(
  new AwpColumnToAdd(
    new AwpColumn(
      new ExperienceAndTrainingColumnByXpath()
    ),
    new AddAwpColumn(true)
  ),
  new StrengthColumnToExtend(
    new StrengthColumnByXpath(),
    new AwpColumn(
      new TrainingColumnByXpath(),
      new ExperienceColumnByXpath()
    ),
    new ExtendStrengthColumn(true)
  )
)

// Team - players table
new TeamExtendPlayerTableSetting(
  new AwpColumnToExtend(
    new AwpColumnByXpath(),
    new AwpColumn(
      new TrainingColumnByXpath(),
      new ExperienceColumnByXpath()
    ),
    new ExtendAwpColumn(true)
  )
)

// Transfer market - possible offers
new TransferMarketExtendOfferTableSetting(
  new AwpColumnToExtend(
    new AwpColumnByXpath(),
    new StrengthColumnByXpath(),
    new ExtendAwpColumn(true)
  )
)

*** END experimental */
