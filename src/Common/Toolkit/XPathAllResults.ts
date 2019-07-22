import { IXPathString } from './XPathString';

export interface IXPathAllResults {
  xPath(): IXPathString;
  xPathFirstResult(): Node;
  xPathAllResults(): XPathResult;
  xPathNumberOfResults(): Number;
  allNodes(): Node[];
}

export class XPathAllResults implements IXPathAllResults {
  private allResults: XPathResult;
  private doc: Document;
  private xPathString: IXPathString;

  constructor(doc: Document, xPath: IXPathString) {
    this.doc = doc;
    this.xPathString = xPath;
  }

  public xPath(): IXPathString {
    return this.xPathString;
  }
  public xPathAllResults(): XPathResult {
    if (!this.allResults) {
      this.allResults = this.doc.evaluate(this.xPath().xPathString().toString(), this.doc.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    return this.allResults;
  }
  public xPathFirstResult(): Node {
    var result = this.xPathAllResults();
    if (result.snapshotLength > 0) {
      return result.snapshotItem(0)!;
    } else {
      throw new Error(`No result for XPath '${this.xPath().xPathString()}'.`);
    }
  }
  public allNodes(): Node[] {
    const cXPathResults = this.xPathAllResults();
    const iXPathResultsLength = cXPathResults.snapshotLength;
    const cNodes = new Array<Node>(iXPathResultsLength);
    for (let cIndex = 0; cIndex < iXPathResultsLength; cIndex++) {
      const node = cXPathResults.snapshotItem(cIndex);
      if (node) {
        cNodes.push(node)
      }
    }
    return cNodes;
  }
  public xPathNumberOfResults(): Number {
    return this.xPathAllResults().snapshotLength;
  }
}
