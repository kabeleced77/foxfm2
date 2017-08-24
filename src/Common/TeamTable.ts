import { IUrl } from "./Toolkit/Url"
import { IHtmlId } from "./Toolkit/HtmlId"

export interface ITeamTable {
  extendStrengthColumnActivated(): Boolean;
  addAwpDiffColumnActivated(): Boolean;
  addNextStrengthColumnActivated(): Boolean;
  fromJson(jsonString: String): ITeamTable;
}

export class TeamTable implements ITeamTable {
  private readonly extendStrengthColumn: Boolean;
  private readonly addAwpDiffColumn: Boolean;
  private readonly addNextStrengthColumn: Boolean;

  constructor(
    extendStrengthColumn: Boolean,
    addAwpDiffColumn: Boolean,
    addNextStrengthColumn: Boolean,
  ) {
    this.extendStrengthColumn = extendStrengthColumn;
    this.addAwpDiffColumn = addAwpDiffColumn;
    this.addNextStrengthColumn = addNextStrengthColumn;
  }

  public extendStrengthColumnActivated(): Boolean {
    return this.extendStrengthColumn;
  }
  public addAwpDiffColumnActivated(): Boolean {
    return this.addAwpDiffColumn;
  }
  public addNextStrengthColumnActivated(): Boolean {
    return this.addNextStrengthColumn;
  }
  public fromJson(jsonString: String): ITeamTable {
    return new TeamTable(
      jsonString["extendStrengthColumn"],
      jsonString["addAwpDiffColumn"],
      jsonString["addNextStrengthColumn"]
    )
  }
}
