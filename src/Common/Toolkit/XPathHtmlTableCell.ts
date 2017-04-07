import { IXPathSingleResult } from '../Toolkit/XPathSingleResult'

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
    return <HTMLTableElement>this.get1stOccurenceOfNode(this.tableCell(), "table");
  }

  public firstTableBody():HTMLTableSectionElement {
    return this.table().tBodies.item(0);
  }

  public columnIndex(): Number {
    return this.tableCell().cellIndex;
  }

  public rowIndex(): Number {
    var row = <HTMLTableRowElement>this.tableCell().parentNode;
    return row.rowIndex;
  }

  public column(): HTMLTableColElement{
    return this.table().cols[this.columnIndex().valueOf()];
  }

  private get1stOccurenceOfNode(node: Node, parentTagName: String): Node {
    var parentNode: Node;
    try {
      if (node.nodeName.toUpperCase().match(parentTagName.toUpperCase())) {
        return node;
      }
      if (node && node.parentNode) {
        var parent = node.parentNode;
        do {
          if (parent.nodeName.toUpperCase() == parentTagName.toUpperCase()) {
            parentNode = parent;
          }
          if (parent.parentNode) {
            parent = parent.parentNode;
          } else {
            break;
          }
        } while (!parentNode);
      }
    } catch (e) {
      console.error(e);
    }
    return parentNode;
  }
}
