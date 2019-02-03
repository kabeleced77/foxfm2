import { IXPathSingleResult } from './XPathSingleResult';
import { FirstElementInXPathNodeOrParents } from './FirstElementInXPathNodeOrParents';

export interface IXPathHtmlTableCell {
  table(): HTMLTableElement;
  tableCell(): HTMLTableCellElement;
  firstTableBody(): HTMLTableSectionElement;
  rowIndex(): Number;
  columnIndex(): Number;
}

export class XPathHtmlTableCell implements IXPathHtmlTableCell {
  private cell: IXPathSingleResult<HTMLTableCellElement>;

  constructor(tableCell: IXPathSingleResult<HTMLTableCellElement>) {
    this.cell = tableCell;
  }

  public tableCell(): HTMLTableCellElement {
    return this.cell.element();
  }
  public table(): HTMLTableElement {
    let table = new FirstElementInXPathNodeOrParents<HTMLTableCellElement, HTMLTableElement>(this.cell, "table");
    return table.element();
  }
  public firstTableBody(): HTMLTableSectionElement {
    let firstBody: HTMLTableSectionElement;
    const tableBodies = this.table().tBodies;

    if (tableBodies.length > 0) {
      firstBody = tableBodies.item(0)!;
    }
    else {
      firstBody = this.table().createTBody();
    }

    return firstBody;
  }
  public columnIndex(): Number {
    return this.tableCell().cellIndex;
  }
  public rowIndex(): Number {
    var row = <HTMLTableRowElement>this.tableCell().parentNode;
    return row.rowIndex;
  }
}
