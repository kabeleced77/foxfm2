import { LoggerInterface } from "../Common/Logger/LoggerInterface"
import { Logger } from "../Common/Logger/Logger"
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { StadiumManagerUi } from "./StadiumManagerUi"
import { TeamUi } from "./TeamUi"
import { StrengthLevelsSetting } from "../Common/StrengthLevelsSetting"
import { TeamTableSetting } from "../Common/TeamTableSetting"
import { TransferTableUi } from "./TransferTableUi"
import { TransferTablePossibleOffers, ITransferTablePossibleOffers } from "../Common/TransferTablePossibleOffers";
import { SettingInStorage } from "../Common/SettingInStorage";
import { AwpAndStrengthColumns } from "../Common/AwpAndStrengthColumns";
import { XPathHtmlTableCell2 } from "../Common/Toolkit/XPathHtmlTableCell";
import { XPathSingleResult2 } from "../Common/Toolkit/XPathSingleResult";
import { XPathAllResults2 } from "../Common/Toolkit/XPathAllResults";
import { XPathInformation } from "../Common/Toolkit/XPathString";
import { Url } from "../Common/Toolkit/Url";


class foxfmApp {
  private logger: LoggerInterface;
  private loggingModule: IRegisteredLoggingModule;
  private stadiumManagerUi: StadiumManagerUi;
  private teamUi: TeamUi;
  private transferTableUi: TransferTableUi;

  constructor(logger: LoggerInterface) {
    this.logger = logger;
    this.loggingModule = new RegisteredLoggingModule("foxfmApp", new LogLevelError());
  }

  public main(): void {
    var doc = window.document;
    var location = doc.location.href;
    this.info(`S t a r t e d on ${location}`);
    try {
      this.logger.registerModuleForLogging(this.loggingModule)
        .then(() => {
          this.stadiumManagerUi = new StadiumManagerUi(this.logger);
          this.teamUi = new TeamUi(this.logger, new StrengthLevelsSetting(), new TeamTableSetting());
          this.transferTableUi = new TransferTableUi(
            this.logger,
            new StrengthLevelsSetting(),
            new SettingInStorage<ITransferTablePossibleOffers>(
              "foxfm2.setting.transfer.possibleOffers",
              new TransferTablePossibleOffers(
                new AwpAndStrengthColumns(
                  new XPathHtmlTableCell2(
                    new XPathSingleResult2<HTMLTableCellElement>(
                      new XPathAllResults2(
                        new XPathInformation(
                          new Url(doc.location.href),
                          '//*[@id="punkte"]')))),
                  new XPathHtmlTableCell2(
                    new XPathSingleResult2<HTMLTableCellElement>(
                      new XPathAllResults2(
                        new XPathInformation(
                          new Url(doc.location.href),
                          '//*[@id="staerke"]')))),
                  true
                )
              )
            ));
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

var logger = new Logger();
var app = new foxfmApp(logger);
app.main();
