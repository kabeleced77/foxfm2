import { IUserSetting } from "../Toolkit/UserSetting";

export interface ITransferMarketSaveSoldPlayersSetting extends IUserSetting {
  fromJson(jsonString: String): ITransferMarketSaveSoldPlayersSetting;
}

export class TransferMarketSaveSoldPlayersSetting implements ITransferMarketSaveSoldPlayersSetting {
  constructor(
    private saveSoldPlayersActivated: Boolean,
  ) { }

  public activated(): Boolean {
    return this.saveSoldPlayersActivated;
  }

  public fromJson(jsonString: String): ITransferMarketSaveSoldPlayersSetting {
    return new TransferMarketSaveSoldPlayersSetting(
      jsonString["saveSoldPlayersActivated"],
    )
  }
}
