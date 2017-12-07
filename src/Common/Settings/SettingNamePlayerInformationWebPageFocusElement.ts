import { ISettingName } from "../Toolkit/SettingName";

export class SettingNamePlayerInformationWebPageFocusElement implements ISettingName {
  private settingName: String = "foxfm2.setting.playerinformation.focuselement";

  constructor() { }

  public name(): String {
    return this.settingName;
  }
}
