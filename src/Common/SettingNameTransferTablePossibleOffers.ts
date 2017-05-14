import { ISettingName } from "./Toolkit/SettingName";

export class SettingNameTransferTablePossibleOffers implements ISettingName {
  private settingName: String = "foxfm2.setting.transfer.possibleOffers";
  constructor() { }
  public name(): String {
    return this.settingName;
  }
}
