import { FocusElementsSetting } from "../Settings/FocusElementsSetting";
import { RessourcePlayerInformationWebPageElementTransferMarket, RessourcePlayerInformationWebPageElementExtendContract } from "../Ressource";
import { FocusElementSetting } from "../Settings/FocusElementSetting";
import { ArrayInStorage } from "../ArrayInStorage";

export class PlayerInformationPageFocusElementSettingDefaultValue extends FocusElementsSetting {
  constructor() {
    super(
      false,
      new ArrayInStorage([
        new FocusElementSetting(
          false,
          "/html/body[1]/div[2]/table[3]/tbody[1]/tr[1]/td[2]/a[3]",
          new RessourcePlayerInformationWebPageElementTransferMarket()),
        new FocusElementSetting(
          false,
          "/html/body/div[2]/table[3]/tbody/tr[1]/td[2]/a[1]",
          new RessourcePlayerInformationWebPageElementExtendContract()),
      ]));
  }
}
