import { ISettingName } from "../Toolkit/SettingName";

export class PlayerTransferMarketPlayerPageFocusElementSettingName implements ISettingName {
  private settingName: String = "foxfm2.setting.playertransfermarketplayer.focuselement";

  constructor() { }

  public name(): String {
    return this.settingName;
  }
}
