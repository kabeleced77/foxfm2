import { ISettingName } from "../Toolkit/SettingName";

export class SettingNameApplicationLogLevel implements ISettingName {
  private settingName: string = "foxfm2.logger.applicationLogLevel";

  constructor() { }

  public name(): string {
    return this.settingName;
  }
}
