import { ISettingName } from "../Toolkit/SettingName";

export class SettingNameStadiumPrices implements ISettingName {
  private settingName: String = "foxfm2.stadium.prices";

  constructor() { }

  public name(): String {
    return this.settingName;
  }
}
