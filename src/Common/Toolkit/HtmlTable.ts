import { ITable } from "./Table";

export interface IHtmlTable {
  table(): HTMLTableElement;
  tableHeader(): HTMLTableSectionElement;
  tableFooter(): HTMLTableSectionElement;
  firstTableColumnGroup(): HTMLTableColElement;
  firstTableBody(): HTMLTableSectionElement;
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
}
