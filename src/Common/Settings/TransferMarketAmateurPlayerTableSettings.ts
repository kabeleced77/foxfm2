export interface ITransferMarketAmateurPlayerTableSettings {
  addAwpColumnActivated(): boolean;
  extendStrengthColumnActivated(): boolean;
  addAwpDiffColumnActivated(): boolean;
  addNextStrengthColumnActivated(): boolean;
  fromJson(jsonString: String): ITransferMarketAmateurPlayerTableSettings;
}

export class TransferMarketAmateurPlayerTableSettings implements ITransferMarketAmateurPlayerTableSettings {
  private readonly addAwpColumn: boolean;
  private readonly addAwpDiffColumn: boolean;
  private readonly addNextStrengthColumn: boolean;
  private readonly extendStrengthColumn: boolean;

  constructor(
    addAwpColumn: boolean,
    addAwpDiffColumn: boolean,
    addNextStrengthColumn: boolean,
    extendStrengthColumn: boolean
  ) {
    this.addAwpColumn = addAwpColumn;
    this.addAwpDiffColumn = addAwpDiffColumn;
    this.addNextStrengthColumn = addNextStrengthColumn;
    this.extendStrengthColumn = extendStrengthColumn;
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
  public extendStrengthColumnActivated(): boolean {
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
