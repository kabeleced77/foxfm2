export interface ITransferMarketSellingDurationSettings {
  activated(): boolean;
  defaultSellingDuration(): number;
  fromJson(jsonString: String): ITransferMarketSellingDurationSettings;
}

export class TransferMarketSellingDurationSettings implements ITransferMarketSellingDurationSettings {
  private readonly changeDefaultSellingDurationActivated: boolean;
  private readonly defaultSellingDurationValue: number;

  constructor(
    changeDefaultSellingDuration: boolean,
    defaultSellingDuration: number,
  ) {
    this.changeDefaultSellingDurationActivated = changeDefaultSellingDuration;
    this.defaultSellingDurationValue = defaultSellingDuration;
  }

  public activated(): boolean {
    return this.changeDefaultSellingDurationActivated;
  }
  public defaultSellingDuration(): number {
    return this.defaultSellingDurationValue;
  }
  public fromJson(jsonString: String): ITransferMarketSellingDurationSettings {
    return new TransferMarketSellingDurationSettings(
      jsonString["changeDefaultSellingDurationActivated"],
      jsonString["defaultSellingDurationValue"],
    );
  }
}
