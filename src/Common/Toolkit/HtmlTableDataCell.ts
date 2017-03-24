import { IXPathSingleResult } from '../Toolkit/XPathSingleResult'

export interface IHtmlTableDataCell {
  table(): HTMLTableElement;
  dataCell(): HTMLTableDataCellElement;
  row(): Number;
  column(): Number;
}

export class HtmlTableDataCell implements IHtmlTableDataCell {
  private cell: IXPathSingleResult<HTMLTableDataCellElement>;

  constructor(dataCell: IXPathSingleResult<HTMLTableDataCellElement>) {
    this.cell = dataCell;
  }

  public dataCell(): HTMLTableDataCellElement {
    return this.cell.element();
  }

  public table(): HTMLTableElement {
    return <HTMLTableElement>this.get1stOccurenceOfNode(this.dataCell(), "table");
  }

  public row(): Number {
    return this.dataCell().cellIndex;
  }
  public column(): Number {
    var row = <HTMLTableRowElement>this.dataCell().parentNode;
    return row.rowIndex;
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
