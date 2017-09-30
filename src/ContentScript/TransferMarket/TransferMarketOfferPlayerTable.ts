import { IWebElementToExtend } from "../../Common/Toolkit/WebElementToExtend";
import { ISetting } from "../../Common/Toolkit/Setting";
import { IEasyLogger } from "../../Common/Logger/EasyLogger";
import { IHtmlTable } from "../../Common/Toolkit/HtmlTable";
import { HtmlTableColumn } from "../../Common/Toolkit/HtmlTableColumn";
import { IHtmlTableColumnByXpath } from "../../Common/Toolkit/HtmlTableColumnByXpath";
import { IStrengthLevel } from "../../Common/StrengthLevel";
import { IStrengthLevels } from "../../Common/StrengthLevels";
import { HtmlTableColumnHeader } from "../../Common/Toolkit/HtmlTableColumnHeader";
import { HtmlElement, IHtmlElement } from "../../Common/Toolkit/HtmlElement";
import { IHtmlAttribute, HtmlAttribute } from "../../Common/Toolkit/HtmlAttribute";
import { ITeamTableSetting } from "../../Common/Settings/TeamTableSetting";
import { HtmlElementWithChilds } from "../../Common/Toolkit/HtmlElementWithChilds";
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
        let extendStrength = setting.extendStrengthColumnActivated();
        let addAwpDiff = setting.addAwpDiffColumnActivated();
        let addNextStrength = setting.addNextStrengthColumnActivated();

        if (extendStrength || addAwpDiff || addNextStrength) {
          this.strengthLevels
            .strengthLevels()
            .then((strengthLevels: IStrengthLevel[]) => {
              // add AWP diff column
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
                  5));
              // add next strength level column
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
                  6));
              // add actual strength value to existing strength value column
              this.table.extendColumn(
                this.strengthColumn,
                strengthLevels
                  .map(sl => sl.actualStrengthValue().valueOf() !== sl.currentStrengthValue().valueOf() ? ` (${sl.actualStrengthValue()})` : ""));
            });
        }
      })
      .catch(e => { throw new Error(`"Error while extending team player table: ${e}. ${e.stack}"`); });
  }
}
