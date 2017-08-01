import { IXPathHtmlTableCell2 } from "./Toolkit/XPathHtmlTableCell"
import { NumberHelper } from "../Common/Toolkit/NumberHelper"
import { IStrengthsLimits } from "./StrengthsLimits";
import { AwpByEpTp } from "./Toolkit/Awp";

export interface IExperienceAndTrainingColumn {
  xPathExperienceAndTrainingColumn(): IXPathHtmlTableCell2;
  xPathStrengthColumn(): IXPathHtmlTableCell2;
  additionalInformationActivated(): Boolean;
  activateAdditionalInformation(status: Boolean): void;
  addAdditionalInformation(doc: Document, strengthsLimits: IStrengthsLimits): void;
  fromJson(jsonString: String): IExperienceAndTrainingColumn;
}

export class ExperienceAndTrainingColumn implements IExperienceAndTrainingColumn {
  private xPathToExperienceAndTrainingColumn: IXPathHtmlTableCell2;
  private xPathToStrengthColumn: IXPathHtmlTableCell2;
  private additionalInformationStatus: Boolean;

  constructor(
    xPathExperienceAndTrainingColumn: IXPathHtmlTableCell2,
    xPathStrengthColumn: IXPathHtmlTableCell2,
    additionalInformationStatus: Boolean
  ) {
    this.xPathToExperienceAndTrainingColumn = xPathExperienceAndTrainingColumn;
    this.xPathToStrengthColumn = xPathStrengthColumn;
    this.additionalInformationStatus = additionalInformationStatus;
  }

  public xPathExperienceAndTrainingColumn(): IXPathHtmlTableCell2 {
    return this.xPathToExperienceAndTrainingColumn;
  }
  public xPathStrengthColumn(): IXPathHtmlTableCell2 {
    return this.xPathToStrengthColumn;
  }
  public additionalInformationActivated(): Boolean {
    return this.additionalInformationStatus;
  }
  public activateAdditionalInformation(status: Boolean): void {
    this.additionalInformationStatus = status;
  }
  public addAdditionalInformation(doc: Document, strengthsLimits: IStrengthsLimits): void {
    if (this.additionalInformationActivated()) {
      var teamTableBody = this.xPathExperienceAndTrainingColumn().firstTableBody(doc);
      var expAndTrainingColumnIndex = this.xPathToExperienceAndTrainingColumn.columnIndex(doc).valueOf();
      var strengthColumnIndex = this.xPathToStrengthColumn.columnIndex(doc).valueOf();
      var adjustWidthStrengthColumn = false;

      var headerRow = <HTMLTableRowElement>teamTableBody.rows[0];
      this.extendInnerHtml(doc, headerRow.cells[expAndTrainingColumnIndex].lastElementChild, ` / AWP Diff.`);
      for (var i = 1; i < teamTableBody.rows.length; i++) {
        var row = <HTMLTableRowElement>teamTableBody.rows[i];
        var expAndTrainingPoints = row.cells[expAndTrainingColumnIndex].innerHTML.split("/");
        var expPoints = NumberHelper.getNumberFromString(expAndTrainingPoints[0].trim());
        var trainingPoints = NumberHelper.getNumberFromString(expAndTrainingPoints[1].trim());
        var awp = new AwpByEpTp(expPoints, trainingPoints);
        var awpPoints = awp.awpPoints().valueOf();
        var actualStrengthLevel = strengthsLimits.strengthLimitsByAwp(awpPoints).value().valueOf();
        var currentStrengthLevel = NumberHelper.getNumberFromNode(row.cells[strengthColumnIndex]);
        var awpsNextStrength = strengthsLimits.strengthLimits(actualStrengthLevel + 1).awpPoints().valueOf();

        this.extendInnerHtml(doc, row.cells[expAndTrainingColumnIndex], ` | ${awpPoints - awpsNextStrength}`);
        if (actualStrengthLevel !== currentStrengthLevel) {
          this.extendInnerHtml(doc, row.cells[strengthColumnIndex], ` (${actualStrengthLevel})`);
          adjustWidthStrengthColumn = true;
        }
      }

      this.adjustWidth(this.xPathExperienceAndTrainingColumn().tableCell(doc), "160px");
      if (adjustWidthStrengthColumn) this.adjustWidth(this.xPathStrengthColumn().tableCell(doc), "60px");
      this.increaseWidthAttribute(this.xPathExperienceAndTrainingColumn().table(doc), 100);
      this.increaseWidthStyle(<HTMLTableElement>this.xPathExperienceAndTrainingColumn().table(doc).previousElementSibling, 100);
    }
  }
  public fromJson(jsonString: String): IExperienceAndTrainingColumn {
    return new ExperienceAndTrainingColumn(
      this.xPathToExperienceAndTrainingColumn.fromJson(jsonString["xPathToExperienceAndTrainingColumn"]),
      this.xPathToStrengthColumn.fromJson(jsonString["xPathToStrengthColumn"]),
      jsonString["additionalInformationStatus"]
    );
  }

  private adjustWidth(tableCell: HTMLTableCellElement, width: String) {
    tableCell.style.width = width.toString();
  }
  private increaseWidthAttribute(table: HTMLTableElement, width: Number) {
    var tableWidth = NumberHelper.getNumberFromString(table.getAttribute("width"));
    tableWidth = tableWidth.valueOf() + 100;
    table.setAttribute("width", tableWidth.toString());
  }
  private increaseWidthStyle(table: HTMLTableElement, width: Number) {
    var tableWidth = NumberHelper.getNumberFromString(table.style.width);
    tableWidth = tableWidth.valueOf() + 100;
    table.style.width = `${tableWidth}px`;
  }
  private extendInnerHtml(doc: Document, element: Element | null, suffix: String): void {
    if (element 
      && element.nodeType === 1
      && element.hasChildNodes()
      && this.allNodesOfType(element.childNodes, document.TEXT_NODE)
      && element.firstChild !== null) {
      var textNode = doc.createTextNode(element.innerHTML + suffix);
      element.replaceChild(textNode, element.firstChild);
    } else if (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        this.extendInnerHtml(doc, <Element>element.childNodes[i], suffix);
      }
    }
  }
  private allNodesOfType(nodes: NodeList, type: Number): Boolean {
    var result = true;
    for (var i = 0; i < nodes.length; i++) {
      result = result && nodes[i].nodeType === type;
      if (!result) return false;
    }
    return result;
  }
}
