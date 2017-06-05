import { IXPathSingleResult } from "./XPathSingleResult";

export interface IFirstElementInXPathNodeOrParents<T> {
  element(): T;
}

export class FirstElementInXPathNodeOrParents<T extends Node> implements IFirstElementInXPathNodeOrParents<HTMLTableElement> {
  private xPathSingleResult: IXPathSingleResult<T>;
  private elementName: String;

  constructor(xpathSingleResult: IXPathSingleResult<T>, elementName: String) {
    this.xPathSingleResult = xpathSingleResult;
    this.elementName = elementName;
  }

  public element(): HTMLTableElement {
    return <HTMLTableElement>this.get1stOccurenceOfNode(this.xPathSingleResult.element(), this.elementName);
  }

  private get1stOccurenceOfNode(node: T, parentTagName: String): Node {
    var parentNode: Node;
    try {
      if (node.nodeName.toUpperCase().match(parentTagName.toUpperCase())) {
        return node;
      }
      if (node && node.parentNode) {
        var parent = node.parentNode;
        do {
          if (parent.nodeName.toUpperCase() == parentTagName.toUpperCase()) {
            parentNode = parent;
          }
          if (parent.parentNode) {
            parent = parent.parentNode;
          } else {
            break;
          }
        } while (!parentNode);
      }
    } catch (e) {
      new Error(`"Error finding the first element '${this.elementName}' in XPath node '${this.xPathSingleResult.xPath().xPathString}'."`);
    }
    return parentNode;
  }
}
