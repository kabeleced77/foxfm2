import { IXPathHtmlTableCell } from "./XPathHtmlTableCell";

export interface IHtmlTableColumnByXpath {
  index(): Number;
  values(): HTMLTableDataCellElement[];
}

export class HtmlTableColumnByXpath implements IHtmlTableColumnByXpath {
  private columnXPath: IXPathHtmlTableCell;

  constructor(
    xPath: IXPathHtmlTableCell
  ) {
    this.columnXPath = xPath;
  }

  public index(): Number {
    return this.columnXPath.columnIndex();
  }
  public values(): HTMLTableDataCellElement[] {
    var valueArray = new Array<HTMLTableDataCellElement>(0);
    var teamTableBody = this.columnXPath.firstTableBody();
    var columnIndex = this.columnXPath.columnIndex().valueOf();

    for (var i = 0; i < teamTableBody.rows.length; i++) {
      var row = <HTMLTableRowElement>teamTableBody.rows[i];
      var value = row.cells[columnIndex];
      valueArray.push(value);
    }

    return valueArray;
  }
}
