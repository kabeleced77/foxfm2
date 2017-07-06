import { IXPathSingleResult } from "./XPathSingleResult";

export interface IFirstElementInXPathNodeOrParents<T, R> {
  element(): R;
}

export class FirstElementInXPathNodeOrParents<T extends Node, R extends Node> implements IFirstElementInXPathNodeOrParents<T, R> {
  private xPathSingleResult: IXPathSingleResult<T>;
  private elementName: String;

  constructor(xpathSingleResult: IXPathSingleResult<T>, elementName: String) {
    this.xPathSingleResult = xpathSingleResult;
    this.elementName = elementName;
  }

  public element(): R {
    return <R>this.get1stOccurenceOfNode(this.xPathSingleResult.element(), this.elementName);
  }

  private get1stOccurenceOfNode(node: Node, parentTagName: String): Node | undefined {
    while (node) {
      if (parentTagName.toUpperCase().match(node.nodeName.toUpperCase())) {
        return node;
      }
      if (node.parentNode) {
        node = node.parentNode;
      } else {
        throw new Error(`Error: could not find any node by tag '${parentTagName}'.`);
      }
    }
  }
}
