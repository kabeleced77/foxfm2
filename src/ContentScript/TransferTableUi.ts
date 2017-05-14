import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { IStrengthLevelsSetting } from "../Common/StrengthLevelsSetting"
import { ISetting } from "../Common/Settings/Setting";
import { ITransferTablePossibleOffers } from "../Common/TransferTablePossibleOffers";
import { ILogger } from "../Common/Logger/Logger";

export class TransferTableUi {
  private log: ILogger;
  private loggingModule: IRegisteredLoggingModule;
  private strengthLevelsSetting: IStrengthLevelsSetting;
  private transferTablePossibleOffers2: ISetting<ITransferTablePossibleOffers>;

  constructor(
    logger: ILogger,
    strengthLevelsSetting: IStrengthLevelsSetting,
    transferTablePossibleOffersSetting2: ISetting<ITransferTablePossibleOffers>
  ) {
    this.log = logger;
    this.loggingModule = new RegisteredLoggingModule("TransferTableUi", new LogLevelError());
    this.log.registerModuleForLogging(this.loggingModule);
    this.strengthLevelsSetting = strengthLevelsSetting;
    this.transferTablePossibleOffers2 = transferTablePossibleOffersSetting2;
  }
  public addAdditionalInformation(doc: Document) {
    this.transferTablePossibleOffers2.value()
      .then(setting => {
        var executeOnThisPage = doc.location.href.match("transfer/angebote.php") !== null;
        this.info("called from: " + doc.location.href + ": " + executeOnThisPage);
        if (
          executeOnThisPage
          && setting.awpAndStrengthColumn().additionalInformationActivated()
        ) {
          this.strengthLevelsSetting
            .strengthLevels()
            .then(strengthLevels => {
              setting.awpAndStrengthColumn().addAdditionalInformation(doc, strengthLevels);
            })
        }
      });
  }

  private info(msg: string): void {
    this.log.info(this.loggingModule.name(), msg);
  }

  private warn(msg: string): void {
    this.log.warn(this.loggingModule.name(), msg);
  }

  private error(msg: string): void {
    this.log.error(this.loggingModule.name(), msg);
  }

  private debug(msg: string): void {
    this.log.debug(this.loggingModule.name(), msg);
  }
}
