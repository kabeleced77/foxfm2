import { Logger, ILogger } from "../Common/Logger/Logger"
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { LogLevelError, ILogLevel } from '../Common/Logger/LogLevel';
import { StadiumManagerUi } from "./StadiumManagerUi"
import { TeamUi } from "./TeamUi"
import { StrengthLevelsSetting } from "../Common/StrengthLevelsSetting"
import { TeamTableSetting } from "../Common/TeamTableSetting"
import { TransferTableUi } from "./TransferTableUi"
import { TransferTablePossibleOffers, ITransferTablePossibleOffers } from "../Common/TransferTablePossibleOffers";
import { SettingInStorage } from "../Common/Settings/SettingInStorage";
import { AwpAndStrengthColumns } from "../Common/AwpAndStrengthColumns";
import { XPathHtmlTableCell2 } from "../Common/Toolkit/XPathHtmlTableCell";
import { XPathSingleResult2, XPathSingleResult3 } from "../Common/Toolkit/XPathSingleResult";
import { XPathAllResults2, XPathAllResults3 } from "../Common/Toolkit/XPathAllResults";
import { XPathInformation, XPathString } from "../Common/Toolkit/XPathString";
import { TransferTablePossibleOffersUiUrl } from "../Common/TransferTablePossibleOffersUiUrl";
import { ITransferMarketSearchResultTableUi, TransferMarketSearchResultTableUi } from "./TransferMarketSearchResultTableUi";
import { ITransferMarketSearchResultTable, TransferMarketSearchResultTable } from "../Common/TransferMarketSearchResultTable";
import { TransferMarketProfessionalsUiUrl } from "../Common/TransferMarketProfessionalsUiUrl";
import { TransferMarketAmateurUiUrl } from "../Common/TransferMarketAmateurUiUrl";
import { ExperienceAndTrainingColumn } from "../Common/ExperienceAndTrainingColumn";
import { IUrl, Url } from "../Common/Toolkit/Url";
import { TransferMarketAmateurTable, ITransferMarketAmateurTable } from "../Common/TransferMarketAmateurTable";
import { TransferMarketAmateurTableUi } from "./TransferMarketAmateurTableUi";
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

  private extendTransferMarketAmateurTable: IExtendTargetWebPage;

  constructor(logger: ILogger, extendTransferMarketAmateurTable: IExtendTargetWebPage) {
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
            new SettingInStorage<ITransferTablePossibleOffers>(
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

export interface IEasyLogging {
  info(msg: String): void;
  warn(msg: String): void;
  debug(msg: String): void;
  error(msg: String): void;
}

class EasyLogging implements IEasyLogging {
  private log: ILogger;
  private loggingModule: IRegisteredLoggingModule;

  constructor(logger: ILogger, loggingModule: IRegisteredLoggingModule) {
    this.log = logger;
    this.loggingModule = loggingModule;
    this.log.registerModuleForLogging(loggingModule);
  }

  info(msg: String): void {
    this.log.info(this.loggingModule.name().toString(), msg.toString());
  }
  warn(msg: String): void {
    this.log.warn(this.loggingModule.name().toString(), msg.toString());
  }
  debug(msg: String): void {
    this.log.debug(this.loggingModule.name().toString(), msg.toString());
  }
  error(msg: String): void {
    this.log.error(this.loggingModule.name().toString(), msg.toString());
  }
}

export interface IExtendTargetWebPage {
  extend(): void;
}

export class ExtendTargetWebPage implements IExtendTargetWebPage {
  private log: IEasyLogging;
  private currentUrl: IUrl;
  private targetUrl: IUrl;
  private page: IWebElementToExtend;

  constructor(
    logger: IEasyLogging,
    currentUrl: IUrl,
    targetUrl: IUrl,
    page: IWebElementToExtend
  ) {
    this.log = logger;
    this.currentUrl = currentUrl;
    this.targetUrl = targetUrl;
    this.page = page;
  }

  public extend(): void {
    var currentUrl = this.currentUrl.url().toString();
    var targetUrl = this.targetUrl.url().toString();
    var extendPage = currentUrl.match(targetUrl) !== null;
    this.log.info(`called from: ${currentUrl} compared to ${targetUrl}: ${extendPage}`);
    if (extendPage) this.page.extend(this.log);
  }
}

export interface IWebElementToExtend {
  extend(logger: IEasyLogging): void;
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
    new SettingNameLoggingModules(),
    new RegisteredLoggingModules(
      new Array<IRegisteredLoggingModule>())));

var app = new foxfmApp(
  logger,
  // Extend amateur transfer market
  new ExtendTargetWebPage(
    new EasyLogging(
      logger,
      new RegisteredLoggingModule(
        "ExtendWebPage",
        new LogLevelError())),
    new Url(currentUrl),
    new TransferMarketAmateurUiUrl(),
    new TransferMarketAmateurTableUi(
      new EasyLogging(
        logger,
        new RegisteredLoggingModule(
          "TransferMarketAmateurTableUi",
          new LogLevelError())),
      doc,
      new StrengthLevelsSetting(),
      new SettingInStorage<ITransferMarketAmateurTable>(
        new SettingNameTransferMarketAmateurTable(),
        new TransferMarketAmateurTable(
          true,
          new TrainingColumn(
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
);
app.main();
