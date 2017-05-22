import { Logger, ILogger } from "../Common/Logger/Logger"
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { LogLevelError, ILogLevel } from '../Common/Logger/LogLevel';
import { StadiumManagerUi } from "./StadiumManagerUi"
import { TeamUi } from "./TeamUi"
import { StrengthLevelsSetting, IStrengthLevelsSetting } from "../Common/StrengthLevelsSetting"
import { TeamTableSetting } from "../Common/TeamTableSetting"
import { TransferTableUi } from "./TransferTableUi"
import { TransferTablePossibleOffers, ITransferTablePossibleOffers } from "../Common/TransferTablePossibleOffers";
import { AwpAndStrengthColumns } from "../Common/AwpAndStrengthColumns";
import { XPathHtmlTableCell2 } from "../Common/Toolkit/XPathHtmlTableCell";
import { XPathSingleResult2, XPathSingleResult3 } from "../Common/Toolkit/XPathSingleResult";
import { XPathAllResults2, XPathAllResults3 } from "../Common/Toolkit/XPathAllResults";
import { XPathInformation, XPathString } from "../Common/Toolkit/XPathString";
import { TransferTablePossibleOffersUiUrl } from "../Common/TransferTablePossibleOffersUiUrl";
import { ITransferMarketSearchResultTableUi, TransferMarketSearchResultTableUi } from "./TransferMarketSearchResultTableUi";
import { ITransferMarketSearchResultTable, TransferMarketSearchResultTable } from "../Common/TransferMarketSearchResultTable";
import { TransferMarketProfessionalsUiUrl } from "../Common/TransferMarketProfessionalsUiUrl";
import { TransferMarketAmateurWebPageUrl } from "../Common/TransferMarketAmateurWebPageUrl";
import { ExperienceAndTrainingColumn } from "../Common/ExperienceAndTrainingColumn";
import { IUrl, Url } from "../Common/Toolkit/Url";
import { TransferMarketAmateurTable, ITransferMarketAmateurTable } from "../Common/TransferMarketAmateurTable";
import { TrainingColumn } from "../Common/TrainingColumn";
import { Mutex } from "../Common/Toolkit/Mutex";
import { IRegisteredLoggingModules, RegisteredLoggingModules } from "../Common/Logger/RegisteredLoggingModules";
import { SettingNameLoggingModules } from "../Common/Settings/SettingNameLoggingModules";
import { ISettingName } from "../Common/Settings/SettingName";
import { SettingNameTransferTablePossibleOffers } from "../Common/Settings/SettingNameTransferTablePossibleOffers";
import { SettingNameTransferMarketProfessionalsSearchResultTable } from "../Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable";
import { SettingNameTransferMarketAmateurTable } from "../Common/Settings/SettingNameTransferMarketAmateurTable";
import { StorageLocal } from "../Common/Storage";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";
import { SettingNameApplicationLogLevel } from "../Common/Settings/SettingNameApplicationLogLevel";
import { IEasyLogger, EasyLogger } from "../Common/Logger/EasyLogger";
import { ExtendWebPage, IExtendWebPage } from "../Common/Toolkit/ExtendTargetPage";
import { IWebElementToExtend } from "../Common/Toolkit/WebElementToExtend";
import { IWebPageToExtend } from "../Common/Toolkit/WebPageToExtend";
import { ISetting } from "../Common/Settings/Setting";
import { AwpColumn } from "../Common/AwpColumn";
import { IExistingColumn } from "../Common/Toolkit/ExisitingColumn";
import { IDom, Dom } from "../Common/Toolkit/Dom";

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
  private stadiumManagerUi: StadiumManagerUi;
  private teamUi: TeamUi;
  private transferTableUi: TransferTableUi;
  private transferMarketSearchResultTableUi: ITransferMarketSearchResultTableUi;

  private extendTransferMarketAmateurTable: IExtendWebPage;

  constructor(logger: ILogger, extendTransferMarketAmateurTable: IExtendWebPage) {
    this.logger = logger;
    this.loggingModule = new RegisteredLoggingModule("foxfmApp", new LogLevelError());

    this.extendTransferMarketAmateurTable = extendTransferMarketAmateurTable;
  }

  public main(): void {
    this.extendTransferMarketAmateurTable.extend();


    var doc = window.document;
    var location = doc.location.href;
    this.info(`S t a r t e d on ${location}`);
    try {
      this.logger.registerModuleForLogging(this.loggingModule)
        .then(() => {
          this.teamUi = new TeamUi(
            this.logger,
            new StrengthLevelsSetting(),
            new TeamTableSetting()
          );
          this.stadiumManagerUi = new StadiumManagerUi(
            this.logger);
          this.transferTableUi = new TransferTableUi(
            this.logger,
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
            )
          );
          this.transferMarketSearchResultTableUi = new TransferMarketSearchResultTableUi(
            this.logger,
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
            )
          );
          this.run(doc);
        })
        .catch(reason => this.error(reason));
    } catch (error) {
      this.error(error);
    }
  }

  private run(doc: Document): void {
    this.stadiumManagerUi.addPricingControlElements();
    this.teamUi.addAdditionalInformation(doc);
    this.transferTableUi.addAdditionalInformation(doc);
    this.transferMarketSearchResultTableUi.addAdditionalInformation(doc);
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

/*** BEGIN needs to be exported into separate files */

export class TransferMarketAmateurWebPage implements IWebPageToExtend {
  private domField: IDom;
  private urlField: IUrl;
  private playerTableField: IWebElementToExtend;

  constructor(
    dom: IDom,
    url: IUrl,
    playerTable: IWebElementToExtend
  ) {
    this.domField = dom;
    this.urlField = url;
    this.playerTableField = playerTable;
  }

  public pageUrl(): IUrl {
    return this.urlField;
  }
  public extend(logger: IEasyLogger): void {
    this.playerTableField.extend();
  }
}

export class TransferMarketAmateurPlayerTable implements IWebElementToExtend {
  private domField: IDom;
  private strengthLevels: IStrengthLevelsSetting;
  private amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>;
  private log: IEasyLogger;

  constructor(
    dom: IDom,
    strengthLevels: IStrengthLevelsSetting,
    amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>,
    log: IEasyLogger
  ) {
    this.domField = dom;
    this.strengthLevels = strengthLevels;
    this.amateurPlayerTableSettings = amateurPlayerTableSettings;
    this.log = log;
  }

  public extend(): void {
    this.log.info("start extension");
    this.amateurPlayerTableSettings
      .value()
      .then(setting => {
        if (setting.addAwpColumnActivated()) {
          this.strengthLevels
            .strengthLevels()
            .then(strengthLevels => {
              var idx = setting.trainingColumn().index(this.domField.dom());
              this.log.debug(idx.toString());
            })
        }
      });
  }
}

export interface ITransferMarketAmateurPlayerTableExtensionSetting {
  addAwpColumnActivated(): Boolean;
  trainingColumn(): IExistingColumn;
  fromJson(jsonString: String): ITransferMarketAmateurPlayerTableExtensionSetting;
}
export class TransferMarketAmateurPlayerTableExtensionSetting implements ITransferMarketAmateurPlayerTableExtensionSetting {
  /*
  private awpColumnToAdd: IColumnToAdd;
  private strengthColumnToExtend: IColumnToExtend;

  constructor(awpColumnToAdd: IColumnToAdd, strengthColumnToExtend: IColumnToExtend) {
    this.awpColumnToAdd = awpColumnToAdd;
    this.strengthColumnToExtend = strengthColumnToExtend;
  }
  */
  private addAwpColumnField: Boolean;
  private experienceColumnField: IExistingColumn;
  private trainingColumnField: IExistingColumn;

  constructor(
    addAwpColumn: Boolean,
    //    experienceColumn: IExperienceAndTrainingColumn,
    trainingColumn: IExistingColumn
  ) {
    this.addAwpColumnField = addAwpColumn;
    //    this.experienceColumnField = experienceColumn;
    this.trainingColumnField = trainingColumn;
  }

  public addAwpColumnActivated(): Boolean {
    return this.addAwpColumnField;
  }
  public trainingColumn(): IExistingColumn {
    return this.trainingColumnField;
  }
  /*
  public transferMarketProfessionalsUrl(): IUrl {
    return this.transferMarketProfessionalsUrlField;
  }
  public experienceAndTrainingColumn(): IExperienceAndTrainingColumn {
    return this.experienceAndTrainingColumnField;
  }
  */

  public fromJson(jsonString: String): TransferMarketAmateurPlayerTableExtensionSetting {
    return new TransferMarketAmateurPlayerTableExtensionSetting(
      jsonString["addAwpColumnField"],
      this.trainingColumnField.fromJson(jsonString["trainingColumnField"])
    );

  }
}

/***  END needs to be exported into separate files */

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
    new SettingNameLoggingModules(),
    new RegisteredLoggingModules(
      new Array<IRegisteredLoggingModule>())));

var app = new foxfmApp(
  logger,
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
                    new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[7]')))))
          )
        ),
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
