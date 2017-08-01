import { ITable } from "./Table";
import { IHtmlTableColumn } from "./HtmlTableColumn";
import { IHtmlElement } from "./HtmlElement";
import { IHtmlTableColumnAsync } from "./HtmlTableColumnAsync";
import { IHtmlTableColumnByXpath } from "./HtmlTableColumnByXpath";

export interface IHtmlTable {
  table(): HTMLTableElement;
  tableHeader(): HTMLTableSectionElement;
  tableFooter(): HTMLTableSectionElement;
  firstTableColumnGroup(): HTMLTableColElement;
  firstTableBody(): HTMLTableSectionElement;
  addColumn(column: IHtmlTableColumn): IHtmlTable;
  addColumnAsync(column: IHtmlTableColumnAsync): Promise<IHtmlTable>;
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
    return this.addColumntToTable(column);
  }

  public addColumnAsync(column: IHtmlTableColumnAsync): Promise<IHtmlTable> {
    return column
      .column()
      .then(column => {
        return this.addColumntToTable(column);
      })
      .catch(e => {
        throw new Error(`Could not add column to table asynchronously: ${e}`);
      });
  }
  public extendColumn(column: IHtmlTableColumnByXpath, values: String[]) {
    //values.forEach((value, i) => this.firstTableBody().rows[i].cells[column.index().valueOf()].innerHTML += value);
    values.forEach((value, i) => this.extendInnerHtml(document, this.firstTableBody().rows[i].cells[column.index().valueOf()], value));
  }

  private addColumntToTable(column: IHtmlTableColumn): IHtmlTable {
    var table = new HtmlTable(this.htmlTable);
    // add header values
    let newCell = table.tableHeader().rows[0].insertCell(column.index().valueOf());
    newCell.className = "textCenter";
    newCell.appendChild(column.header().element());

    // add column values
    column
      .values()
      .elements()
      .forEach((element: IHtmlElement, i: number) => {
        let newCell = table.firstTableBody().rows[i].insertCell(column.index().valueOf());
        newCell.appendChild(element.element());
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
