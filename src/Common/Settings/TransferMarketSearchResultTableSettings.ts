export interface ITransferMarketSearchResultTableSettings {
  addTransferPriceStrengthColumnActivated(): boolean;
  addTransferPriceNextStrengthColumnActivated(): boolean;
  addTransferPriceNextAgeStrengthColumnActivated(): boolean;
  addTransferPriceNextAgeNextStrengthColumnActivated(): boolean;
  extendStrengthColumnActivated(): boolean;
  addAwpColumnActivated(): boolean;
  addAwpDiffColumnActivated(): boolean;
  addNextStrengthColumnActivated(): boolean;
  fromJson(jsonString: String): ITransferMarketSearchResultTableSettings;
}

export class TransferMarketSearchResultTableSettings implements ITransferMarketSearchResultTableSettings {
  private readonly extendStrengthColumn: boolean;
  private readonly addAwpColumn: boolean;
  private readonly addAwpDiffColumn: boolean;
  private readonly addNextStrengthColumn: boolean;

  constructor(
    extendStrengthColumn: boolean,
    addAwpColumn: boolean,
    addAwpDiffColumn: boolean,
    addNextStrengthColumn: boolean,
    private readonly addColumnTransferPriceCurrentStrength: boolean,
    private readonly addColumnTransferPriceNextStrength: boolean,
    private readonly addColumnTransferPriceNextAgeCurrentStrength: boolean,
    private readonly addColumnTransferPriceNextAgeNextStrength: boolean,
  ) {
    this.extendStrengthColumn = extendStrengthColumn;
    this.addAwpColumn = addAwpColumn;
    this.addAwpDiffColumn = addAwpDiffColumn;
    this.addNextStrengthColumn = addNextStrengthColumn;
  }

  public extendStrengthColumnActivated(): boolean {
    return this.extendStrengthColumn;
  }
  public addAwpColumnActivated(): boolean {
    return this.addAwpColumn;
  }
  public addAwpDiffColumnActivated(): boolean {
    return this.addAwpDiffColumn;
  }
  public addNextStrengthColumnActivated(): boolean {
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
      jsonString["addColumnTransferPriceCurrentStrength"],
      jsonString["addColumnTransferPriceNextStrength"],
      jsonString["addColumnTransferPriceNextAgeCurrentStrength"],
      jsonString["addColumnTransferPriceNextAgeNextStrength"],
    )
  }
}
