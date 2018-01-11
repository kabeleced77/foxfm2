import { IRessource, Ressource } from "../Ressource";
import { IArrayInStorage } from "../ArrayInStorage";
import { IFocusElementSetting } from "./FocusElementSetting";

export interface IFocusElementsSetting {
  elements(): IArrayInStorage<IFocusElementSetting>;
  activated(): Boolean;
  fromJson(jsonString: String): IFocusElementsSetting;
}

export class FocusElementsSetting implements IFocusElementsSetting {
  private readonly focus: Boolean;
  private readonly elementsValue: IArrayInStorage<IFocusElementSetting>;

  constructor(
    focusElement: Boolean,
    elements: IArrayInStorage<IFocusElementSetting>,
  ) {
    this.focus = focusElement;
    this.elementsValue = elements;
  }

  public activated(): Boolean {
    return this.focus;
  }
  public elements(): IArrayInStorage<IFocusElementSetting> {
    return this.elementsValue;
  }
  public fromJson(jsonString: String): IFocusElementsSetting {
    return new FocusElementsSetting(
      jsonString["focus"],
      this.elementsValue.fromJson(jsonString["elementsValue"]),
    )
  }
}
