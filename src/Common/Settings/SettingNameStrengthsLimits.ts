import { ISettingName } from "../Toolkit/SettingName";

export class SettingNameStrengthsLimits implements ISettingName {
  private settingName: String = "foxfm2.strengthsLimits";
  constructor() { }
  public name(): String {
    return this.settingName;
  }
}
