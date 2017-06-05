import { IXPathAllResults } from './XPathAllResults'
import { XPathAllResults, IXPathAllResults2, IXPathAllResults3 } from './XPathAllResults'
import { IXPathString } from "./XPathString";

export interface IXPathSingleResult2<T> {
  element(doc: Document): T;
  fromJson(jsonString: String): IXPathSingleResult2<T>;
}

export interface IXPathSingleResult<T> {
  element(): T;
  xPath(): IXPathString;
}

export class XPathSingleResult3<T extends Node> implements IXPathSingleResult2<T> {
  private xPathAllResults: IXPathAllResults3;

  constructor(xPathAllResults: IXPathAllResults3) {
    this.xPathAllResults = xPathAllResults;
  }

  public element(doc: Document): T {
    if (this.xPathAllResults.xPathNumberOfResults(doc) === 1) {
      return <T>this.xPathAllResults.xPathFirstResult(doc);
    }
    else {
      throw `XPath provided no or more than a single result: ${this.xPathAllResults.xPath().xPathString()} -> results: ${this.xPathAllResults.xPathNumberOfResults(doc)}`;
    }
  }
  public fromJson(jsonString: String): IXPathSingleResult2<T> {
    return new XPathSingleResult3<T>(
      this.xPathAllResults.fromJson(jsonString["xPathAllResults"])
    );
  }
}

export class XPathSingleResult2<T extends Node> implements IXPathSingleResult2<T> {
  private xPathAllResults: IXPathAllResults2;

  constructor(xPathAllResults: IXPathAllResults2) {
    this.xPathAllResults = xPathAllResults;
  }

  public element(doc: Document): T {
    if (this.xPathAllResults.xPathNumberOfResults(doc) === 1) {
      return <T>this.xPathAllResults.xPathFirstResult(doc);
    }
    else {
      throw `XPath provided no or more than a single result: ${this.xPathAllResults.xPath().xPathString()} -> results: ${this.xPathAllResults.xPathNumberOfResults(doc)}`;
    }
  }
  public fromJson(jsonString: String): IXPathSingleResult2<T> {
    return new XPathSingleResult2<T>(
      this.xPathAllResults.fromJson(jsonString["xPathAllResults"])
    );
  }
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
      throw `XPath provided no or more than a single result: ${this.xPathAllResults.xPath()} -> ${this.xPathAllResults.xPathNumberOfResults()}`;
    }
  }
}
