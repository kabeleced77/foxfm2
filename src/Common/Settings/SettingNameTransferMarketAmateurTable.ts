import { ISettingName } from "./SettingName";

export class SettingNameTransferMarketAmateurTable implements ISettingName {
  private settingName: String = "foxfm2.setting.transfermarket.amateur.playertable";
  constructor() { }
  public name(): String {
    return this.settingName;
  }
}
