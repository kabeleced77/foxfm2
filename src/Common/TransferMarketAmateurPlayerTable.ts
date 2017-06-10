import { IWebElementToExtend } from "./Toolkit/WebElementToExtend";
import { IStrengthLevelsSetting } from "./Settings/StrengthLevelsSetting";
import { ISetting } from "./Toolkit/Setting";
import { ITransferMarketAmateurPlayerTableExtensionSetting } from "./Settings/TransferMarketAmateurPlayerTableExtensionSetting";
import { IEasyLogger } from "./Logger/EasyLogger";
import { IHtmlTable } from "./Toolkit/HtmlTable";
import { IAwpPoints } from "./Toolkit/AwpPoints";
import { IHtmlTableColumn } from "./Toolkit/HtmlTableColumn";

export class TransferMarketAmateurPlayerTable implements IWebElementToExtend {
  private table: IHtmlTable;
  private awpColumn: IHtmlTableColumn;
  private awpPoints: IAwpPoints;
  private strengthLevels: IStrengthLevelsSetting;
  private amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>;
  private log: IEasyLogger;

  constructor(
    table: IHtmlTable,
    awpColumn: IHtmlTableColumn,
    strengthLevels: IStrengthLevelsSetting,
    amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>,
    log: IEasyLogger
  ) {
    this.table = table;
    this.awpColumn = awpColumn;
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
          this.awpColumn.add(this.table);
          this.strengthLevels
            .strengthLevels()
            .then(strengthLevels => {
            })
            .catch(e => { throw new Error(`"Error while extending amateur market player table: ${e}."`); });
        }
      })
      .catch(e => { throw new Error(`"Error reading settings to extend amateur market player table: ${e}."`); });
  }
}
