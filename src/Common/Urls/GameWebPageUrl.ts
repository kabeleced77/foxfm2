import { IUrl } from "../Toolkit/Url"

export class GameWebPageUrl implements IUrl {
  private urlField: RegExp;

  constructor() {
    this.urlField = /\/game/;
  }
  public url(): RegExp {
    return this.urlField;
  }
  public fromJson(jsonString: String): IUrl {
    return new GameWebPageUrl();
  }
}
