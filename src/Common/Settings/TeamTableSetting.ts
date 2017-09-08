export interface ITeamTableSetting {
  extendStrengthColumnActivated(): Boolean;
  addAwpDiffColumnActivated(): Boolean;
  addNextStrengthColumnActivated(): Boolean;
  fromJson(jsonString: String): ITeamTableSetting;
}

export class TeamTableSetting implements ITeamTableSetting {
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
  public fromJson(jsonString: String): ITeamTableSetting {
    return new TeamTableSetting(
      jsonString["extendStrengthColumn"],
      jsonString["addAwpDiffColumn"],
      jsonString["addNextStrengthColumn"]
    )
  }
}
