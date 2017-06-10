export interface IHtmlAttribute {
  name(): String;
  value(): String;
}

export class HtmlAttribute implements IHtmlAttribute {
  private attributeName: String;
  private attributeValue: String;

  constructor(name: String, value: String) {
    this.attributeName = name;
    this.attributeValue = value;
  }

  public name(): String {
    return this.attributeName;
  }
  public value(): String {
    return this.attributeValue;
  }
}
