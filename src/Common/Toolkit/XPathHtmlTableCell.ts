import { IXPathSingleResult, IXPathSingleResult2 } from '../Toolkit/XPathSingleResult'
import { FirstElementInXPathNodeOrParents } from "./FirstElementInXPathNodeOrParents";

export interface IXPathHtmlTableCell2 {
  table(doc: Document): HTMLTableElement;
  tableCell(doc: Document): HTMLTableCellElement;
  firstTableBody(doc: Document): HTMLTableSectionElement;
  rowIndex(doc: Document): Number;
  columnIndex(doc: Document): Number;
  column(doc: Document): HTMLTableColElement;
  fromJson(jsonString: String): IXPathHtmlTableCell2;
}

export class XPathHtmlTableCell2 implements IXPathHtmlTableCell2 {
  private cell: IXPathSingleResult2<HTMLTableCellElement>;

  constructor(tableCell: IXPathSingleResult2<HTMLTableCellElement>) {
    this.cell = tableCell;
  }

  public tableCell(doc: Document): HTMLTableCellElement {
    return this.cell.element(doc);
  }

  public table(doc: Document): HTMLTableElement {
    return <HTMLTableElement>this.get1stOccurenceOfNode(this.tableCell(doc), "table");
  }

  public firstTableBody(doc: Document): HTMLTableSectionElement {
    return this.table(doc).tBodies.item(0);
  }

  public columnIndex(doc: Document): Number {
    return this.tableCell(doc).cellIndex;
  }

  public rowIndex(doc: Document): Number {
    var row = <HTMLTableRowElement>this.tableCell(doc).parentNode;
    return row.rowIndex;
  }

  public column(doc: Document): HTMLTableColElement {
    return this.table(doc).cols[this.columnIndex(doc).valueOf()];
  }

  public fromJson(jsonString: String): IXPathHtmlTableCell2 {
    return new XPathHtmlTableCell2(
      this.cell.fromJson(jsonString["cell"])
    );
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
  public column(): HTMLTableColElement {
    return this.table().cols[this.columnIndex().valueOf()];
  }
}
