export interface ITransferMarketSearchResultTableSettings {
  addTransferPriceStrengthColumnActivated(): Boolean;
  addTransferPriceNextStrengthColumnActivated(): Boolean;
  addTransferPriceNextAgeStrengthColumnActivated(): Boolean;
  addTransferPriceNextAgeNextStrengthColumnActivated(): Boolean;
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
    private readonly addColumnTransferPriceCurrentStrength: Boolean,
    private readonly addColumnTransferPriceNextStrength: Boolean,
    private readonly addColumnTransferPriceNextAgeCurrentStrength: Boolean,
    private readonly addColumnTransferPriceNextAgeNextStrength: Boolean,
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
  public addTransferPriceStrengthColumnActivated() {
    return this.addColumnTransferPriceCurrentStrength;
  }
  public addTransferPriceNextStrengthColumnActivated() {
    return this.addColumnTransferPriceNextStrength;
  }
  public addTransferPriceNextAgeStrengthColumnActivated() {
    return this.addColumnTransferPriceNextAgeCurrentStrength;
  }
  public addTransferPriceNextAgeNextStrengthColumnActivated() {
    return this.addColumnTransferPriceNextAgeNextStrength;
  }
  public fromJson(jsonString: String): ITransferMarketSearchResultTableSettings {
    return new TransferMarketSearchResultTableSettings(
      jsonString["extendStrengthColumn"],
      jsonString["addAwpColumn"],
      jsonString["addAwpDiffColumn"],
      jsonString["addNextStrengthColumn"],
      jsonString[nameof(this.addColumnTransferPriceCurrentStrength)],
      jsonString[nameof(this.addColumnTransferPriceNextStrength)],
      jsonString[nameof(this.addColumnTransferPriceNextAgeCurrentStrength)],
      jsonString[nameof(this.addColumnTransferPriceNextAgeNextStrength)],
    )
  }
}
