import { IXPathSingleResult } from '../Toolkit/XPathSingleResult';
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
    return this.table().tBodies.item(0);
  }
  public columnIndex(): Number {
    return this.tableCell().cellIndex;
  }
  public rowIndex(): Number {
    var row = <HTMLTableRowElement>this.tableCell().parentNode;
    return row.rowIndex;
  }
}
