import { ISetting } from './Settings/Setting'
import { IStrengthLevel } from './StrengthLevel'
import { StrengthLevel } from './StrengthLevel'
import { IStrengthLevels } from './StrengthLevels'
import { StrengthLevels } from './StrengthLevels'
import { ISettingName } from "./Settings/SettingName";
import { StorageLocal } from "./Storage";

export interface IStrengthLevelsSetting {
  strengthLevels(): Promise<IStrengthLevels>;
  strengthLevel(strength: Number): Promise<IStrengthLevel>;
  changeStrengthLevels(strengthLevels: Array<IStrengthLevel>): void;
  changeStrengthLevel(strengthLevels: IStrengthLevel): void;
}

export class SettingNameStrengthLevels implements ISettingName {
  private settingName: String = "foxfm2.strengthLevels";
  constructor() { }
  public name(): String {
    return this.settingName;
  }
}

export class StrengthLevelsSetting implements IStrengthLevelsSetting {
  private strengthLevelsSetting: ISetting<IStrengthLevels>;

  constructor() {
    this.strengthLevelsSetting = new StorageLocal<IStrengthLevels>(
      new SettingNameStrengthLevels(),
      new StrengthLevels([
        new StrengthLevel(1, 1111, 0),
        new StrengthLevel(2, 2222, 96),
        new StrengthLevel(3, 3333, 293),
        new StrengthLevel(4, 4444, 542),
        new StrengthLevel(5, 5555, 905),
        new StrengthLevel(6, 6666, 1388),
        new StrengthLevel(7, 7777, 1973),
        new StrengthLevel(8, 8888, 2751),
        new StrengthLevel(9, 9999, 3703),
        new StrengthLevel(10, 101010, 4727),
        new StrengthLevel(11, 111111, 5755),
        new StrengthLevel(12, 121212, 6794),
        new StrengthLevel(13, 131313, 7906),
        new StrengthLevel(14, 131313, 9050),
        new StrengthLevel(15, 131313, 10192),
        new StrengthLevel(16, 131313, 11302),
        new StrengthLevel(17, 131313, 12389),
        new StrengthLevel(18, 131313, 13474),
        new StrengthLevel(19, 131313, 14503),
        new StrengthLevel(20, 131313, 15490),
        new StrengthLevel(21, 131313, 16540),
        new StrengthLevel(22, 131313, 17515),
        new StrengthLevel(23, 131313, 18460),
        new StrengthLevel(24, 131313, 19706),
        new StrengthLevel(25, 131313, 20431),
        new StrengthLevel(26, 131313, 20783),
        new StrengthLevel(27, 131313, 21030)
      ])
    );
  }

  public strengthLevels(): Promise<IStrengthLevels> {
    return this.strengthLevelsSetting.value();
  }

  public strengthLevel(strength: Number): Promise<IStrengthLevel> {
    return this.strengthLevels()
      .then(strengthLevels => strengthLevels.strengthLevel(strength));
  }

  public changeStrengthLevels(strengthLevels: Array<IStrengthLevel>): void {
  }

  public changeStrengthLevel(strengthLevel: IStrengthLevel): void {
  }
}
