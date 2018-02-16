import { IUserSetting } from "../Toolkit/UserSetting";

export interface ITransferMarketSellingDurationSettings extends IUserSetting {
  defaultSellingDuration(): Number;
  fromJson(jsonString: String): ITransferMarketSellingDurationSettings;
}

export class TransferMarketSellingDurationSettings implements ITransferMarketSellingDurationSettings {
  private readonly changeDefaultSellingDurationActivated: Boolean;
  private readonly defaultSellingDurationValue: Number;

  constructor(
    changeDefaultSellingDuration: Boolean,
    defaultSellingDuration: Number
  ) {
    this.changeDefaultSellingDurationActivated = changeDefaultSellingDuration;
    this.defaultSellingDurationValue = defaultSellingDuration;
  }

  public activated(): Boolean {
    return this.changeDefaultSellingDurationActivated;
  }
  public defaultSellingDuration(): Number {
    return this.defaultSellingDurationValue;
  }
  public fromJson(jsonString: String): ITransferMarketSellingDurationSettings {
    return new TransferMarketSellingDurationSettings(
      jsonString["changeDefaultSellingDurationActivated"],
      jsonString["defaultSellingDurationValue"]
    )
  }
}
