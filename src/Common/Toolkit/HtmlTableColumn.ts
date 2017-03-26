export interface IHtmlTableColumn {
  columnId(): String;
  column(): HTMLTableColElement;
}

export class HtmlTableColumn implements IHtmlTableColumn {
  private doc: Document;
  private id: String;

  constructor (doc: Document, columnId: String){
    this.doc = doc;
    this.id = columnId;
  }

  public columnId(): String {
    return this.id;
  }

  // TODO: Is it a good idea to create each time a new element!?
  public column(): HTMLTableColElement{
    var newColumn = this.doc.createElement("col");
    newColumn.id = this.columnId().toString();
    return newColumn;
  }
}
