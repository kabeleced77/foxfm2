export interface IXPathAllResults {
  xPath(): String;
  xPathFirstResult(): Node;
  xPathAllResults(): XPathResult;
  xPathNumberOfResults(): Number;
}

export class XPathAllResults implements IXPathAllResults {
  private doc: Document;
  private xPathString: String;
  private xPathResult: XPathResult;
  private xPathResultLength: Number = 0;

  constructor(doc: Document, xPath: String) {
    this.doc = doc;
    this.xPathString = xPath;
  }

  public xPath(): String {
    return this.xPathString;
  }

  public xPathAllResults(): XPathResult {
    this.xPathResult = this.getXpathResult();
    return this.xPathResult;
  }

  public xPathFirstResult(): Node {
    return this.xPathResult.snapshotItem(0);
  }

  public xPathNumberOfResults(): Number {
    return this.xPathResultLength;
  }

  private getXpathResult(): XPathResult {
    try {
      var xPathResults = this.doc.evaluate(this.xPathString.toString(), this.doc.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      this.xPathResultLength = xPathResults.snapshotLength;
      return xPathResults;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
