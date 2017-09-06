export interface ITransferMarketSearchResultTableSettings {
  extendStrengthColumnActivated(): Boolean;
  addAwpDiffColumnActivated(): Boolean;
  addNextStrengthColumnActivated(): Boolean;
  fromJson(jsonString: String): ITransferMarketSearchResultTableSettings;
}

export class TransferMarketSearchResultTableSettings implements ITransferMarketSearchResultTableSettings {
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
  public fromJson(jsonString: String): ITransferMarketSearchResultTableSettings {
    return new TransferMarketSearchResultTableSettings(
      jsonString["extendStrengthColumn"],
      jsonString["addAwpDiffColumn"],
      jsonString["addNextStrengthColumn"]
    )
  }
}
