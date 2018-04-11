import { IUrl } from "../Toolkit/Url"

export class HeaderWebPageUrl implements IUrl {
  private urlField: RegExp;

  constructor() {
    this.urlField = /\/head-int/;
  }
  public url(): RegExp {
    return this.urlField;
  }
  public fromJson(jsonString: String): IUrl {
    return new HeaderWebPageUrl();
  }
}
