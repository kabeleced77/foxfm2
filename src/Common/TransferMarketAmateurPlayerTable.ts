import { IWebElementToExtend } from "./Toolkit/WebElementToExtend";
import { IDom } from "./Toolkit/Dom";
import { IStrengthLevelsSetting } from "./Settings/StrengthLevelsSetting";
import { ISetting } from "./Toolkit/Setting";
import { ITransferMarketAmateurPlayerTableExtensionSetting } from "./Settings/TransferMarketAmateurPlayerTableExtensionSetting";
import { IEasyLogger } from "./Logger/EasyLogger";

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
