import { IWebElementToExtend } from "./Toolkit/WebElementToExtend";
import { IStrengthLevelsSetting } from "./Settings/StrengthLevelsSetting";
import { ISetting } from "./Toolkit/Setting";
import { ITransferMarketAmateurPlayerTableExtensionSetting } from "./Settings/TransferMarketAmateurPlayerTableExtensionSetting";
import { IEasyLogger } from "./Logger/EasyLogger";
import { IHtmlTable } from "./Toolkit/HtmlTable";
import { IHtmlTableColumn } from "./Toolkit/HtmlTableColumn";
import { IHtmlTableColumnAsync } from "./Toolkit/HtmlTableColumnAsync";

export class TransferMarketAmateurPlayerTable implements IWebElementToExtend {
  private table: IHtmlTable;
  private awpColumn: IHtmlTableColumn;
  private awpDiffColumn: IHtmlTableColumnAsync;
  private strengthLevels: IStrengthLevelsSetting;
  private amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>;
  private log: IEasyLogger;

  constructor(
    table: IHtmlTable,
    awpColumn: IHtmlTableColumn,
    awpDiffColumn: IHtmlTableColumnAsync,
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
          this.table.addColumnAsync(this.awpDiffColumn);
          this.table.addColumn(this.awpColumn);
        }
      })
      .catch(e => { throw new Error(`"Error while extending amateur market player table: ${e}."`); });
  }
}
