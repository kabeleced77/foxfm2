export interface IUrl {
  url(): String;
  fromJson(jsonString: String): IUrl;
}

export class Url implements IUrl {
  private urlString: String;

  constructor(url: String) {
    this.urlString = url;
  }

  public url(): String {
    return this.urlString;
  }
  public fromJson(jsonString: String): IUrl {
    return new Url(jsonString["urlString"]);
  }
}
