import { IXPathAllResults } from './XPathAllResults';
import { IXPathString } from './XPathString';

export interface IXPathSingleResult<T> {
  element(): T;
  xPath(): IXPathString;
}

export class XPathSingleResult<T extends Node> implements IXPathSingleResult<T> {
  private xPathAllResults: IXPathAllResults;

  constructor(xPathAllResults: IXPathAllResults) {
    this.xPathAllResults = xPathAllResults;
  }

  public xPath(): IXPathString{
    return this.xPathAllResults.xPath();
  }

  public element(): T {
    if (this.xPathAllResults.xPathNumberOfResults() === 1) {
      return <T>this.xPathAllResults.xPathFirstResult();
    }
    else {
      throw new Error(`XPath provided no or more than a single result: ${this.xPathAllResults.xPath().xPathString()} -> ${this.xPathAllResults.xPathNumberOfResults()}`);
    }
  }
}
