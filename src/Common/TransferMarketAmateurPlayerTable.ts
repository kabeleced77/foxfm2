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
  private awpDiffColumn: IHtmlTableColumn;
  private strengthLevels: IStrengthLevelsSetting;
  private amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>;
  private log: IEasyLogger;

  constructor(
    table: IHtmlTable,
    awpColumn: IHtmlTableColumn,
    awpDiffColumn: IHtmlTableColumn,
    amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>,
    log: IEasyLogger
  ) {
    this.table = table;
    this.awpColumn = awpColumn;
    this.awpDiffColumn = awpDiffColumn;
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
          this.awpDiffColumn.add(this.table);
        }
      })
      .catch(e => { throw new Error(`"Error while extending amateur market player table: ${e}."`); });
  }
}
