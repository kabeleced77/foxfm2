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
import { ITransferOfferTableSettings } from "../../Common/Settings/TransferOfferTableSettings";

export class TransferMarketOfferPlayerTable implements IWebElementToExtend {
  private readonly table: IHtmlTable;
  private readonly strengthColumn: IHtmlTableColumnByXpath;
  private readonly settings: ISetting<ITransferOfferTableSettings>;
  private readonly strengthLevels: IStrengthLevels;

  constructor(
    table: IHtmlTable,
    strengthColumn: IHtmlTableColumnByXpath,
    strengthLevels: IStrengthLevels,
    settings: ISetting<ITransferOfferTableSettings>
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
        let addAwpDiff = setting.addAwpDiffColumnActivated();
        let addNextStrength = setting.addNextStrengthColumnActivated();
        let extendStrength = setting.extendStrengthColumnActivated();

        if (addAwpDiff || addNextStrength || extendStrength) {
          this.strengthLevels
            .strengthLevels()
            .then((strengthLevels: IStrengthLevel[]) => {
              let columnNumber = 5;
              if (addAwpDiff) {
                this.table.addColumn(
                  new HtmlTableColumn(
                    this.header("AWP Diff", "90px"),
                    strengthLevels.map((sl, i) => { return this.element(`${sl.missingAwpsToNextStrengthValue()}`, i); }),
                    columnNumber++));
              }
              if (addNextStrength) {
                this.table.addColumn(
                  new HtmlTableColumn(
                    this.header("Next Str", "80px"),
                    strengthLevels.map((sl, i) => { return this.element(`${sl.nextStrengthValue()}`, i); }),
                    columnNumber++));
              }
              if (extendStrength) this.extendStrengthColumn(strengthLevels);
            });
        }
      });
  }

  private header(headerText: String, width: String): IHtmlElementWithChilds {
    return new HtmlElementWithChilds(
      new Array<IHtmlAttribute>(
        new HtmlAttribute("class", "textCenter"),
        new HtmlAttribute("role", "columnHeader"),
        new HtmlAttribute("style", `"width: ${width}"`)
      ),
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
        new HtmlAttribute("style", "color:#00600b;padding:5px;"),
        new HtmlAttribute("class", "bold")),
      content);
    let background = i.valueOf() % 2 ? "background:#bcdba5;" : "background:#d5efbb;";
    let tdEle = new HtmlElementWithChilds(
      new Array<IHtmlAttribute>(
        new HtmlAttribute("class", "textRight"),
        new HtmlAttribute("style", background)
      ),
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
