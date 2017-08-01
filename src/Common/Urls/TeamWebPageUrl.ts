import { IUrl } from "../Toolkit/Url"

export class TeamWebPageUrl implements IUrl {
  private urlField: String;

  constructor() {
    this.urlField = "team/players.php";
  }
  public url(): String {
    return this.urlField;
  }
  fromJson(jsonString: String): IUrl {
    return new TeamWebPageUrl();
  }
}
