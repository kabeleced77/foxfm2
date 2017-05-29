import { ISettingName } from "../Toolkit/SettingName";

export class SettingNameTeamTable implements ISettingName {
  private settingName: String = "foxfm2.teamui.setting";
  constructor() { }
  public name(): String {
    return this.settingName;
  }
}
