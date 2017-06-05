import { ITable } from "./Table";
import { IXPathString } from "./XPathString";
import { IDom } from "./Dom";
import { IFirstElementInXPathNodeOrParents } from "./FirstElementInXPathNodeOrParents";

export class HtmlTableByXPath implements ITable<HTMLTableElement> {
  private xPath: IFirstElementInXPathNodeOrParents<HTMLTableElement>;

  constructor(xpath: IFirstElementInXPathNodeOrParents<HTMLTableElement>) {
    this.xPath = xpath;
  }

  public table(): HTMLTableElement {
    return this.xPath.element();
  }
}
