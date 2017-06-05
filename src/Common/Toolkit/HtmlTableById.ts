import { ITable } from "./Table";
import { IDom } from "./Dom";

export class HtmlTableById implements ITable<HTMLTableElement> {
  private doc: IDom;
  private id: String;

  constructor(doc: IDom, id: String) {
    this.doc = doc;
    this.id = id;
  }

  public table(): HTMLTableElement {
    return <HTMLTableElement>this.doc.dom().getElementById(this.id.toString());
  }
}
