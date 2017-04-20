import { IXPathString, IXPathInformation } from "./XPathString"

export interface IXPathAllResults2 {
  xPath(): IXPathInformation;
  xPathAllResults(doc: Document): XPathResult;
  xPathFirstResult(doc: Document): Node;
  xPathNumberOfResults(doc: Document): Number;
  fromJson(jsonString: String): IXPathAllResults2;
}
export interface IXPathAllResults {
  xPath(): IXPathString;
  xPathFirstResult(): Node;
  xPathAllResults(): XPathResult;
  xPathNumberOfResults(): Number;
}

// TODO: Caching the result might be an improvement. Currently the result is calculated for each method again.
export class XPathAllResults2 implements IXPathAllResults2 {
  private xPathInformation: IXPathInformation;

  constructor(xPath: IXPathInformation) {
    this.xPathInformation = xPath;
  }

  public xPath(): IXPathInformation {
    return this.xPathInformation;
  }
  public xPathAllResults(doc: Document): XPathResult {
    var url = doc.location.href;
    if (url.match(this.xPath().xPathUrl().url().toString())) {
      return doc.evaluate(this.xPath().xPathString().toString(), doc.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    } else {
      throw new Error(`The URL '${url}' of the given document is not the same as of the XPath: ${this.xPath().xPathUrl().url()}. Will not look for any XPath results.`);
    }
  }
  public xPathFirstResult(doc: Document): Node {
    var result = this.xPathAllResults(doc);
    if (result && result.snapshotLength > 0) {
      return result.snapshotItem(0);
    } else {
      // TODO: exception might be to harsh. A type "NothingFound" of an interface like 'IXPathResult' might be an idea 
      // --> refactoring of this method required as it returns 'Node' 
      // ==> could be wrapped in IXPathResult
      throw `No result for XPath '${this.xPath().xPathString()}'.`;
    }
  }
  public xPathNumberOfResults(doc: Document): Number {
    return this.xPathAllResults(doc).snapshotLength;
  }
  public fromJson(jsonString: String): IXPathAllResults2 {
    return new XPathAllResults2(
      this.xPathInformation.fromJson(jsonString["xPathInformation"])
    );
  }
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
