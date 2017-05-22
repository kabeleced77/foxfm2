import { IUrl } from "./Toolkit/Url"

export class TransferMarketAmateurWebPageUrl implements IUrl {
  private urlField: String;

  constructor() {
    this.urlField = "transfer/amas.php";
  }
  public url(): String {
    return this.urlField;
  }
  public fromJson(jsonString: String): IUrl {
    return new TransferMarketAmateurWebPageUrl();
  }
}
