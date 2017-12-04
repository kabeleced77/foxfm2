import { IUrl } from "../Toolkit/Url"

export class TransferOfferWebPageUrl implements IUrl {
  private urlField: string;

  constructor() {
    this.urlField = "transfer/angebote.php";
  }
  public url(): string {
    return this.urlField;
  }
  fromJson(jsonString: String): IUrl {
    return new TransferOfferWebPageUrl();
  }
}
