import {
  IRessource,
  RessourceCommonTableExtensionsHeaderAwp,
  RessourceCommonTableExtensionsHeaderAwpDiff,
  RessourceCommonTableExtensionsHeaderNextStrength,
} from '../../Common/Ressource';
import { ITransferMarketSearchResultTableSettings } from '../../Common/Settings/TransferMarketSearchResultTableSettings';
import { IStrengthLevel } from '../../Common/StrengthLevel';
import { IStrengthLevels } from '../../Common/StrengthLevels';
import { IExtendWebElement } from '../../Common/Toolkit/ExtendWebElement';
import { HtmlAttribute, IHtmlAttribute } from '../../Common/Toolkit/HtmlAttribute';
import { HtmlElement, IHtmlElement } from '../../Common/Toolkit/HtmlElement';
import { IHtmlTable } from '../../Common/Toolkit/HtmlTable';
import { HtmlTableColumn } from '../../Common/Toolkit/HtmlTableColumn';
import { IHtmlTableColumnByXpath } from '../../Common/Toolkit/HtmlTableColumnByXpath';
import { ISetting } from '../../Common/Toolkit/Setting';
import { IUrl } from '../../Common/Toolkit/Url';

/**
 * Extend the table showing the professional player transfers by
 *   - a new column showing the current AWP
 *   - a new column showing the difference AWP to the next level
 *   - a new column showing the next level
 *   - extend existing columng "Strength" by the actual strength based on current AWP
 * 
 * All extensions can be confiured, i.e. turned on or off.
 */
export class TransferMarketProfessionalPlayerTable implements IExtendWebElement {
  private readonly url: IUrl;
  private readonly table: IHtmlTable;
  private readonly strengthColumn: IHtmlTableColumnByXpath;
  private readonly settings: ISetting<ITransferMarketSearchResultTableSettings>;
  private readonly strengthLevels: IStrengthLevels;
  private readonly ressourceTableHeaderAwp: IRessource;
  private readonly ressourceTableHeaderAwpDiff: IRessource;
  private readonly ressourceTableHeaderNextStrength: IRessource;

  constructor(
    targetUrl: IUrl,
    table: IHtmlTable,
    strengthColumn: IHtmlTableColumnByXpath,
    strengthLevels: IStrengthLevels,
    settings: ISetting<ITransferMarketSearchResultTableSettings>
  ) {
    this.url = targetUrl;
    this.table = table;
    this.strengthColumn = strengthColumn;
    this.settings = settings;
    this.strengthLevels = strengthLevels
    this.ressourceTableHeaderAwp = new RessourceCommonTableExtensionsHeaderAwp();
    this.ressourceTableHeaderAwpDiff = new RessourceCommonTableExtensionsHeaderAwpDiff();
    this.ressourceTableHeaderNextStrength = new RessourceCommonTableExtensionsHeaderNextStrength();
  }

  public targetUrl(): IUrl {
    return this.url;
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
              let columnNumber = 6;
              if (addAwp) {
                this.table.addColumn(
                  new HtmlTableColumn(
                    new HtmlElement("th", [], "", []),
                    strengthLevels.map((sl, i) => { return i === 0 ? this.header(this.ressourceTableHeaderAwp.value()) : this.element(`${sl.awp().awpPoints()}`, i); }),
                    columnNumber++));
              }
              if (addAwpDiff) {
                this.table.addColumn(
                  new HtmlTableColumn(
                    new HtmlElement("th", [], "", []),
                    strengthLevels.map((sl, i) => { return i === 0 ? this.header(this.ressourceTableHeaderAwpDiff.value()) : this.element(`${sl.missingAwpsToNextStrengthValue()}`, i); }),
                    columnNumber++));
              }
              if (addNextStrength) {
                this.table.addColumn(
                  new HtmlTableColumn(
                    new HtmlElement("th", [], "", []),
                    strengthLevels.map((sl, i) => { return i === 0 ? this.header(this.ressourceTableHeaderNextStrength.value()) : this.element(`${sl.nextStrengthValue()}`, i); }),
                    columnNumber++));
              }
              if (extendStrength) this.extendStrengthColumn(strengthLevels);
            });
        }
      });
  }

  private header(headerText: String): IHtmlElement<HTMLTableCellElement> {
    return new HtmlElement(
      "td",
      new Array<IHtmlAttribute>(
        new HtmlAttribute("class", "textCenter")),
      "",
      new Array(
        new HtmlElement(
          "span",
          new Array<IHtmlAttribute>(
            new HtmlAttribute("style", "color:#04143e;"),
            new HtmlAttribute("class", "bold")),
          headerText,
          new Array(0))));
  }
  private element(content: String, i: Number): IHtmlElement<HTMLTableCellElement> {
    let background = i.valueOf() % 2 ? "background:#ebf0d9;" : "background:#d4e6bc;";
    return new HtmlElement(
      "td",
      new Array<IHtmlAttribute>(
        new HtmlAttribute("class", "textRight"),
        new HtmlAttribute("style", background)),
      "",
      new Array(
        new HtmlElement(
          "span",
          new Array<IHtmlAttribute>(
            new HtmlAttribute("style", "padding:5px;")),
          content,
          new Array(0))));
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
