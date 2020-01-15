import { IUrl } from "../Toolkit/Url"

export class DailyLoginBonusWebPageUrl implements IUrl {
  private urlField: RegExp;

  constructor() {
    this.urlField = /\/office\/buero\.php\?spannend=0/
  }
  public url(): RegExp {
    return this.urlField;
  }
  public fromJson(jsonString: String): IUrl {
    return new DailyLoginBonusWebPageUrl();
  }
}
