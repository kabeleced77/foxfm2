import { IWebElementToExtend } from "./Toolkit/WebElementToExtend";
import { ISetting } from "./Toolkit/Setting";
import { IEasyLogger } from "./Logger/EasyLogger";
import { IHtmlTable } from "./Toolkit/HtmlTable";
import { HtmlTableColumn } from "./Toolkit/HtmlTableColumn";
import { IHtmlTableColumnByXpath } from "./Toolkit/HtmlTableColumnByXpath";
import { IStrengthLevel } from "./StrengthLevel";
import { IStrengthLevels } from "./StrengthLevels";
import { HtmlElement } from "./Toolkit/HtmlElement";
import { IHtmlAttribute, HtmlAttribute } from "./Toolkit/HtmlAttribute";
import { ITeamTableSetting } from "./Settings/TeamTableSetting";
import { HtmlElementWithChilds } from "./Toolkit/HtmlElementWithChilds";

export class TeamPlayerTable implements IWebElementToExtend {
  private readonly table: IHtmlTable;
  private readonly strengthColumn: IHtmlTableColumnByXpath;
  private readonly teamTableSettings: ITeamTableSetting;
  private readonly strengthLevels: IStrengthLevels;
  private readonly log: IEasyLogger;

  constructor(
    table: IHtmlTable,
    strengthColumn: IHtmlTableColumnByXpath,
    strengthLevels: IStrengthLevels,
    teamTableSettings: ITeamTableSetting,
    log: IEasyLogger
  ) {
    this.table = table;
    this.strengthColumn = strengthColumn;
    this.teamTableSettings = teamTableSettings;
    this.strengthLevels = strengthLevels
    this.log = log;
  }

  public extend(): void {
    this.log.info("start extension");
    this.teamTableSettings
      .setting()
      .then(setting => {
        let extendStrength = setting.extendStrengthColumnActivated();
        let addAwpDiff = setting.addAwpDiffColumnActivated();
        let addNextStrength = setting.addNextStrengthColumnActivated();

        if (extendStrength || addAwpDiff || addNextStrength) {
          this.strengthLevels
            .strengthLevels()
            .then((strengthLevels: IStrengthLevel[]) => {
              // add AWP diff column
              if (addAwpDiff) this.addAwpDiffColumn(strengthLevels);
              // add next strength level column
              if (addNextStrength) this.addNextStrengthColumn(strengthLevels);
              // add actual strength value to existing strength value column
              if (extendStrength) this.extendStrengthColumn(strengthLevels);

              this.table.tableHeader().rows[0].cells[this.strengthColumn.index().valueOf()].style.width = "70px";
              this.increaseStyleWidth(90);
              this.increaseColspanInFooter(this.table.tableFooter(), 1, 1);
            });
        }
      })
      .catch(e => { throw new Error(`"Error while extending team player table: ${e}. ${e.stack}"`); });
  }

  private addNextStrengthColumn(strengthLevels: IStrengthLevel[]) {
    this.table.addColumn(
      new HtmlTableColumn(
        new HtmlElementWithChilds(
          new Array<IHtmlAttribute>(
            new HtmlAttribute("class", "textCenter"),
            new HtmlAttribute("role", "columnheader"),
            new HtmlAttribute("style", "width: 80px")),
          new Array<HTMLElement>(
            new HtmlElement(
              "span",
              new Array<IHtmlAttribute>(
                new HtmlAttribute("style", "color:#04143e;"),
                new HtmlAttribute("class", "bold")),
              "Next St").element()
          )),
        strengthLevels
          .map(sl => {
            let newElement = new HtmlElement(
              "span",
              new Array<IHtmlAttribute>(
                new HtmlAttribute("class", "teamColorGreen bold")),
              "")
              .element();
            newElement.appendChild(new HtmlElement(
              "span",
              new Array<IHtmlAttribute>(
                new HtmlAttribute("style", "padding-right:5px;")),
              `${sl.nextStrengthValue()}`
            ).element());
            let tdEle = new HtmlElementWithChilds(
              new Array<IHtmlAttribute>(new HtmlAttribute("class", "textRight table-middle greenDarker")),
              new Array<HTMLElement>(newElement));
            return tdEle;
          }),
        16));
  }
  private addAwpDiffColumn(strengthLevels: IStrengthLevel[]) {
    this.table.addColumn(
      new HtmlTableColumn(
        new HtmlElementWithChilds(
          new Array<IHtmlAttribute>(
            new HtmlAttribute("class", "textCenter"),
            new HtmlAttribute("role", "columnheader"),
            new HtmlAttribute("style", "width: 90px")),
          new Array<HTMLElement>(
            new HtmlElement(
              "span",
              new Array<IHtmlAttribute>(
                new HtmlAttribute("style", "color:#04143e;"),
                new HtmlAttribute("class", "bold")),
              "AWPs Diff").element()
          )),
        strengthLevels
          .map(sl => {
            let newElement = new HtmlElement(
              "span",
              new Array<IHtmlAttribute>(
                new HtmlAttribute("class", "teamColorGreen bold")),
              "")
              .element();
            newElement.appendChild(new HtmlElement(
              "span",
              new Array<IHtmlAttribute>(
                new HtmlAttribute("style", "padding-right:5px;")),
              `${sl.missingAwpsToNextStrengthValue()}`
            ).element());
            let tdEle = new HtmlElementWithChilds(
              new Array<IHtmlAttribute>(new HtmlAttribute("class", "textRight table-middle greenDarker")),
              new Array<HTMLElement>(newElement));
            return tdEle;
          }),
        15));
  }
  private extendStrengthColumn(strengthLevels: IStrengthLevel[]) {
    this.table.extendColumn(
      this.strengthColumn,
      strengthLevels
        .map(sl => sl.actualStrengthValue().valueOf() !== sl.currentStrengthValue().valueOf() ? ` (${sl.actualStrengthValue()})` : ""));
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
          console.debug(`selector text: ${currentRule.selectorText}`);
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
    // extend 'colspan' in footer by the 3 added columns
    let footerCell = footer.rows[0].cells[cell.valueOf()];
    var currentColspan = footerCell.getAttribute("colspan");
    if (currentColspan !== null) {
      var increasedColspan = new Number(currentColspan).valueOf() + addColspan.valueOf();
      footerCell.setAttribute("colspan", increasedColspan.toString());
    }
  }
}
