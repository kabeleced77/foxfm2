import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { IStrengthLevelsSetting } from "../Common/StrengthLevelsSetting"
import { ISetting } from "../Common/Settings/Setting";
import { ITransferTablePossibleOffers } from "../Common/TransferTablePossibleOffers";
import { TransferMarketAmateurTable, ITransferMarketAmateurTable } from "../Common/TransferMarketAmateurTable";
import { IEasyLogger } from "../Common/Logger/EasyLogger";
import { IWebElementToExtend } from "../Common/Toolkit/WebElementToExtend";

export class TransferMarketAmateurTableUi implements IWebElementToExtend {
  private log: IEasyLogger;
  private loggingModule: IRegisteredLoggingModule;
  private doc: Document;
  private strengthLevelsSetting: IStrengthLevelsSetting;
  private settings: ISetting<ITransferMarketAmateurTable>;

  constructor(
    logger: IEasyLogger,
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
  public extend() {
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
