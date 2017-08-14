import { ITable } from "./Table";
import { IHtmlTableColumn } from "./HtmlTableColumn";
import { IHtmlTableColumnByXpath } from "./HtmlTableColumnByXpath";
import { IHtmlElementWithChilds } from "./HtmlElementWithChilds";

export interface IHtmlTable {
  table(): HTMLTableElement;
  tableHeader(): HTMLTableSectionElement;
  tableFooter(): HTMLTableSectionElement;
  firstTableColumnGroup(): HTMLTableColElement;
  firstTableBody(): HTMLTableSectionElement;
  addColumn(column: IHtmlTableColumn): IHtmlTable;
  extendColumn(column: IHtmlTableColumnByXpath, values: String[]): void;
}

export class HtmlTable implements IHtmlTable {
  private htmlTable: ITable<HTMLTableElement>;

  constructor(table: ITable<HTMLTableElement>) {
    this.htmlTable = table;
  }

  public table(): HTMLTableElement {
    return this.htmlTable.table();
  }

  public tableHeader(): HTMLTableSectionElement {
    return this.table().tHead;
  }

  public firstTableColumnGroup(): HTMLTableColElement {
    var colGroups = this.table().getElementsByTagName("colgroup");
    if (colGroups.length > 0) {
      return <HTMLTableColElement>colGroups[0];
    }
    else {
      throw new Error(`HTML table has no colgroup.`);
    }
  }

  public firstTableBody(): HTMLTableSectionElement {
    var tableBodies = this.table().tBodies;
    if (tableBodies.length > 0) {
      return <HTMLTableSectionElement>tableBodies[0];
    }
    else {
      throw new Error(`HTML table has no table body.`);
    }
  }

  public tableFooter(): HTMLTableSectionElement {
    return this.table().tFoot;
  }

  public addColumn(column: IHtmlTableColumn): IHtmlTable {
    return this.addColumnToTable(column);
  }

  public extendColumn(column: IHtmlTableColumnByXpath, values: String[]) {
    values.forEach((value, i) => this.extendInnerHtml(document, this.firstTableBody().rows[i].cells[column.index().valueOf()], value));
  }

  private addColumnToTable(column: IHtmlTableColumn): IHtmlTable {
    var table = new HtmlTable(this.htmlTable);
    // add to colgroup
    let newColgroupCell = window.document.createElement("col");
    this
      .firstTableColumnGroup()
      .insertBefore(newColgroupCell, this.firstTableColumnGroup().children[column.index().valueOf()]);
    // add header values
    let newCell = window.document.createElement("th");
    this.tableHeader().rows[0].insertBefore(newCell, this.tableHeader().rows[0].children[column.index().valueOf()]);
    column.header().attributes().forEach(a => newCell.setAttribute(a.name().toString(), a.value().toString()));
    column.header().childElements().forEach(e => newCell.appendChild(e));
    column.columnElements()
      .forEach((element: IHtmlElementWithChilds, i: number) => {
        let newCell = table.firstTableBody().rows[i].insertCell(column.index().valueOf());
        element.attributes().forEach(e => newCell.setAttribute(e.name().toString(), e.value().toString()));
        element.childElements().forEach(c => newCell.appendChild(c));
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
