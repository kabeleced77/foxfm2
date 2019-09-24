import {
  IRessource,
  RessourceCommonTableExtensionsHeaderAwpDiff,
  RessourceCommonTableExtensionsHeaderNextStrength,
} from '../../Common/Ressource';
import { ITransferOfferTableSettings } from '../../Common/Settings/TransferOfferTableSettings';
import { IStrengthLevel } from '../../Common/StrengthLevel';
import { IStrengthLevels } from '../../Common/StrengthLevels';
import { IExtendWebElement } from '../../Common/Toolkit/IExtendWebElement';
import { HtmlAttribute, IHtmlAttribute } from '../../Common/Toolkit/HtmlAttribute';
import { HtmlElement, IHtmlElement } from '../../Common/Toolkit/HtmlElement';
import { IHtmlTable } from '../../Common/Toolkit/HtmlTable';
import { HtmlTableColumn } from '../../Common/Toolkit/HtmlTableColumn';
import { IHtmlTableColumnByXpath } from '../../Common/Toolkit/HtmlTableColumnByXpath';
import { ISetting } from '../../Common/Toolkit/Setting';
import { IUrl } from '../../Common/Toolkit/Url';

export class TransferMarketOfferPlayerTable implements IExtendWebElement {
  private readonly url: IUrl;
  private readonly table: IHtmlTable;
  private readonly strengthColumn: IHtmlTableColumnByXpath;
  private readonly settings: ISetting<ITransferOfferTableSettings>;
  private readonly strengthLevels: IStrengthLevels;
  private readonly ressourceTableHeaderAwpDiff: IRessource;
  private readonly ressourceTableHeaderNextStrength: IRessource;

  constructor(
    targetUrl: IUrl,
    table: IHtmlTable,
    strengthColumn: IHtmlTableColumnByXpath,
    strengthLevels: IStrengthLevels,
    settings: ISetting<ITransferOfferTableSettings>
  ) {
    this.url = targetUrl;
    this.table = table;
    this.strengthColumn = strengthColumn;
    this.settings = settings;
    this.strengthLevels = strengthLevels
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
                    this.header(this.ressourceTableHeaderAwpDiff.value(), "90px"),
                    strengthLevels.map(sl => this.element(`${sl.missingAwpsToNextStrengthValue().toLocaleString()}`)),
                    columnNumber++));
              }
              if (addNextStrength) {
                this.table.addColumn(
                  new HtmlTableColumn(
                    this.header(this.ressourceTableHeaderNextStrength.value(), "80px"),
                    strengthLevels.map(sl => this.element(`${sl.nextStrengthValue()}`)),
                    columnNumber++));
              }
              if (extendStrength) this.extendStrengthColumn(strengthLevels);
            });
        }
      });
  }

  private header(headerText: String, width: String): IHtmlElement<HTMLTableHeaderCellElement> {
    return new HtmlElement(
      "th",
      new Array<IHtmlAttribute>(
        new HtmlAttribute("class", "textCenter"),
        new HtmlAttribute("role", "columnHeader"),
        new HtmlAttribute("style", `"width: ${width}"`)
      ),
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
  private element(content: String): IHtmlElement<HTMLTableCellElement> {
    return new HtmlElement(
      "td",
      new Array<IHtmlAttribute>(
        new HtmlAttribute("class", "textRight"),
        new HtmlAttribute("style", "background:#bcdba5;")),
      "",
      new Array(
        new HtmlElement(
          "span",
          new Array<IHtmlAttribute>(
            new HtmlAttribute("style", "color:#00600b;padding:5px;"),
            new HtmlAttribute("class", "bold")),
          content,
          new Array(0))));
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
