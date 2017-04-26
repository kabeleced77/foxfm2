import { IUrl } from "./Toolkit/Url"

export class TransferMarketProfessionalsUiUrl implements IUrl {
  private urlField: String;

  constructor() {
    this.urlField = "transfer/transfermarkt.php";
  }
  public url(): String {
    return this.urlField;
  }
  fromJson(jsonString: String): IUrl {
    return new TransferMarketProfessionalsUiUrl();
  }
}
