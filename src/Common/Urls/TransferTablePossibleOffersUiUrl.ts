import { IUrl } from "../Toolkit/Url"

export class TransferTablePossibleOffersUiUrl implements IUrl {
  private urlField: String;

  constructor() {
    this.urlField = "transfer/angebote.php";
  }
  public url(): String {
    return this.urlField;
  }
  fromJson(jsonString: String): IUrl {
    return new TransferTablePossibleOffersUiUrl();
  }
}
