import { ISettingName } from "../Toolkit/SettingName";

export class FoxfmSettingName implements ISettingName {
  private settingName: String = "foxfm2.setting.application";

  constructor() { }

  public name(): String {
    return this.settingName;
  }
}
