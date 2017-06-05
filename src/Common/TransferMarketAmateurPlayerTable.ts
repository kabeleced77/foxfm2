import { IWebElementToExtend } from "./Toolkit/WebElementToExtend";
import { IStrengthLevelsSetting } from "./Settings/StrengthLevelsSetting";
import { ISetting } from "./Toolkit/Setting";
import { ITransferMarketAmateurPlayerTableExtensionSetting } from "./Settings/TransferMarketAmateurPlayerTableExtensionSetting";
import { IEasyLogger } from "./Logger/EasyLogger";
import { IHtmlTable } from "./Toolkit/HtmlTable";
import { IExistingColumn } from "./Toolkit/ExisitingColumn";

export class TransferMarketAmateurPlayerTable implements IWebElementToExtend {
  private table: IHtmlTable;
  private trainingColumn:IExistingColumn;
  private strengthLevels: IStrengthLevelsSetting;
  private amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>;
  private log: IEasyLogger;

  constructor(
    table: IHtmlTable,
    trainingColumn: IExistingColumn,
    strengthLevels: IStrengthLevelsSetting,
    amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>,
    log: IEasyLogger
  ) {
    this.table = table;
    this.trainingColumn = trainingColumn;
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
              var idx = this.trainingColumn.index();
              this.log.debug(idx.toString());
              var rows = this.table.tableHeader().rows;
              var col = rows.item(0).cells.item(idx.valueOf());
              this.log.debug(col.innerHTML);
            })
            .catch(e => { throw new Error(`"Error while extending amateur market player table: ${e}."`); });
        }
      })
      .catch(e => { throw new Error(`"Error reading settings to extend amateur market player table: ${e}."`); });
  }
}
