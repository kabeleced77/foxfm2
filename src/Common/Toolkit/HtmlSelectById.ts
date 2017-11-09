import { IDom } from "./Dom";
import { ISelect } from "./Select";

export class HtmlSelectById implements ISelect<HTMLSelectElement> {
  private doc: IDom;
  private id: String;

  constructor(doc: IDom, id: String) {
    this.doc = doc;
    this.id = id;
  }

  public select(): HTMLSelectElement {
    return <HTMLSelectElement>this.doc.dom().getElementById(this.id.toString());
  }
}
