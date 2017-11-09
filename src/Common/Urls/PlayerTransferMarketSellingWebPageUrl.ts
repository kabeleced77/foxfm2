import { IUrl } from "../Toolkit/Url"

export class PlayerTransferMarketSellingWebPageUrl implements IUrl {
  private urlField: String;

  constructor() {
    this.urlField = "player/spieler_anbieten_small.php";
  }
  public url(): String {
    return this.urlField;
  }
  public fromJson(jsonString: String): IUrl {
    return new PlayerTransferMarketSellingWebPageUrl();
  }
}
