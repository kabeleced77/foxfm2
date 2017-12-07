export interface IUrl {
  url(): string | RegExp;
  // TODO: is method 'fromJson()' required at all?
  fromJson(jsonString: String): IUrl;
}

export class Url implements IUrl {
  private urlString: string | RegExp;

  constructor(url: string | RegExp) {
    this.urlString = url;
  }

  public url(): string | RegExp {
    return this.urlString;
  }
  public fromJson(jsonString: String): IUrl {
    return new Url(jsonString["urlString"]);
  }
}
