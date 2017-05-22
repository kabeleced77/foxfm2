import { ISettingName } from "../Toolkit/SettingName";

export class SettingNameTransferMarketProfessionalsSearchResultTable implements ISettingName {
  private settingName: String = "foxfm2.setting.transfer.market.professionals.searchresulttable";
  constructor() { }
  public name(): String {
    return this.settingName;
  }
}
