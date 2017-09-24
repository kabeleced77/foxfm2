import { IWebElementToExtend } from "../../Common/Toolkit/WebElementToExtend";
import { IHtmlTable } from "../../Common/Toolkit/HtmlTable";
import { IHtmlTableColumnByXpath } from "../../Common/Toolkit/HtmlTableColumnByXpath";
import { IStrengthLevels } from "../../Common/StrengthLevels";
import { ISetting } from "../../Common/Toolkit/Setting";
import { ITransferMarketSearchResultTableSettings } from "../../Common/Settings/TransferMarketSearchResultTableSettings";
import { IStrengthLevel } from "../../Common/StrengthLevel";
import { HtmlTableColumn } from "../../Common/Toolkit/HtmlTableColumn";
import { HtmlElementWithChilds, IHtmlElementWithChilds } from "../../Common/Toolkit/HtmlElementWithChilds";
import { IHtmlAttribute, HtmlAttribute } from "../../Common/Toolkit/HtmlAttribute";
import { HtmlElement } from "../../Common/Toolkit/HtmlElement";

export class TransferMarketProfessionalPlayerTable implements IWebElementToExtend {
  private readonly table: IHtmlTable;
  private readonly strengthColumn: IHtmlTableColumnByXpath;
  private readonly settings: ISetting<ITransferMarketSearchResultTableSettings>;
  private readonly strengthLevels: IStrengthLevels;

  constructor(
    table: IHtmlTable,
    strengthColumn: IHtmlTableColumnByXpath,
    strengthLevels: IStrengthLevels,
    settings: ISetting<ITransferMarketSearchResultTableSettings>
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
        let extendStrength = setting.extendStrengthColumnActivated();
        let addAwpDiff = setting.addAwpDiffColumnActivated();
        let addNextStrength = setting.addNextStrengthColumnActivated();

        if (extendStrength || addAwpDiff || addNextStrength) {
          this.strengthLevels
            .strengthLevels()
            .then((strengthLevels: IStrengthLevel[]) => {
              if (addAwpDiff) this.addAwpDiffColumn(strengthLevels);
              if (addNextStrength) this.addNextStrengthColumn(strengthLevels);
              if (extendStrength) this.extendStrengthColumn(strengthLevels);
            });
        }
      });
  }

  private addAwpDiffColumn(strengthLevels: IStrengthLevel[]) {
    this.table.addColumn(
      new HtmlTableColumn(
        new HtmlElementWithChilds([], []),
        strengthLevels
          .map((sl, i) => {
            if (i === 0) {
              return this.header("AWP Diff");
            }
            return this.element(`${sl.missingAwpsToNextStrengthValue()}`, i);
          }),
        6));
  }
  private addNextStrengthColumn(strengthLevels: IStrengthLevel[]) {
    this.table.addColumn(
      new HtmlTableColumn(
        new HtmlElementWithChilds([], []),
        strengthLevels
          .map((sl, i) => {
            if (i === 0) {
              return this.header("Next Str");
            }
            return this.element(`${sl.nextStrengthValue()}`, i);
          }),
        7));
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
    let background = i.valueOf() % 2 ? "background:#ebf0d9;" : "background:#d4e6bc;";
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
          if (i === 0) {
            return " (St)"
          }
          return sl.actualStrengthValue().valueOf() !== sl.currentStrengthValue().valueOf()
            ? ` (${sl.actualStrengthValue()})` : "";
        }));
  }
}
