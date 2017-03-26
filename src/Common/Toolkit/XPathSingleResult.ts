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
    if (this.xPathAllResults.xPathNumberOfResults() === 1) {
      return <T>this.xPathAllResults.xPathFirstResult();
    }
    else {
      throw `XPath provided no or more than a single result: ${this.xPathAllResults.xPath()} -> ${this.xPathAllResults.xPathNumberOfResults()}`;
    }
  }
}