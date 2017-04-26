import { LoggerInterface } from "../Common/Logger/LoggerInterface"
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { IStrengthLevelsSetting } from "../Common/StrengthLevelsSetting"
import { ISetting } from "../Common/Setting";
import { ITransferTablePossibleOffers } from "../Common/TransferTablePossibleOffers";
import { ITransferMarketSearchResultTable } from "../Common/TransferMarketSearchResultTable";

export interface ITransferMarketSearchResultTableUi {
  addAdditionalInformation(doc: Document);
}

export class TransferMarketSearchResultTableUi {
  private log: LoggerInterface;
  private loggingModule: IRegisteredLoggingModule;
  private strengthLevelsSetting: IStrengthLevelsSetting;
  private settings: ISetting<ITransferMarketSearchResultTable>;

  constructor(
    logger: LoggerInterface,
    strengthLevelsSetting: IStrengthLevelsSetting,
    transferMarketSearchResultTableSetting: ISetting<ITransferMarketSearchResultTable>
  ) {
    this.log = logger;
    this.loggingModule = new RegisteredLoggingModule("TransferMarketSearchResultTableUi", new LogLevelError());
    this.log.registerModuleForLogging(this.loggingModule);
    this.strengthLevelsSetting = strengthLevelsSetting;
    this.settings = transferMarketSearchResultTableSetting;
  }
  public addAdditionalInformation(doc: Document) {
    this.settings.value()
      .then(setting => {
        var targetUrl = setting.transferMarketProfessionalsUrl().url().toString();
        var executeOnThisPage = doc.location.href.match(targetUrl) !== null;
        this.info(`called from: ${doc.location.href} compared to ${targetUrl}: ${executeOnThisPage}`);
        if (
          executeOnThisPage
          && setting.experienceAndTrainingColumn().additionalInformationActivated()
        ) {
          this.strengthLevelsSetting
            .strengthLevels()
            .then(strengthLevels => {
              setting.experienceAndTrainingColumn().addAdditionalInformation(doc, strengthLevels);
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
