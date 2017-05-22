import { ISettingName } from "../Toolkit/SettingName";

export class SettingNameApplicationLogLevel implements ISettingName {
  private settingName: String = "foxfm2.logger.applicationLogLevel";

  constructor() { }

  public name(): String {
    return this.settingName;
  }
}
