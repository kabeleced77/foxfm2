import { IUrl } from "./Toolkit/Url"

export class TransferMarketAmateurUiUrl implements IUrl {
  private urlField: String;

  constructor() {
    this.urlField = "transfer/amas.php";
  }
  public url(): String {
    return this.urlField;
  }
  fromJson(jsonString: String): IUrl {
    return new TransferMarketAmateurUiUrl();
  }
}
