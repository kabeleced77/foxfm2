export interface ITeamTableSetting {
  extendStrengthColumnActivated(): boolean;
  addAwpDiffColumnActivated(): boolean;
  addNextStrengthColumnActivated(): boolean;
  fromJson(jsonString: String): ITeamTableSetting;
}

export class TeamTableSetting implements ITeamTableSetting {
  private readonly extendStrengthColumn: boolean;
  private readonly addAwpDiffColumn: boolean;
  private readonly addNextStrengthColumn: boolean;

  constructor(
    extendStrengthColumn: boolean,
    addAwpDiffColumn: boolean,
    addNextStrengthColumn: boolean,
  ) {
    this.extendStrengthColumn = extendStrengthColumn;
    this.addAwpDiffColumn = addAwpDiffColumn;
    this.addNextStrengthColumn = addNextStrengthColumn;
  }

  public extendStrengthColumnActivated(): boolean {
    return this.extendStrengthColumn;
  }
  public addAwpDiffColumnActivated(): boolean {
    return this.addAwpDiffColumn;
  }
  public addNextStrengthColumnActivated(): boolean {
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
