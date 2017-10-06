import { ISetting } from '../Toolkit/Setting'
import { IStrengthLimits } from '../StrengthLimits'
import { StrengthLimits } from '../StrengthLimits'
import { IStrengthsLimits } from '../StrengthsLimits'
import { StrengthsLimits } from '../StrengthsLimits'
import { ISettingName } from "../Toolkit/SettingName";
import { StorageLocal } from "../Toolkit/StorageLocal";

export interface IStrengthsLimitsSetting {
  strengthsLimits(): Promise<IStrengthsLimits>;
  strengthLevel(strength: Number): Promise<IStrengthLimits>;
  changeStrengthsLimits(strengthsLimits: Array<IStrengthLimits>): void;
  changeStrengthLimits(strengthLimits: IStrengthLimits): void;
}

export class SettingNameStrengthsLimits implements ISettingName {
  private settingName: String = "foxfm2.strengthsLimits";
  constructor() { }
  public name(): String {
    return this.settingName;
  }
}

export class StrengthsLimitsSetting implements IStrengthsLimitsSetting {
  private strengthsLimitsSetting: ISetting<IStrengthsLimits>;

  constructor() {
    this.strengthsLimitsSetting = new StorageLocal<IStrengthsLimits>(
      new SettingNameStrengthsLimits(),
      new StrengthsLimits([
        new StrengthLimits(1, 1111, 0),
        new StrengthLimits(2, 2222, 96),
        new StrengthLimits(3, 3333, 293),
        new StrengthLimits(4, 4444, 542),
        new StrengthLimits(5, 5555, 905),
        new StrengthLimits(6, 6666, 1388),
        new StrengthLimits(7, 7777, 1973),
        new StrengthLimits(8, 8888, 2751),
        new StrengthLimits(9, 9999, 3703),
        new StrengthLimits(10, 101010, 4727),
        new StrengthLimits(11, 111111, 5755),
        new StrengthLimits(12, 121212, 6794),
        new StrengthLimits(13, 131313, 7906),
        new StrengthLimits(14, 131313, 9050),
        new StrengthLimits(15, 131313, 10192),
        new StrengthLimits(16, 131313, 11302),
        new StrengthLimits(17, 131313, 12389),
        new StrengthLimits(18, 131313, 13474),
        new StrengthLimits(19, 131313, 14503),
        new StrengthLimits(20, 131313, 15490),
        new StrengthLimits(21, 131313, 16540),
        new StrengthLimits(22, 131313, 17515),
        new StrengthLimits(23, 131313, 18460),
        new StrengthLimits(24, 131313, 19706),
        new StrengthLimits(25, 131313, 20431),
        new StrengthLimits(26, 131313, 20783),
        new StrengthLimits(27, 131313, 21030)
      ])
    );
  }

  public strengthsLimits(): Promise<IStrengthsLimits> {
    return this.strengthsLimitsSetting.value();
  }

  public strengthLevel(strength: Number): Promise<IStrengthLimits> {
    return this.strengthsLimits()
      .then(strengthsLimits => strengthsLimits.strengthLimits(strength));
  }

  public changeStrengthsLimits(strengthLevelsLimits: Array<IStrengthLimits>): void {
  }

  public changeStrengthLimits(strengthLimits: IStrengthLimits): void {
    this.strengthsLimits()
      .then(strengthsLimits => {
        this.strengthsLimitsSetting.update(strengthsLimits => {
          strengthsLimits.update(strengthLimits);
          return strengthsLimits;
        });
      });
  }
}
