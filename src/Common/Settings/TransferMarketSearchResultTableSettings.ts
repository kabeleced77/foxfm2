export interface ITransferMarketSearchResultTableSettings {
  extendStrengthColumnActivated(): Boolean;
  addAwpColumnActivated(): Boolean;
  addAwpDiffColumnActivated(): Boolean;
  addNextStrengthColumnActivated(): Boolean;
  fromJson(jsonString: String): ITransferMarketSearchResultTableSettings;
}

export class TransferMarketSearchResultTableSettings implements ITransferMarketSearchResultTableSettings {
  private readonly extendStrengthColumn: Boolean;
  private readonly addAwpColumn: Boolean;
  private readonly addAwpDiffColumn: Boolean;
  private readonly addNextStrengthColumn: Boolean;

  constructor(
    extendStrengthColumn: Boolean,
    addAwpColumn: Boolean,
    addAwpDiffColumn: Boolean,
    addNextStrengthColumn: Boolean,
  ) {
    this.extendStrengthColumn = extendStrengthColumn;
    this.addAwpColumn = addAwpColumn;
    this.addAwpDiffColumn = addAwpDiffColumn;
    this.addNextStrengthColumn = addNextStrengthColumn;
  }

  public extendStrengthColumnActivated(): Boolean {
    return this.extendStrengthColumn;
  }
  public addAwpColumnActivated(): Boolean {
    return this.addAwpColumn;
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
      jsonString["addAwpColumn"],
      jsonString["addAwpDiffColumn"],
      jsonString["addNextStrengthColumn"]
    )
  }
}
