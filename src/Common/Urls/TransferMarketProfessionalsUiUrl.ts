import { IUrl } from "../Toolkit/Url"

export class TransferMarketProfessionalsUiUrl implements IUrl {
  private urlField: string;

  constructor() {
    this.urlField = "transfer/transfermarkt.php";
  }
  public url(): string {
    return this.urlField;
  }
  fromJson(jsonString: String): IUrl {
    return new TransferMarketProfessionalsUiUrl();
  }
}
