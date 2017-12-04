import { IUrl } from "../Toolkit/Url"

export class TransferMarketAmateurWebPageUrl implements IUrl {
  private urlField: string;

  constructor() {
    this.urlField = "transfer/amas.php";
  }
  public url(): string {
    return this.urlField;
  }
  public fromJson(jsonString: String): IUrl {
    return new TransferMarketAmateurWebPageUrl();
  }
}
