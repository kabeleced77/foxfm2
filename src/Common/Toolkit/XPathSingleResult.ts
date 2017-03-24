import { IXPathAllResults } from './XPathAllResults'
import { XPathAllResults } from './XPathAllResults'

export interface IXPathSingleResult<T> {
  xPath(): String;
  element(): T;
}

export class XPathSingleResult<T extends Node> implements IXPathSingleResult<T> {
  private xPathAllResults: IXPathAllResults;

  constructor(xPathAllResults: IXPathAllResults) {
    this.xPathAllResults = xPathAllResults;
  }

  public xPath(): String {
    return this.xPathAllResults.xPath();
  }

  public element(): T {
    this.xPathAllResults.xPathAllResults();
    if (this.xPathAllResults.xPathNumberOfResults() === 1) {
      return <T>this.xPathAllResults.xPathFirstResult();
    }
    else {
      var error = `XPath provided more than a single result: ${this.xPathAllResults.xPath()} -> ${this.xPathAllResults.xPathNumberOfResults()}`;
      console.error(error);
      throw error;
    }
  }
}
