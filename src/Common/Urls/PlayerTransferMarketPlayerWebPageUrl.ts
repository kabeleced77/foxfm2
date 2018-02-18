import { IUrl } from "../Toolkit/Url"

export class PlayerTransferMarketPlayerWebPageUrl implements IUrl {
  private urlField: RegExp;

  constructor() {
    this.urlField = /\/player\/spieler_anbieten_small\.php\?spielerid=[0-9]*/;
  }

  public url(): RegExp {
    return this.urlField;
  }
  public fromJson(jsonString: String): IUrl {
    return new PlayerTransferMarketPlayerWebPageUrl();
  }
}
