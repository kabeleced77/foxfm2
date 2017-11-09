import { ISettingName } from "../Toolkit/SettingName";

export class SettingNameTransferMarketSellingDuration implements ISettingName {
  private settingName: String = "foxfm2.setting.transfermarket.sellingduration";

  constructor() { }

  public name(): String {
    return this.settingName;
  }
}
