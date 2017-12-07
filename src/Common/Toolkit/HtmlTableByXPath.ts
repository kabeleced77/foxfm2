import { ITable } from "./Table";
import { IXPathString } from "./XPathString";
import { IDom } from "./Dom";
import { IFirstElementInXPathNodeOrParents } from "./FirstElementInXPathNodeOrParents";

export class HtmlTableByXPath<T> implements ITable<HTMLTableElement> {
  private xPath: IFirstElementInXPathNodeOrParents<T, HTMLTableElement>;

  constructor(
    xpath: IFirstElementInXPathNodeOrParents<T, HTMLTableElement>
  ) {
    this.xPath = xpath;
  }

  public table(): HTMLTableElement {
    return this.xPath.element();
  }
}
