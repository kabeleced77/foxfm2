import { ITable } from "./Table";
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
