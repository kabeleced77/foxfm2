export interface ITransferMarketAmateurPlayerTableSettings {
  addAwpColumnActivated(): Boolean;
  extendStrengthColumnActivated(): Boolean;
  addAwpDiffColumnActivated(): Boolean;
  addNextStrengthColumnActivated(): Boolean;
  fromJson(jsonString: String): ITransferMarketAmateurPlayerTableSettings;
}

export class TransferMarketAmateurPlayerTableSettings implements ITransferMarketAmateurPlayerTableSettings {
  private readonly addAwpColumn: Boolean;
  private readonly addAwpDiffColumn: Boolean;
  private readonly addNextStrengthColumn: Boolean;
  private readonly extendStrengthColumn: Boolean;

  constructor(
    addAwpColumn: Boolean,
    addAwpDiffColumn: Boolean,
    addNextStrengthColumn: Boolean,
    extendStrengthColumn: Boolean
  ) {
    this.addAwpColumn = addAwpColumn;
    this.addAwpDiffColumn = addAwpDiffColumn;
    this.addNextStrengthColumn = addNextStrengthColumn;
    this.extendStrengthColumn = extendStrengthColumn;
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
  public extendStrengthColumnActivated(): Boolean {
    return this.extendStrengthColumn;
  }
  public fromJson(jsonString: String): TransferMarketAmateurPlayerTableSettings {
    return new TransferMarketAmateurPlayerTableSettings(
      jsonString["addAwpColumn"],
      jsonString["addAwpDiffColumn"],
      jsonString["addNextStrengthColumn"],
      jsonString["extendStrengthColumn"],
    );
  }
}
