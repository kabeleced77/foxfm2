import { IExistingColumn } from "./Toolkit/ExisitingColumn"
import { IXPathHtmlTableCell } from "./Toolkit/XPathHtmlTableCell";

export class ExperienceColumn implements IExistingColumn {
  private columnXPath: IXPathHtmlTableCell;

  constructor(
    xPath: IXPathHtmlTableCell
  ) {
    this.columnXPath = xPath;
  }

  public index(): Number {
    return this.columnXPath.columnIndex();
  }
}
