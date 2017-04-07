import { IXPathString} from "./XPathString"

export interface IXPathAllResults {
  xPath(): IXPathString;
  xPathFirstResult(): Node;
  xPathAllResults(): XPathResult;
  xPathNumberOfResults(): Number;
}

// TODO: Caching the result might be an improvement. Currently the result is calculated for each method again.
export class XPathAllResults implements IXPathAllResults {
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
    return this.doc.evaluate(this.xPath().xPathString().toString(), this.doc.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  }
  public xPathFirstResult(): Node {
    var result = this.xPathAllResults();
    if (result && result.snapshotLength > 0) {
      return result.snapshotItem(0);
    } else {
      throw `No result for XPath '${this.xPath().xPathString()}'.`;
    }
  }
  public xPathNumberOfResults(): Number {
    return this.xPathAllResults().snapshotLength;
  }
}
