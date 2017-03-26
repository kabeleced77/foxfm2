export interface IXPathAllResults {
  xPath(): String;
  xPathFirstResult(): Node;
  xPathAllResults(): XPathResult;
  xPathNumberOfResults(): Number;
}

// TODO: Caching the result might be an improvement. Currently the result is calculated for each method again.
export class XPathAllResults implements IXPathAllResults {
  private doc: Document;
  private xPathString: String;

  constructor(doc: Document, xPath: String) {
    this.doc = doc;
    this.xPathString = xPath;
  }

  public xPath(): String {
    return this.xPathString;
  }

  public xPathAllResults(): XPathResult {
    return this.doc.evaluate(this.xPathString.toString(), this.doc.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  }

  public xPathFirstResult(): Node {
    var result = this.xPathAllResults();
    if (result && result.snapshotLength > 0) {
      return result.snapshotItem(0);
    } else {
      throw `No result for XPath '${this.xPath()}'.`;
    }
  }

  public xPathNumberOfResults(): Number {
    return this.xPathAllResults().snapshotLength;
  }
}
