import { ISettingName } from "../Toolkit/SettingName";

export class SettingNameImportTransfers implements ISettingName {
  private settingName: String = "foxfm2.setting.import.transfers";

  constructor() { }

  public name(): String {
    return this.settingName;
  }
}
