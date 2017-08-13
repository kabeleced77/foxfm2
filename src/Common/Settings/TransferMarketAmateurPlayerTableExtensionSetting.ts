export interface ITransferMarketAmateurPlayerTableExtensionSetting {
  addAwpColumn(): Boolean;
  extendStrengthColumn(): Boolean;
  fromJson(jsonString: String): ITransferMarketAmateurPlayerTableExtensionSetting;
}

export class TransferMarketAmateurPlayerTableExtensionSetting implements ITransferMarketAmateurPlayerTableExtensionSetting {
  private addAwpColumnField: Boolean;
  private extendStrengthColumnField: Boolean;

  constructor(
    addAwpColumn: Boolean,
    extendStrengthColumn: Boolean,
  ) {
    this.addAwpColumnField = addAwpColumn;
    this.extendStrengthColumnField = extendStrengthColumn;
  }

  public addAwpColumn(): Boolean {
    return this.addAwpColumnField;
  }
  public extendStrengthColumn(): Boolean {
    return this.extendStrengthColumnField;
  }

  public fromJson(jsonString: String): TransferMarketAmateurPlayerTableExtensionSetting {
    return new TransferMarketAmateurPlayerTableExtensionSetting(
      jsonString["addAwpColumnField"],
      jsonString["extendStrengthColumnField"],
    );
  }
}
