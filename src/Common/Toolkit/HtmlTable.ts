import { IHtmlElement } from './HtmlElement';
import { IHtmlElementWithChilds } from './HtmlElementWithChilds';
import { HtmlElementWrapped } from './HtmlElementWrapped';
import { IHtmlTableColumn } from './HtmlTableColumn';
import { IHtmlTableColumnByXpath } from './HtmlTableColumnByXpath';
import { ITable } from './Table';

export interface IHtmlTable {
  table(): HTMLTableElement;
  tableHeaders(): IHtmlElement<HTMLTableSectionElement>[];
  tableFooters(): IHtmlElement<HTMLTableSectionElement>[];
  columnGroups(): NodeListOf<HTMLTableColElement>;
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

  public tableHeaders(): IHtmlElement<HTMLTableSectionElement>[] {
    let tHeaders = new Array<IHtmlElement<HTMLTableSectionElement>>(0);
    let tHead = this.table().tHead;
    if (tHead !== null) {
      tHeaders.push(new HtmlElementWrapped<HTMLTableSectionElement>(tHead));
    }
    return tHeaders;
  }

  public columnGroups(): NodeListOf<HTMLTableColElement> {
    return this.table().getElementsByTagName("colgroup");
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

  public tableFooters(): IHtmlElement<HTMLTableSectionElement>[] {
    let tFooters = new Array<IHtmlElement<HTMLTableSectionElement>>(0);
    let tFooter = this.table().tFoot;
    if (tFooter !== null) {
      tFooters.push(new HtmlElementWrapped<HTMLTableSectionElement>(tFooter));
    }
    return tFooters;
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
    let colgroup = this.columnGroups();
    if (colgroup.length > 0) {
      let newColgroupCell = window.document.createElement("col");
      colgroup[0].insertBefore(newColgroupCell, this.columnGroups()[0].children[column.index().valueOf()]);
    }
    // add header values
    let tHeads = this.tableHeaders();
    if (tHeads.length == 1) {
      let newCell = window.document.createElement("th");
      tHeads[0].element().rows[0].insertBefore(newCell, tHeads[0].element().rows[0].children[column.index().valueOf()]);
      column.header().attributes().forEach(a => newCell.setAttribute(a.name().toString(), a.value().toString()));
      column.header().childElements().forEach(e => newCell.appendChild(e.element()));
    }
    column.columnElements()
      .forEach((element, i) => {
        let newCell = table.firstTableBody().rows[i].insertCell(column.index().valueOf());
        element.attributes().forEach(e => newCell.setAttribute(e.name().toString(), e.value().toString()));
        element.childElements().forEach(c => newCell.appendChild(c.element()));
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
