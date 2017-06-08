import { IWebElementToExtend } from "./Toolkit/WebElementToExtend";
import { IStrengthLevelsSetting } from "./Settings/StrengthLevelsSetting";
import { ISetting } from "./Toolkit/Setting";
import { ITransferMarketAmateurPlayerTableExtensionSetting } from "./Settings/TransferMarketAmateurPlayerTableExtensionSetting";
import { IEasyLogger } from "./Logger/EasyLogger";
import { IHtmlTable } from "./Toolkit/HtmlTable";
import { IAwpPoints } from "./Toolkit/AwpPoints";

export class TransferMarketAmateurPlayerTable implements IWebElementToExtend {
  private table: IHtmlTable;
  private awpPoints: IAwpPoints;
  private strengthLevels: IStrengthLevelsSetting;
  private amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>;
  private log: IEasyLogger;

  constructor(
    table: IHtmlTable,
    awpPoints: IAwpPoints,
    strengthLevels: IStrengthLevelsSetting,
    amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>,
    log: IEasyLogger
  ) {
    this.table = table;
    this.awpPoints = awpPoints;
    this.strengthLevels = strengthLevels;
    this.amateurPlayerTableSettings = amateurPlayerTableSettings;
    this.log = log;
  }

  public extend(): void {
    this.log.info("start extension");
    this.amateurPlayerTableSettings
      .value()
      .then(setting => {
        if (setting.addAwpColumn()) {
          this.strengthLevels
            .strengthLevels()
            .then(strengthLevels => {
              this.awpPoints.points().forEach(awp => this.log.debug(`AWP: ${awp.awpPoints()}`));
            })
            .catch(e => { throw new Error(`"Error while extending amateur market player table: ${e}."`); });
        }
      })
      .catch(e => { throw new Error(`"Error reading settings to extend amateur market player table: ${e}."`); });
  }
}
