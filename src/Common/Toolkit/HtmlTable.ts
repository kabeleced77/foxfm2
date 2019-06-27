import { IHtmlElement } from './HtmlElement';
import { HtmlElementWrapped } from './HtmlElementWrapped';
import { IHtmlTableColumn } from './HtmlTableColumn';
import { IHtmlTableColumnByXpath } from './HtmlTableColumnByXpath';
import { ITable } from './Table';

export interface IHtmlTable {
  table(): HTMLTableElement;
  tableHeaders(): IHtmlElement<HTMLTableSectionElement>[];
  tableFooters(): IHtmlElement<HTMLTableSectionElement>[];
  columnGroups(): HTMLCollectionOf<HTMLTableColElement>;
  tableBody(bodyIndex: Number): HTMLTableSectionElement;
  addColumn(column: IHtmlTableColumn): IHtmlTable;
  extendColumn(column: IHtmlTableColumnByXpath, values: String[]): void;
  /**
   * 
   * @param bodyIndex - index of the table body of the row
   * @param rowIndex - index of the row where to add a new cell
   * @param columnIndex - index of the new cell (column). Remark: this will create a new column in that row!
   * @param element - the new element added as the new cell before the given column index
   */
  addNewCellToBodyRow(
    bodyIndex: Number,
    rowIndex: Number,
    columnIndex: Number,
    element: IHtmlElement<HTMLTableCellElement>,
  ): void;
}

export class HtmlTable implements IHtmlTable {
  private htmlTable: ITable<HTMLTableElement>;

  constructor(table: ITable<HTMLTableElement>) {
    this.htmlTable = table;
  }

  public table(): HTMLTableElement {
    return this.htmlTable.table();
  }

  public tableHeaders(): IHtmlElement<HTMLTableSectionElement>[] {
    let tHeaders = new Array<IHtmlElement<HTMLTableSectionElement>>(0);
    let tHead = this.table().tHead;
    if (tHead !== null) {
      tHeaders.push(new HtmlElementWrapped<HTMLTableSectionElement>(tHead));
    }
    return tHeaders;
  }

  public columnGroups(): HTMLCollectionOf<HTMLTableColElement> {
    return this.table().getElementsByTagName("colgroup");
  }

  public tableBody(bodyIndex: Number): HTMLTableSectionElement {
    var tableBodies = this.table().tBodies;
    if (tableBodies.length > 0) {
      return <HTMLTableSectionElement>tableBodies[bodyIndex.valueOf()];
    }
    else {
      throw new Error(`HTML table has no table body.`);
    }
  }

  public tableFooters(): IHtmlElement<HTMLTableSectionElement>[] {
    let tFooters = new Array<IHtmlElement<HTMLTableSectionElement>>(0);
    let tFooter = this.table().tFoot;
    if (tFooter !== null) {
      tFooters.push(new HtmlElementWrapped<HTMLTableSectionElement>(tFooter));
    }
    return tFooters;
  }

  public addNewCellToBodyRow(
    bodyIndex: Number,
    rowIndex: Number,
    columnIndex: Number,
    content: IHtmlElement<HTMLTableCellElement>,
  ): void {

    const row = this.tableBody(bodyIndex).rows[rowIndex.valueOf()];
    row.insertBefore(content.element(), row.cells[columnIndex.valueOf()]);
  }

  public addColumn(column: IHtmlTableColumn): IHtmlTable {
    return this.addColumnToTable(column);
  }

  public extendColumn(column: IHtmlTableColumnByXpath, values: String[]) {
    values.forEach((value, i) => this.extendInnerHtml(document, this.tableBody(0).rows[i].cells[column.index().valueOf()], value));
  }

  private addColumnToTable(column: IHtmlTableColumn): IHtmlTable {
    var table = new HtmlTable(this.htmlTable);

    // add to colgroup
    let colgroup = this.columnGroups();
    if (colgroup.length > 0) {
      let newColgroupCell = window.document.createElement("col");
      colgroup[0].insertBefore(newColgroupCell, this.columnGroups()[0].children[column.index().valueOf()]);
    }
    // add header values
    let tHeads = this.tableHeaders();
    if (tHeads.length == 1) {
      tHeads[0].element().rows[0].insertBefore(column.header().element(), tHeads[0].element().rows[0].children[column.index().valueOf()]);
    }
    column.columnElements()
      .forEach((element, i) => {
        this.addNewCellToBodyRow(0, i, column.index(), element);
      });
    return table;
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
