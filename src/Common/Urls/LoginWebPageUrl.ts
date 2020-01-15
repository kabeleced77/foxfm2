import { IUrl } from "../Toolkit/Url"

export class LoginWebPageUrl implements IUrl {
  private urlField: RegExp;

  constructor() {
    // match exactly the login page as given - no query strings of additional files
    this.urlField = /^https:\/\/www\.onlinefussballmanager\.de\/$/
  }
  public url(): RegExp {
    return this.urlField;
  }
  public fromJson(jsonString: String): IUrl {
    return new LoginWebPageUrl();
  }
}
