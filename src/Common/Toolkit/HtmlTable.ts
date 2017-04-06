export interface IHtmlTable {
  table(): HTMLTableElement;
  tableHeader(): HTMLTableSectionElement;
  tableFooter(): HTMLTableSectionElement;
  firstTableColumnGroup(): HTMLTableColElement;
  firstTableBody(): HTMLTableSectionElement;
}

export class HtmlTable implements IHtmlTable {

  /* Properties */

  private doc: Document;
  private id: String;
  private htmlTable: HtmlTable;

  /* Constructors */

  constructor(doc: Document, id: String) {
    this.doc = doc;
    this.id = id;
  }

  /* Interface implementation */

  public table(): HTMLTableElement {
    return <HTMLTableElement>this.doc.getElementById(this.id.toString());
  }

  public tableHeader(): HTMLTableSectionElement {
    return this.table().tHead;
  }

  public firstTableColumnGroup(): HTMLTableColElement{
    var colGroups = this.table().getElementsByTagName("colgroup");
    if (colGroups.length > 0) {
      return <HTMLTableColElement>colGroups[0];
    }
    else {
      throw `HTML table has no colgroup.`;
    }
  }

  public firstTableBody(): HTMLTableSectionElement{
    var tableBodies = this.table().tBodies;
    if (tableBodies.length > 0) {
      return <HTMLTableSectionElement>tableBodies[0];
    }
    else {
      throw `HTML table has no table body.`;
    }
  }

  public tableFooter(): HTMLTableSectionElement{
    return this.table().tFoot;
  }

  /* Private methods */
}

