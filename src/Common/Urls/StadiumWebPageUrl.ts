import { IUrl } from "../Toolkit/Url"

export class StadiumWebPageUrl implements IUrl {
  private urlField: String;

  constructor() {
    this.urlField = "stadium/stadium.php";
  }
  public url(): String {
    return this.urlField;
  }
  fromJson(jsonString: String): IUrl {
    return new StadiumWebPageUrl();
  }
}
