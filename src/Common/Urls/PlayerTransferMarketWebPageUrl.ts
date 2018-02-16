import { IUrl } from "../Toolkit/Url"

export class PlayerTransferMarketWebPageUrl implements IUrl {
  private urlField: string;

  constructor() {
    this.urlField = "player/spieler_anbieten_small.php";
  }
  public url(): string {
    return this.urlField;
  }
  public fromJson(jsonString: String): IUrl {
    return new PlayerTransferMarketWebPageUrl();
  }
}
