export interface IHtmlId {
  id(): String;
  fromJson(jsonString: String): IHtmlId;
}

export class HtmlId implements IHtmlId {
  private idString: String;

  constructor(id: String) {
    this.idString = id;
  }

  public id(): String {
    return this.idString;
  }
  public fromJson(jsonString: String): IHtmlId {
    return new HtmlId(jsonString["idString"]);
  }
}
