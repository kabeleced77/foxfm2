import { IXPathFirstResult } from "./IXPathFirstResult";

export class XPathFirstResult<T extends Node> implements IXPathFirstResult<T> {
  private firstResult: Node;

  constructor(
    private readonly doc: Document,
    private readonly xPathStringValue: String
  ) { }

  public xPathString(): String {
    return this.xPathStringValue;
  }
  public node(): T {
    if (!this.firstResult) {
      const firstNode = this
        .doc
        .evaluate(
          this.xPathString().toString(),
          this.doc.documentElement,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null)
        .singleNodeValue;
      if (firstNode) {
        this.firstResult = firstNode;
      } else {
        throw new Error(`No result for XPath '${this.xPathString()}'.`);
      }
    }
    return <T>this.firstResult;
  }
}
