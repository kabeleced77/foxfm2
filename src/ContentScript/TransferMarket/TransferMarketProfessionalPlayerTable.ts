import {
  IRessource,
  RessourceCommonTableExtensionsHeaderAwp,
  RessourceCommonTableExtensionsHeaderAwpDiff,
  RessourceCommonTableExtensionsHeaderNextStrength,
  RessourceCommonTableExtensionsHeaderTransferPriceCurrentStrength,
  RessourceCommonTableExtensionsHeaderTransferPriceNextStrength,
} from '../../Common/Ressource';
import { ITransferMarketSearchResultTableSettings } from '../../Common/Settings/TransferMarketSearchResultTableSettings';
import { IStrengthLevel } from '../../Common/StrengthLevel';
import { IStrengthLevels } from '../../Common/StrengthLevels';
import { IExtendWebElement } from '../../Common/Toolkit/ExtendWebElement';
import { HtmlAttribute, IHtmlAttribute } from '../../Common/Toolkit/HtmlAttribute';
import { HtmlElement, IHtmlElement } from '../../Common/Toolkit/HtmlElement';
import { IHtmlTable } from '../../Common/Toolkit/HtmlTable';
import { IHtmlTableColumnByXpath } from '../../Common/Toolkit/HtmlTableColumnByXpath';
import { ISetting } from '../../Common/Toolkit/Setting';
import { IUrl } from '../../Common/Toolkit/Url';
import { IPlayers } from '../../Common/IPlayers';
import { IEasyLogger } from '../../Common/Logger/EasyLogger';
import { XPathFirstResult } from '../../Common/Toolkit/XPathFirstResult';

/**
 * Extend the table showing the professional player transfers by
 *   - a new column showing the current AWP
 *   - a new column showing the difference AWP to the next level
 *   - a new column showing the next level
 *   - extend existing columng "Strength" by the actual strength based on current AWP
 *   - a new column showing transfer price of current level
 *   - a new column showing transfer price of next level
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
  private readonly ressourceTableHeaderTransferPriceCurrentStrength: IRessource;
  private readonly ressourceTableHeaderTransferPriceNextStrength: IRessource;

  constructor(
    targetUrl: IUrl,
    table: IHtmlTable,
    strengthColumn: IHtmlTableColumnByXpath,
    strengthLevels: IStrengthLevels,
    private readonly players: IPlayers,
    settings: ISetting<ITransferMarketSearchResultTableSettings>,
    private readonly log: IEasyLogger,
  ) {
    this.url = targetUrl;
    this.table = table;
    this.strengthColumn = strengthColumn;
    this.settings = settings;
    this.strengthLevels = strengthLevels
    this.ressourceTableHeaderAwp = new RessourceCommonTableExtensionsHeaderAwp();
    this.ressourceTableHeaderAwpDiff = new RessourceCommonTableExtensionsHeaderAwpDiff();
    this.ressourceTableHeaderNextStrength = new RessourceCommonTableExtensionsHeaderNextStrength();
    this.ressourceTableHeaderTransferPriceCurrentStrength = new RessourceCommonTableExtensionsHeaderTransferPriceCurrentStrength();
    this.ressourceTableHeaderTransferPriceNextStrength = new RessourceCommonTableExtensionsHeaderTransferPriceNextStrength();
  }

  public targetUrl(): IUrl {
    return this.url;
  }
  public extend(): void {
    this.settings
      .value()
      .then(async setting => {
        this.log.debug(`Based on configuration settings this page will be extended: URI: ${this.url.url()}; Settings: ${JSON.stringify(setting)}`);
        let addAwp = setting.addAwpColumnActivated();
        let addAwpDiff = setting.addAwpDiffColumnActivated();
        let addNextStrength = setting.addNextStrengthColumnActivated();
        let extendStrength = setting.extendStrengthColumnActivated();
        let addTransferPriceOfCurrentLevel = setting.addTransferPriceStrengthColumnActivated();
        let addTransferPriceOfNextLevel = setting.addTransferPriceNextStrengthColumnActivated();

        if (false
          || addAwp
          || addAwpDiff
          || addNextStrength
          || extendStrength
          || addTransferPriceOfCurrentLevel
          || addTransferPriceOfNextLevel) {

          //  - extend strength column
          this.strengthLevels
            .strengthLevels()
            .then(async (strengthLevels: IStrengthLevel[]) => {
              if (extendStrength) this.extendStrengthColumn(strengthLevels);
            });

          const columnNumberAwp = 6;
          const columnNumberAwpDiff = 7;
          const columnNumberNewStrengthColumn = 8;
          const columnNumberMarketValueCurrentStrength = 9;
          const columnNumberMarketValueNextStrength = 10;

          // iterate through transfer market result table
          // for each row - if correspondent feature is activated - do
          //  - add AWPs
          //  - add AWP diff to next strength
          //  - add next strength
          //  - add transfer price of actual strength
          //  - add transfer price of next strength
          (await this.players.all()).forEach(async (player, i) => {
            // add new column displaying current AWPs
            if (addAwp) {
              this.addCell(
                i,
                columnNumberAwp,
                i === 0
                  ? this.header(this.ressourceTableHeaderAwp.value())
                  : this.element(`${player.strengthLevel().awp().awpPoints()}`, i)
              );
            }
            // add new column displaying diff-AWPs to next strength
            if (addAwpDiff) {
              this
                .addCell(
                  i,
                  columnNumberAwpDiff,
                  i === 0
                    ? this.header(this.ressourceTableHeaderAwpDiff.value())
                    : this.element(`${player.strengthLevel().missingAwpsToNextStrengthValue()}`, i),
                );
            }
            // add new column displaying next strength
            if (addNextStrength) {
              this.addCell(
                i,
                columnNumberNewStrengthColumn,
                i === 0
                  ? this.header(this.ressourceTableHeaderNextStrength.value())
                  : this.element(`${player.strengthLevel().nextStrengthValue()}`, i),
              );
            }
            // add new column for average transfer price of current strength
            if (addTransferPriceOfCurrentLevel) {
              this
                .table
                .addNewCellToBodyRow(
                  0,
                  i,
                  columnNumberMarketValueCurrentStrength,
                  i === 0
                    ? this.header(this.ressourceTableHeaderTransferPriceCurrentStrength.value())
                    : this.element((await player.averageTransferPrice()).valueOf().toString(), i));
            }
            // add new column for average transfer price of current strength
            if (addTransferPriceOfNextLevel) {
              this
                .table
                .addNewCellToBodyRow(
                  0,
                  i,
                  columnNumberMarketValueNextStrength,
                  i === 0
                    ? this.header(this.ressourceTableHeaderTransferPriceNextStrength.value())
                    : this.element('>not-supported-yet>', i));
            };
          });
        }
      });
    // adjust width of div containing the transfer result table to 100%
    this.adjustWidthOfTables();
  }

  private addCell(
    rowNumber: number,
    columnNumber: number,
    textCellContent: IHtmlElement<HTMLTableCellElement>,
  ) {
    this
      .table
      .addNewCellToBodyRow(
        0,
        rowNumber,
        columnNumber,
        textCellContent,
      );
  }

  private adjustWidthOfTables() {
    new XPathFirstResult<HTMLDivElement>(
      document,
      '//*[@id="transfermarkt"]/div[1]/div')
      .result()
      .style
      .width = "100%";
    // adjust width of header of transfer result table to 100%
    new XPathFirstResult<HTMLTableElement>(
      document,
      '//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[1]')
      .result()
      .style
      .width = "100%";
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
