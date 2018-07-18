import { ISettingName } from '../Toolkit/SettingName';

export class TransferMarketSaveSoldPlayersSettingName implements ISettingName {
  private settingName: String = "foxfm2.setting.transfermarket.savesoldplayers";

  constructor() { }

  public name(): String {
    return this.settingName;
  }
}
