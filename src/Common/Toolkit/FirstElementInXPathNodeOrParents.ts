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

  private get1stOccurenceOfNode(node: T, parentTagName: String): Node {
    if (this.tagsMatches(node.nodeName, parentTagName)) {
      return node;
    }
    let parentNode = node.parentNode;
    while (parentNode !== null) {
      if (this.tagsMatches(parentNode.nodeName, parentTagName)) {
        return parentNode;
      }
      parentNode = parentNode.parentNode;
    }
  }
  private tagsMatches(tag1: String, tag2: String): Boolean {
    return tag1.toUpperCase().match(tag2.toUpperCase()) !== null;
  }
}
