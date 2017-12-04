import { IUrl } from "../Toolkit/Url"

export class StadiumWebPageUrl implements IUrl {
  private urlField: string;

  constructor() {
    this.urlField = "stadium/stadium.php";
  }
  public url(): string {
    return this.urlField;
  }
  fromJson(jsonString: String): IUrl {
    return new StadiumWebPageUrl();
  }
}
