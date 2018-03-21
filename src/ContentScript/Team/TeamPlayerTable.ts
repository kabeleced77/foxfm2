import { IEasyLogger } from '../../Common/Logger/EasyLogger';
import {
  IRessource,
  RessourceCommonTableExtensionsHeaderAwpDiff,
  RessourceCommonTableExtensionsHeaderNextStrength,
} from '../../Common/Ressource';
import { ITeamTableSetting } from '../../Common/Settings/TeamTableSetting';
import { IStrengthLevel } from '../../Common/StrengthLevel';
import { IStrengthLevels } from '../../Common/StrengthLevels';
import { IExtendWebElement } from '../../Common/Toolkit/ExtendWebElement';
import { HtmlAttribute, IHtmlAttribute } from '../../Common/Toolkit/HtmlAttribute';
import { HtmlElement } from '../../Common/Toolkit/HtmlElement';
import { HtmlElementWithChilds, IHtmlElementWithChilds } from '../../Common/Toolkit/HtmlElementWithChilds';
import { IHtmlTable } from '../../Common/Toolkit/HtmlTable';
import { HtmlTableColumn } from '../../Common/Toolkit/HtmlTableColumn';
import { IHtmlTableColumnByXpath } from '../../Common/Toolkit/HtmlTableColumnByXpath';
import { ISetting } from '../../Common/Toolkit/Setting';
import { IUrl } from '../../Common/Toolkit/Url';

export class TeamPlayerTable implements IExtendWebElement {
  private readonly url: IUrl;
  private readonly table: IHtmlTable;
  private readonly strengthColumn: IHtmlTableColumnByXpath;
  private readonly teamTableSettings: ISetting<ITeamTableSetting>;
  private readonly strengthLevels: IStrengthLevels;
  private readonly log: IEasyLogger;
  private readonly ressourceTableHeaderAwpDiff: IRessource;
  private readonly ressourceTableHeaderNextStrength: IRessource;

  constructor(
    targetUrl: IUrl,
    table: IHtmlTable,
    strengthColumn: IHtmlTableColumnByXpath,
    strengthLevels: IStrengthLevels,
    teamTableSettings: ISetting<ITeamTableSetting>,
    log: IEasyLogger
  ) {
    this.url = targetUrl;
    this.table = table;
    this.strengthColumn = strengthColumn;
    this.teamTableSettings = teamTableSettings;
    this.strengthLevels = strengthLevels
    this.log = log;
    this.ressourceTableHeaderAwpDiff = new RessourceCommonTableExtensionsHeaderAwpDiff();
    this.ressourceTableHeaderNextStrength = new RessourceCommonTableExtensionsHeaderNextStrength();
  }

  public targetUrl(): IUrl {
    return this.url;
  }
  public extend(): void {
    this.log.info("start extension");
    this.teamTableSettings
      .value()
      .then(setting => {
        let extendStrength = setting.extendStrengthColumnActivated();
        let addAwpDiff = setting.addAwpDiffColumnActivated();
        let addNextStrength = setting.addNextStrengthColumnActivated();

        if (extendStrength || addAwpDiff || addNextStrength) {
          this.strengthLevels
            .strengthLevels()
            .then((strengthLevels: IStrengthLevel[]) => {
              let columnNumber = 15;
              let colspanNumber = columnNumber;

              if (addAwpDiff) this.addAwpDiffColumn(strengthLevels, columnNumber++);
              if (addNextStrength) this.addNextStrengthColumn(strengthLevels, columnNumber++);
              if (extendStrength) this.extendStrengthColumn(strengthLevels);

              this.table.tableHeader().rows[0].cells[this.strengthColumn.index().valueOf()].style.width = "70px";
              this.increaseStyleWidth(90);
              this.increaseColspanInFooter(this.table.tableFooter(), 1, columnNumber - colspanNumber);
            });
        }
      })
      .catch(e => { throw new Error(`"Error while extending team player table: ${e}. ${e.stack}"`); });
  }

  private addNextStrengthColumn(strengthLevels: IStrengthLevel[], columnNumber: Number) {
    this.table.addColumn(
      new HtmlTableColumn(
        this.header(this.ressourceTableHeaderNextStrength.value()),
        strengthLevels.map(sl => this.element(`${sl.nextStrengthValue()}`)),
        columnNumber));
  }
  private addAwpDiffColumn(strengthLevels: IStrengthLevel[], columnNumber: Number) {
    this.table.addColumn(
      new HtmlTableColumn(
        this.header(this.ressourceTableHeaderAwpDiff.value()),
        strengthLevels.map(sl => this.element(`${sl.missingAwpsToNextStrengthValue()}`)),
        columnNumber));
  }
  private header(headerText: String): IHtmlElementWithChilds {
    return new HtmlElementWithChilds(
      new Array<IHtmlAttribute>(
        new HtmlAttribute("class", "textCenter"),
        new HtmlAttribute("style", "width:90px"),
        new HtmlAttribute("role", "columnheader")),
      new Array<HTMLElement>(
        new HtmlElement(
          "span",
          new Array<IHtmlAttribute>(
            new HtmlAttribute("style", "color:#04143e;"),
            new HtmlAttribute("class", "bold")),
          headerText).element()));
  }
  private extendStrengthColumn(strengthLevels: IStrengthLevel[]) {
    this.table.extendColumn(
      this.strengthColumn,
      strengthLevels
        .map(sl =>
          sl.actualStrengthValue().valueOf() !== sl.currentStrengthValue().valueOf()
            ? ` (${sl.actualStrengthValue()})` : ""));
  }
  /* Dependent on the inserted content by this add-on the width of the header of
   * the team table must extended.
   * --> the name of the CSS rule is hard coded: '.pageWrapper'
   */
  private increaseStyleWidth(addWidth: Number) {
    let i, j;
    // iterate through all external style sheets
    for (i = 0; i < window.document.styleSheets.length; i++) {
      // get current style sheet - cross browser safe
      let sheet = <CSSStyleSheet>document.styleSheets[i];
      // iterate through all rules
      for (j = 0; j < sheet.cssRules.length; j++) {
        if (sheet.cssRules[j].type === CSSRule.STYLE_RULE) {
          let currentRule = <CSSStyleRule>sheet.cssRules[j];
          if (currentRule.selectorText.toLowerCase() === '.pagewrapper') {
            let width = currentRule.style.width;
            if (width !== null) {
              var iCurrentRuleWidth = Number(width.replace(/\D+/g, ''));
              iCurrentRuleWidth += addWidth.valueOf();
              currentRule.style.width = `${iCurrentRuleWidth}px`;
            }
          }
        }
      }
    }
  }
  private increaseColspanInFooter(footer: HTMLTableSectionElement, cell: Number, addColspan: Number) {
    let footerCell = footer.rows[0].cells[cell.valueOf()];
    var currentColspan = footerCell.getAttribute("colspan");
    if (currentColspan !== null) {
      var increasedColspan = new Number(currentColspan).valueOf() + addColspan.valueOf();
      footerCell.setAttribute("colspan", increasedColspan.toString());
    }
  }
  private element(content: String) {
    let newElement = new HtmlElement(
      "span",
      new Array<IHtmlAttribute>(
        new HtmlAttribute("class", "teamColorGreen bold")),
      "")
      .element();
    newElement
      .appendChild(new HtmlElement(
        "span",
        new Array<IHtmlAttribute>(
          new HtmlAttribute("style", "padding-right:5px;")),
        content)
        .element());
    let tdEle = new HtmlElementWithChilds(
      new Array<IHtmlAttribute>(
        new HtmlAttribute("class", "textRight table-middle greenDarker")),
      new Array<HTMLElement>(newElement));
    return tdEle;
  }
}
