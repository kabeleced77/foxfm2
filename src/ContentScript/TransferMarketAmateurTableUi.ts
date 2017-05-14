import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { IStrengthLevelsSetting } from "../Common/StrengthLevelsSetting"
import { ISetting } from "../Common/Settings/Setting";
import { ITransferTablePossibleOffers } from "../Common/TransferTablePossibleOffers";
import { TransferMarketAmateurTable, ITransferMarketAmateurTable } from "../Common/TransferMarketAmateurTable";
import { IWebElementToExtend, IEasyLogging } from "./foxfmApp";

export class TransferMarketAmateurTableUi implements IWebElementToExtend {
  private log: IEasyLogging;
  private loggingModule: IRegisteredLoggingModule;
  private doc: Document;
  private strengthLevelsSetting: IStrengthLevelsSetting;
  private settings: ISetting<ITransferMarketAmateurTable>;

  constructor(
    logger: IEasyLogging,
    doc: Document,
    strengthLevelsSetting: IStrengthLevelsSetting,
    transferMarketAmateurTableSetting: ISetting<ITransferMarketAmateurTable>
  ) {
    /*
    this.loggingModule = new RegisteredLoggingModule("TransferMarketAmateurUi", new LogLevelError());
    this.log.registerModuleForLogging(this.loggingModule);
    */
    this.log = logger;
    this.doc = doc;
    this.strengthLevelsSetting = strengthLevelsSetting;
    this.settings = transferMarketAmateurTableSetting;
  }
  public extend(log: IEasyLogging) {
    this.settings
      .value()
      .then(setting => {
        if (setting.addAwpColumnActivated()) {
          this.strengthLevelsSetting
            .strengthLevels()
            .then(strengthLevels => {
              var idx = setting.trainingColumn().index(this.doc);
              this.log.debug(idx.toString());
            })
        }
      });
  }
}
