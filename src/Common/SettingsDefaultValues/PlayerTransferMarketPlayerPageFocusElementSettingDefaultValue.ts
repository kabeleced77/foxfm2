import { FocusElementsSetting } from "../Settings/FocusElementsSetting";
import { RessourcePlayerTransferMarketPlayerPageElementCloseWindow, RessourcePlayerTransferMarketPlayerPageElementBack } from "../Ressource";
import { FocusElementSetting } from "../Settings/FocusElementSetting";
import { ArrayInStorage } from "../ArrayInStorage";

export class PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue extends FocusElementsSetting {
  constructor() {
    super(
      false,
      new ArrayInStorage([
        new FocusElementSetting(
          false,
          "/html/body/div[2]/form/table/tbody/tr[5]/td/div/input[2]",
          new RessourcePlayerTransferMarketPlayerPageElementCloseWindow()),
        new FocusElementSetting(
          false,
          "/html/body/div[2]/form/table/tbody/tr[5]/td/div/input[1]",
          new RessourcePlayerTransferMarketPlayerPageElementBack()),
      ]));
  }
}
