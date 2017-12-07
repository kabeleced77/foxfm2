import { IUrl } from "../Toolkit/Url"

export class PlayerInformationWebPageUrl implements IUrl {
  private urlField: RegExp;

  constructor() {
    this.urlField = /\/player\/[0-9]/;
  }
  public url(): RegExp {
    return this.urlField;
  }
  public fromJson(jsonString: String): IUrl {
    return new PlayerInformationWebPageUrl();
  }
}
