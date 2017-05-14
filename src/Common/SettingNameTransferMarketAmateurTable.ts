import { ISettingName } from "./Toolkit/SettingName";

export class SettingNameTransferMarketAmateurTable implements ISettingName {
  private settingName: String = "foxfm2.setting.transfer.market.amateur.playertable";
  constructor() { }
  public name(): String {
    return this.settingName;
  }
}
