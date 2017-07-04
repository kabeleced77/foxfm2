import { IXPathHtmlTableCell2 } from "./Toolkit/XPathHtmlTableCell"
import { NumberHelper } from "../Common/Toolkit/NumberHelper"
import { IStrengthLevels } from "./StrengthLevels";

export interface IAwpAndStrengthColumns {
  xPathAwpColumn(): IXPathHtmlTableCell2;
  xPathStrengthColumn(): IXPathHtmlTableCell2;
  additionalInformationActivated(): Boolean;
  activateAdditionalInformation(status: Boolean): void;
  addAdditionalInformation(doc: Document, strengthLevels: IStrengthLevels): void;
  fromJson(jsonString: String): AwpAndStrengthColumns;
}

export class AwpAndStrengthColumns implements IAwpAndStrengthColumns {
  private xPathToAwpColumn: IXPathHtmlTableCell2;
  private xPathToStrengthColumn: IXPathHtmlTableCell2;
  private additionalInformationStatus: Boolean;

  constructor(
    xPathAwpColumn: IXPathHtmlTableCell2,
    xPathStrengthColumn: IXPathHtmlTableCell2,
    additionalInformationStatus: Boolean
  ) {
    this.xPathToAwpColumn = xPathAwpColumn;
    this.xPathToStrengthColumn = xPathStrengthColumn;
    this.additionalInformationStatus = additionalInformationStatus;
  }

  public xPathAwpColumn(): IXPathHtmlTableCell2 {
    return this.xPathToAwpColumn;
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
  public addAdditionalInformation(doc: Document, strengthLevels: IStrengthLevels): void {
    if (this.additionalInformationActivated()) {
      var teamTableBody = this.xPathAwpColumn().firstTableBody(doc);
      var awpColumnIndex = this.xPathToAwpColumn.columnIndex(doc).valueOf();
      var strengthColumnIndex = this.xPathToStrengthColumn.columnIndex(doc).valueOf();

      for (var i = 0; i < teamTableBody.rows.length; i++) {
        var row = <HTMLTableRowElement>teamTableBody.rows[i];
        var awpPoints = NumberHelper.getNumberFromNode(row.cells[awpColumnIndex]);
        var actualStrengthLevel = strengthLevels.strengthLevelByAwp(awpPoints).level().valueOf();
        var currentStrengthLevel = NumberHelper.getNumberFromNode(row.cells[strengthColumnIndex]);
        var awpsNextStrength = strengthLevels.strengthLevel(actualStrengthLevel + 1).awpPoints().valueOf();

        this.xPathAwpColumn().tableCell(doc).style.width = "120px";
        this.extendInnerHtml(doc, row.cells[awpColumnIndex], ` | ${awpPoints - awpsNextStrength}`);
        if (actualStrengthLevel !== currentStrengthLevel) {
          this.xPathStrengthColumn().tableCell(doc).style.width = "70px";
          this.extendInnerHtml(doc, row.cells[strengthColumnIndex], ` (${actualStrengthLevel})`);
        }
      }
    }
  }
  public fromJson(jsonString: String): AwpAndStrengthColumns {
    return new AwpAndStrengthColumns(
      this.xPathToAwpColumn.fromJson(jsonString["xPathToAwpColumn"]),
      this.xPathToStrengthColumn.fromJson(jsonString["xPathToStrengthColumn"]),
      jsonString["additionalInformationStatus"]
    );
  }

  private extendInnerHtml(doc: Document, element: Element, suffix: String): void {
    if (element.nodeType === 1
      && element.hasChildNodes()
      && this.allNodesOfType(element.childNodes, document.TEXT_NODE)
      && element.firstChild !== null) {
      var textNode = doc.createTextNode(element.innerHTML + suffix);
      element.replaceChild(textNode, element.firstChild);
    } else {
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
