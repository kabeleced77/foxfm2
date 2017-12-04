import { IUrl } from "../Toolkit/Url"

export class TeamWebPageUrl implements IUrl {
  private urlField: string;

  constructor() {
    this.urlField = "team/players.php";
  }
  public url(): string {
    return this.urlField;
  }
  fromJson(jsonString: String): IUrl {
    return new TeamWebPageUrl();
  }
}
