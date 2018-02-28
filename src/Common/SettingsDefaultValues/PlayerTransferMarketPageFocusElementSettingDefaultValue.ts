import { FocusElementsSetting } from "../Settings/FocusElementsSetting";
import { RessourcePlayerTransferMarketPlayerPageElementCloseWindow, RessourcePlayerTransferMarketPlayerPageElementBack } from "../Ressource";
import { FocusElementSetting } from "../Settings/FocusElementSetting";
import { ArrayInStorage } from "../ArrayInStorage";

export class PlayerTransferMarketPageFocusElementSettingDefaultValue extends FocusElementsSetting {
  constructor() {
    super(
      false,
      new ArrayInStorage([
        new FocusElementSetting(
          false,
          "/html/body/div[2]/table/tbody/tr[3]/td[2]/div/input[2]",
          new RessourcePlayerTransferMarketPlayerPageElementCloseWindow()),
        new FocusElementSetting(
          false,
          "/html/body/div[2]/table/tbody/tr[3]/td[2]/div/input[1]",
          new RessourcePlayerTransferMarketPlayerPageElementBack()),
      ]));
  }
}