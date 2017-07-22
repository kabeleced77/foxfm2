import { ISetting } from '../Toolkit/Setting'
import { IStrengthLevelLimits } from '../StrengthLevelLimits'
import { StrengthLevelLimits } from '../StrengthLevelLimits'
import { IStrengthLevelsLimits } from '../StrengthLevelsLimits'
import { StrengthLevelsLimits } from '../StrengthLevelsLimits'
import { ISettingName } from "../Toolkit/SettingName";
import { StorageLocal } from "../Toolkit/StorageLocal";

export interface IStrengthLevelsLimitsSetting {
  strengthLevelsLimits(): Promise<IStrengthLevelsLimits>;
  strengthLevel(strength: Number): Promise<IStrengthLevelLimits>;
  changeStrengthLevels(strengthLevels: Array<IStrengthLevelLimits>): void;
  changeStrengthLevel(strengthLevels: IStrengthLevelLimits): void;
}

export class SettingNameStrengthLevelsLimits implements ISettingName {
  private settingName: String = "foxfm2.strengthLevelsLimits";
  constructor() { }
  public name(): String {
    return this.settingName;
  }
}

export class StrengthLevelsLimitsSetting implements IStrengthLevelsLimitsSetting {
  private strengthLevelsSetting: ISetting<IStrengthLevelsLimits>;

  constructor() {
    this.strengthLevelsSetting = new StorageLocal<IStrengthLevelsLimits>(
      new SettingNameStrengthLevelsLimits(),
      new StrengthLevelsLimits([
        new StrengthLevelLimits(1, 1111, 0),
        new StrengthLevelLimits(2, 2222, 96),
        new StrengthLevelLimits(3, 3333, 293),
        new StrengthLevelLimits(4, 4444, 542),
        new StrengthLevelLimits(5, 5555, 905),
        new StrengthLevelLimits(6, 6666, 1388),
        new StrengthLevelLimits(7, 7777, 1973),
        new StrengthLevelLimits(8, 8888, 2751),
        new StrengthLevelLimits(9, 9999, 3703),
        new StrengthLevelLimits(10, 101010, 4727),
        new StrengthLevelLimits(11, 111111, 5755),
        new StrengthLevelLimits(12, 121212, 6794),
        new StrengthLevelLimits(13, 131313, 7906),
        new StrengthLevelLimits(14, 131313, 9050),
        new StrengthLevelLimits(15, 131313, 10192),
        new StrengthLevelLimits(16, 131313, 11302),
        new StrengthLevelLimits(17, 131313, 12389),
        new StrengthLevelLimits(18, 131313, 13474),
        new StrengthLevelLimits(19, 131313, 14503),
        new StrengthLevelLimits(20, 131313, 15490),
        new StrengthLevelLimits(21, 131313, 16540),
        new StrengthLevelLimits(22, 131313, 17515),
        new StrengthLevelLimits(23, 131313, 18460),
        new StrengthLevelLimits(24, 131313, 19706),
        new StrengthLevelLimits(25, 131313, 20431),
        new StrengthLevelLimits(26, 131313, 20783),
        new StrengthLevelLimits(27, 131313, 21030)
      ])
    );
  }

  public strengthLevelsLimits(): Promise<IStrengthLevelsLimits> {
    return this.strengthLevelsSetting.value();
  }

  public strengthLevel(strength: Number): Promise<IStrengthLevelLimits> {
    return this.strengthLevelsLimits()
      .then(strengthLevelsLimits => strengthLevelsLimits.strengthLevelLimits(strength));
  }

  public changeStrengthLevels(strengthLevelsLimits: Array<IStrengthLevelLimits>): void {
  }

  public changeStrengthLevel(strengthLevelLimits: IStrengthLevelLimits): void {
  }
}
