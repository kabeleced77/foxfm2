import { ISettingName } from "../Toolkit/SettingName";

export class PlayerTransferMarketPageFocusElementSettingName implements ISettingName {
  private settingName: String = "foxfm2.setting.playertransfermarket.focuselement";

  constructor() { }

  public name(): String {
    return this.settingName;
  }
}
