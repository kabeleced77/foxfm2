import { IWebElementToExtend } from "./Toolkit/WebElementToExtend";
import { IStrengthsLimitsSetting } from "./Settings/StrengthsLimitsSetting";
import { ISetting } from "./Toolkit/Setting";
import { ITransferMarketAmateurPlayerTableExtensionSetting } from "./Settings/TransferMarketAmateurPlayerTableExtensionSetting";
import { IEasyLogger } from "./Logger/EasyLogger";
import { IHtmlTable } from "./Toolkit/HtmlTable";
import { IHtmlTableColumn } from "./Toolkit/HtmlTableColumn";
import { IHtmlTableColumnAsync } from "./Toolkit/HtmlTableColumnAsync";
import { IColumnValues } from "./Toolkit/ColumnValues";
import { IHtmlTableColumnElementsByXpath } from "./Toolkit/HtmlTableColumnElementsByXpath";
import { IHtmlTableColumnValues } from "./Toolkit/HtmlTableColumnValues";

export class TransferMarketAmateurPlayerTable implements IWebElementToExtend {
  private table: IHtmlTable;
  private awpColumn: IHtmlTableColumn;
  private awpDiffColumn: IHtmlTableColumnAsync;
  private strengthColumn: IHtmlTableColumnValues<Number>;
  private strengthsLimitsSetting: IStrengthsLimitsSetting;
  private amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>;
  private log: IEasyLogger;

  constructor(
    table: IHtmlTable,
    awpColumn: IHtmlTableColumn,
    awpDiffColumn: IHtmlTableColumnAsync,
    strengthColumn: IHtmlTableColumnValues<Number>,
//    strengthColumnValuesToAdd: IColumnValues<Number>,
    amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>,
    log: IEasyLogger
  ) {
    this.table = table;
    this.awpColumn = awpColumn;
    this.awpDiffColumn = awpDiffColumn;
    this.strengthColumn = strengthColumn;
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
        this.strengthColumn.values().forEach(v => this.log.debug(`strength: ${v}`));
      })
      .catch(e => { throw new Error(`"Error while extending amateur market player table: ${e}."`); });
  }
}
