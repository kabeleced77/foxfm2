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
  public fromJson(jsonString: String): IXPathString{
    return new XPathString(jsonString["xPathStringValue"]);
  }
}
