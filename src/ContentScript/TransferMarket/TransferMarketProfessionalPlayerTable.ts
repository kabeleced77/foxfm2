import {
  IRessource,
  RessourceCommonTableExtensionsHeaderAwp,
  RessourceCommonTableExtensionsHeaderAwpDiff,
  RessourceCommonTableExtensionsHeaderNextStrength,
  RessourceCommonTableExtensionsHeaderTransferPriceCurrentStrength,
  RessourceCommonTableExtensionsHeaderTransferPriceNextStrength,
  RessourceCommonTableExtensionsHeaderTransferPriceNextAgeCurrentStrength,
  RessourceCommonTableExtensionsHeaderTransferPriceNextAgeNextStrength,
} from '../../Common/Ressource';
import { ITransferMarketSearchResultTableSettings } from '../../Common/Settings/TransferMarketSearchResultTableSettings';
import { IStrengthLevel } from '../../Common/StrengthLevel';
import { IStrengthLevels } from '../../Common/StrengthLevels';
import { IExtendWebElement } from '../../Common/Toolkit/IExtendWebElement';
import { HtmlAttribute, IHtmlAttribute } from '../../Common/Toolkit/HtmlAttribute';
import { HtmlElement, IHtmlElement } from '../../Common/Toolkit/HtmlElement';
import { IHtmlTable } from '../../Common/Toolkit/HtmlTable';
import { IHtmlTableColumnByXpath } from '../../Common/Toolkit/HtmlTableColumnByXpath';
import { ISetting } from '../../Common/Toolkit/Setting';
import { IUrl } from '../../Common/Toolkit/Url';
import { IPlayers } from '../../Common/IPlayers';
import { IEasyLogger } from '../../Common/Logger/EasyLogger';
import { XPathFirstResult } from '../../Common/Toolkit/XPathFirstResult';
import { PlayerCategory } from '../../Common/PlayerCategory';
import { IPlayerTransfersMessaging } from '../../Common/Messaging/IPlayerTransfersMessaging';

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
  private readonly ressourceTableHeaderTransferPriceNextAgeCurrentStrength: IRessource;
  private readonly ressourceTableHeaderTransferPriceNextAgeNextStrength: IRessource;

  constructor(
    targetUrl: IUrl,
    table: IHtmlTable,
    strengthColumn: IHtmlTableColumnByXpath,
    strengthLevels: IStrengthLevels,
    private readonly players: IPlayers,
    private readonly playerTransfers: IPlayerTransfersMessaging,
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
    this.ressourceTableHeaderTransferPriceNextAgeCurrentStrength = new RessourceCommonTableExtensionsHeaderTransferPriceNextAgeCurrentStrength();
    this.ressourceTableHeaderTransferPriceNextAgeNextStrength = new RessourceCommonTableExtensionsHeaderTransferPriceNextAgeNextStrength();
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
        let addTransferPriceOfNextAgeCurrentLevel = setting.addTransferPriceNextAgeStrengthColumnActivated();
        let addTransferPriceOfNextAgeNextLevel = setting.addTransferPriceNextAgeNextStrengthColumnActivated();

        if (false
          || addAwp
          || addAwpDiff
          || addNextStrength
          || extendStrength
          || addTransferPriceOfCurrentLevel
          || addTransferPriceOfNextLevel
          || addTransferPriceOfNextAgeCurrentLevel
          || addTransferPriceOfNextAgeNextLevel
        ) {

          //  - extend strength column
          this.strengthLevels
            .strengthLevels()
            .then(async (strengthLevels: IStrengthLevel[]) => {
              if (extendStrength) this.extendStrengthColumn(strengthLevels);
            });

          // TODO: bad but currently no other idea: call here to fill cache - requires implementation knowledge of used class
          await this.playerTransfers.averages();

          // iterate through transfer market result table
          // for each row - if correspondent feature is activated - do
          //  - add AWPs
          //  - add AWP diff to next strength
          //  - add next strength
          //  - add transfer price of actual strength
          //  - add transfer price of next strength
          (await this.players.all()).forEach(async (player, i) => {
            // initial column number where to start inserting the new columns
            var columnNumber = 6;

            // add new column displaying current AWPs
            if (addAwp) {
              this.addCell(
                i,
                columnNumber++,
                i === 0
                  ? this.header(this.ressourceTableHeaderAwp.value())
                  : this.element(`${player.strengthLevel().awp().awpPoints().toLocaleString()}`, i)
              );
            }
            // add new column displaying diff-AWPs to next strength
            if (addAwpDiff) {
              this.addCell(
                i,
                columnNumber++,
                i === 0
                  ? this.header(this.ressourceTableHeaderAwpDiff.value())
                  : this.element(`${player.strengthLevel().missingAwpsToNextStrengthValue().toLocaleString()}`, i),
              );
            }
            // add new column displaying next strength
            if (addNextStrength) {
              this.addCell(
                i,
                columnNumber++,
                i === 0
                  ? this.header(this.ressourceTableHeaderNextStrength.value())
                  : this.element(`${player.strengthLevel().nextStrengthValue()}`, i),
              );
            }
            // add new column for average transfer price of current strength
            if (addTransferPriceOfCurrentLevel) {
              this.table
                .addNewCellToBodyRow(
                  0,
                  i,
                  columnNumber++,
                  i === 0
                    ? this.header(this.ressourceTableHeaderTransferPriceCurrentStrength.value())
                    : this.element((await this.playerTransfers.average(player.category())).toLocaleString(), i));
            }
            // add new column for average transfer price of next strength
            if (addTransferPriceOfNextLevel) {
              const categoryNextStrength = new PlayerCategory(
                player.category().position(),
                player.category().age(),
                player.category().strength().valueOf() + 1,
              )
              this.table
                .addNewCellToBodyRow(
                  0,
                  i,
                  columnNumber++,
                  i === 0
                    ? this.header(this.ressourceTableHeaderTransferPriceNextStrength.value())
                    : this.element((await this.playerTransfers.average(categoryNextStrength)).toLocaleString(), i));
            };
            // add new column for average transfer price of next age and current strength
            if (addTransferPriceOfNextAgeCurrentLevel) {
              const categoryNextAgeCurrentStrength = new PlayerCategory(
                player.category().position(),
                player.category().age().valueOf() + 1,
                player.category().strength(),
              )
              this.table
                .addNewCellToBodyRow(
                  0,
                  i,
                  columnNumber++,
                  i === 0
                    ? this.header(this.ressourceTableHeaderTransferPriceNextAgeCurrentStrength.value())
                    : this.element((await this.playerTransfers.average(categoryNextAgeCurrentStrength)).toLocaleString(), i));
            }
            // add new column for average transfer price of next age and next strength
            if (addTransferPriceOfNextAgeNextLevel) {
              const categoryNextAgeNextStrength = new PlayerCategory(
                player.category().position(),
                player.category().age().valueOf() + 1,
                player.category().strength().valueOf() + 1,
              )
              this.table
                .addNewCellToBodyRow(
                  0,
                  i,
                  columnNumber++,
                  i === 0
                    ? this.header(this.ressourceTableHeaderTransferPriceNextAgeNextStrength.value())
                    : this.element((await this.playerTransfers.average(categoryNextAgeNextStrength)).toLocaleString(), i));
            };

          });
          // adjust width of div containing the transfer result table to 100%
          this.adjustWidthOfTables();
        }
      });
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
    // adjust width of div-element surrounding transfer filter and result table/header
    new XPathFirstResult<HTMLTableElement>(
      document,
      '//*[@id="transfermarkt"]/div/form/div')
      .node()
      .style
      .width = "100%";
    // adjust width of div-element surrounding transfer result table/header
    new XPathFirstResult<HTMLTableElement>(
      document,
      '//*[@id="transfermarkt"]/div/form/div/div[2]')
      .node()
      .style
      .width = "100%";
    // adjust width of header of transfer result table
    new XPathFirstResult<HTMLTableElement>(
      document,
      '//*[@id="transfermarkt"]//div[2]/table/tbody/tr/td/table[1]')
      .node()
      .style
      .width = "100%";
    // adjust width of transfer result table
    new XPathFirstResult<HTMLTableElement>(
      document,
      '//*[@id="transfermarkt"]//div[2]/table/tbody/tr/td/table[2]')
      .node()
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
