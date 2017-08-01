import { IWebElementToExtend } from "./Toolkit/WebElementToExtend";
import { ISetting } from "./Toolkit/Setting";
import { ITransferMarketAmateurPlayerTableExtensionSetting } from "./Settings/TransferMarketAmateurPlayerTableExtensionSetting";
import { IEasyLogger } from "./Logger/EasyLogger";
import { IHtmlTable } from "./Toolkit/HtmlTable";
import { HtmlTableColumn } from "./Toolkit/HtmlTableColumn";
import { ColumnValues } from "./Toolkit/ColumnValues";
import { IHtmlTableColumnByXpath } from "./Toolkit/HtmlTableColumnByXpath";
import { IStrengthLevel } from "./StrengthLevel";
import { IStrengthLevels } from "./StrengthLevels";
import { HtmlTableColumnHeader } from "./Toolkit/HtmlTableColumnHeader";
import { HtmlElement } from "./Toolkit/HtmlElement";
import { IHtmlAttribute, HtmlAttribute } from "./Toolkit/HtmlAttribute";
import { HtmlElements } from "./Toolkit/HtmlElements";

export class TransferMarketAmateurPlayerTable implements IWebElementToExtend {
  private readonly table: IHtmlTable;
  private readonly strengthColumn: IHtmlTableColumnByXpath;
  private readonly amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>;
  private readonly strengthLevels: IStrengthLevels;
  private readonly log: IEasyLogger;

  constructor(
    table: IHtmlTable,
    strengthColumn: IHtmlTableColumnByXpath,
    strengthLevels: IStrengthLevels,
    amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>,
    log: IEasyLogger
  ) {
    this.table = table;
    this.strengthColumn = strengthColumn;
    this.amateurPlayerTableSettings = amateurPlayerTableSettings;
    this.strengthLevels = strengthLevels
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
            .then((strengthLevels: IStrengthLevel[]) => {
              // add AWP diff column
              this.table.addColumn(
                new HtmlTableColumn(
                  new HtmlTableColumnHeader(
                    new HtmlElement(
                      "div",
                      new Array<IHtmlAttribute>(
                        new HtmlAttribute("style", "color:#04143e;"),
                        new HtmlAttribute("class", "bold")),
                      "AWPs Diff")),
                  new HtmlElements(
                    new ColumnValues<Number>(strengthLevels.map(sl => sl.missingAwpsToNextStrengthValue())),
                    "div",
                    new Array<IHtmlAttribute>(
                      new HtmlAttribute("align", "center"))),
                  7));
              // add AWP column
              this.table.addColumn(
                new HtmlTableColumn(
                  new HtmlTableColumnHeader(
                    new HtmlElement(
                      "div",
                      new Array<IHtmlAttribute>(
                        new HtmlAttribute("style", "color:#04143e;"),
                        new HtmlAttribute("class", "bold")),
                      "AWP")),
                  new HtmlElements(
                    new ColumnValues<Number>(strengthLevels.map(sl => sl.awp().awpPoints())),
                    "div",
                    new Array<IHtmlAttribute>(
                      new HtmlAttribute("align", "center"))),
                  7));
              // add actual strength value to existing strength value column
              this.table.extendColumn(
                this.strengthColumn,
                strengthLevels
                  .map(sl => sl.actualStrengthValue().valueOf() !== sl.currentStrengthValue().valueOf() ? ` (${sl.actualStrengthValue()})` : " (-)")
              );
            });
        }
        this.strengthColumn.values().forEach(v => this.log.debug(`strength: ${v}`));
      })
      .catch(e => { throw new Error(`"Error while extending amateur market player table: ${e}."`); });
  }
}
