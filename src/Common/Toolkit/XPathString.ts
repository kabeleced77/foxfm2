import { IUrl } from "./Url"

export interface IXPathInformation {
  xPathString(): String;
  xPathUrl(): IUrl;
  fromJson(jsonString: String): IXPathInformation;
}

/**
 * Assumption creating this type: 
 *    A XPath string is only (really) predictable if applied on the document 
 *    where it has been "taken" from. As it seems inpractical to serialise 
 *    the entire DOM, the url of the correspondent DOM is saved. 
 */
export class XPathInformation implements IXPathInformation {
  private xPathUrlValue: IUrl;
  private xPathStringValue: String;

  constructor(xPathUrl: IUrl, xPathString: String) {
    this.xPathUrlValue = xPathUrl;
    this.xPathStringValue = xPathString;
  }

  public xPathUrl(): IUrl {
    return this.xPathUrlValue;
  }
  public xPathString(): String {
    return this.xPathStringValue;
  }
  public fromJson(jsonString: String): IXPathInformation {
    return new XPathInformation(
      this.xPathUrlValue.fromJson(jsonString["xPathUrlValue"]),
      jsonString["xPathStringValue"]
    );
  }
}


export interface IXPathString {
  xPathString(): String;
  fromJson(jsonString: String): IXPathString;
}

export class XPathString implements IXPathString {
  private xPathStringValue: String;

  constructor(xPathString: String) {
    this.xPathStringValue = xPathString;
  }

  public xPathString(): String {
    return this.xPathStringValue;
  }
  public fromJson(jsonString: String): IXPathString {
    return new XPathString(jsonString["xPathStringValue"]);
  }
}
