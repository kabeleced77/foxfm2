import { IWebElementToExtend } from "../../Common/Toolkit/WebElementToExtend";
import { IHtmlTable } from "../../Common/Toolkit/HtmlTable";
import { IHtmlTableColumnByXpath } from "../../Common/Toolkit/HtmlTableColumnByXpath";
import { IStrengthLevels } from "../../Common/StrengthLevels";
import { ISetting } from "../../Common/Toolkit/Setting";
import { IStrengthLevel } from "../../Common/StrengthLevel";
import { HtmlTableColumn } from "../../Common/Toolkit/HtmlTableColumn";
import { HtmlElementWithChilds, IHtmlElementWithChilds } from "../../Common/Toolkit/HtmlElementWithChilds";
import { IHtmlAttribute, HtmlAttribute } from "../../Common/Toolkit/HtmlAttribute";
import { HtmlElement } from "../../Common/Toolkit/HtmlElement";
import { ITransferMarketAmateurPlayerTableSettings } from "../../Common/Settings/TransferMarketAmateurPlayerTableSettings";

export class TransferMarketAmateurPlayerTable implements IWebElementToExtend {
  private readonly table: IHtmlTable;
  private readonly strengthColumn: IHtmlTableColumnByXpath;
  private readonly settings: ISetting<ITransferMarketAmateurPlayerTableSettings>;
  private readonly strengthLevels: IStrengthLevels;

  constructor(
    table: IHtmlTable,
    strengthColumn: IHtmlTableColumnByXpath,
    strengthLevels: IStrengthLevels,
    settings: ISetting<ITransferMarketAmateurPlayerTableSettings>
  ) {
    this.table = table;
    this.strengthColumn = strengthColumn;
    this.settings = settings;
    this.strengthLevels = strengthLevels
  }

  public extend(): void {
    this.settings
      .value()
      .then(setting => {
        let addAwp = setting.addAwpColumnActivated();
        let addAwpDiff = setting.addAwpDiffColumnActivated();
        let addNextStrength = setting.addNextStrengthColumnActivated();
        let extendStrength = setting.extendStrengthColumnActivated();

        if (addAwp || addAwpDiff || addNextStrength || extendStrength) {
          this.strengthLevels
            .strengthLevels()
            .then((strengthLevels: IStrengthLevel[]) => {
              let columnNumber = 7;
              if (addAwp) {
                this.table.addColumn(
                  new HtmlTableColumn(
                    this.header("AWP"),
                    strengthLevels.map((sl, i) => { return this.element(`${sl.awp().awpPoints()}`, i); }),
                    columnNumber++));
              }
              if (addAwpDiff) {
                this.table.addColumn(
                  new HtmlTableColumn(
                    this.header("AWP Diff"),
                    strengthLevels.map((sl, i) => { return this.element(`${sl.missingAwpsToNextStrengthValue()}`, i); }),
                    columnNumber++));
              }
              if (addNextStrength) {
                this.table.addColumn(
                  new HtmlTableColumn(
                    this.header("Next Str"),
                    strengthLevels.map((sl, i) => { return this.element(`${sl.nextStrengthValue()}`, i); }),
                    columnNumber++));
              }
              if (extendStrength) this.extendStrengthColumn(strengthLevels);
            });
        }
      });
  }

  private header(headerText: String): IHtmlElementWithChilds {
    return new HtmlElementWithChilds(
      new Array<IHtmlAttribute>(
        new HtmlAttribute("class", "textCenter")),
      new Array<HTMLElement>(
        new HtmlElement(
          "span",
          new Array<IHtmlAttribute>(
            new HtmlAttribute("style", "color:#04143e;"),
            new HtmlAttribute("class", "bold")),
          headerText).element()));
  }
  private element(content: String, i: Number): IHtmlElementWithChilds {
    let newElement = new HtmlElement(
      "span",
      new Array<IHtmlAttribute>(
        new HtmlAttribute("style", "padding:5px;")),
      content);
    let background = i.valueOf() % 2 ? "background:#d4e6bc;" : "background:#ebf0d9;";
    let tdEle = new HtmlElementWithChilds(
      new Array<IHtmlAttribute>(
        new HtmlAttribute("class", "textRight"),
        new HtmlAttribute("style", background)),
      new Array<HTMLElement>(newElement.element()));
    return tdEle;
  }
  private extendStrengthColumn(strengthLevels: IStrengthLevel[]) {
    this.table.extendColumn(
      this.strengthColumn,
      strengthLevels
        .map((sl, i) => {
          return sl.actualStrengthValue().valueOf() !== sl.currentStrengthValue().valueOf()
            ? ` (${sl.actualStrengthValue()})` : "";
        }));
  }
}
