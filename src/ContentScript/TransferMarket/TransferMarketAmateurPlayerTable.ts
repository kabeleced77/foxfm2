import { IWebElementToExtend } from "../../Common/Toolkit/WebElementToExtend";
import { ISetting } from "../../Common/Toolkit/Setting";
import { ITransferMarketAmateurPlayerTableSettings } from "../../Common/Settings/TransferMarketAmateurPlayerTableSettings";
import { IEasyLogger } from "../../Common/Logger/EasyLogger";
import { IHtmlTable } from "../../Common/Toolkit/HtmlTable";
import { HtmlTableColumn } from "../../Common/Toolkit/HtmlTableColumn";
import { IHtmlTableColumnByXpath } from "../../Common/Toolkit/HtmlTableColumnByXpath";
import { IStrengthLevel } from "../../Common/StrengthLevel";
import { IStrengthLevels } from "../../Common/StrengthLevels";
import { HtmlTableColumnHeader } from "../../Common/Toolkit/HtmlTableColumnHeader";
import { HtmlElement } from "../../Common/Toolkit/HtmlElement";
import { IHtmlAttribute, HtmlAttribute } from "../../Common/Toolkit/HtmlAttribute";
import { HtmlElementWithChilds } from "../../Common/Toolkit/HtmlElementWithChilds";

export class TransferMarketAmateurPlayerTable implements IWebElementToExtend {
  private readonly table: IHtmlTable;
  private readonly strengthColumn: IHtmlTableColumnByXpath;
  private readonly amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableSettings>;
  private readonly strengthLevels: IStrengthLevels;
  private readonly log: IEasyLogger;

  constructor(
    table: IHtmlTable,
    strengthColumn: IHtmlTableColumnByXpath,
    strengthLevels: IStrengthLevels,
    amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableSettings>,
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
        if (setting.addAwpColumnActivated()) {
          this.strengthLevels
            .strengthLevels()
            .then((strengthLevels: IStrengthLevel[]) => {
              let awpDiffCol: HtmlElementWithChilds[] = [];
              let awpCol: HtmlElementWithChilds[] = [];
              strengthLevels.forEach((sl, i) => {
                let tdStyle = i % 2 == 0 ? "background:#ebf0d9" : "background:#d4e6bc";
                awpCol.push(new HtmlElementWithChilds(
                  new Array<IHtmlAttribute>(new HtmlAttribute("style", tdStyle)),
                  new Array<HTMLElement>(
                    new HtmlElement(
                      "div",
                      new Array<IHtmlAttribute>(new HtmlAttribute("align", "center")),
                      sl.awp().awpPoints().toString()
                    ).element())));
                awpDiffCol.push(new HtmlElementWithChilds(
                  new Array<IHtmlAttribute>(new HtmlAttribute("style", tdStyle)),
                  new Array<HTMLElement>(
                    new HtmlElement(
                      "div",
                      new Array<IHtmlAttribute>(new HtmlAttribute("align", "center")),
                      sl.missingAwpsToNextStrengthValue().toString()
                    ).element())));
              });
              // add AWP diff column
              this.table.addColumn(
                new HtmlTableColumn(
                  new HtmlElementWithChilds(
                    new Array<IHtmlAttribute>(
                      new HtmlAttribute("class", "textcenter")),
                    new Array<HTMLElement>(
                      new HtmlElement(
                        "div",
                        new Array<IHtmlAttribute>(
                          new HtmlAttribute("style", "color:#04143e;"),
                          new HtmlAttribute("class", "bold")),
                        "AWPs Diff").element())),
                  awpDiffCol,
                  7));
              // add AWP column
              this.table.addColumn(
                new HtmlTableColumn(
                  new HtmlElementWithChilds(
                    new Array<IHtmlAttribute>(
                      new HtmlAttribute("class", "textcenter")),
                    new Array<HTMLElement>(
                      new HtmlElement(
                        "div",
                        new Array<IHtmlAttribute>(
                          new HtmlAttribute("style", "color:#04143e;"),
                          new HtmlAttribute("class", "bold")),
                        "AWP").element())),
                  awpCol,
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
