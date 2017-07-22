import { IStrengthLevelLimits } from "./StrengthLevelLimits"
import { StrengthLevelLimits } from "./StrengthLevelLimits"

export interface IStrengthLevelsLimits {
  strengthLevelLimits(strength: Number): IStrengthLevelLimits;
  strengthLevelByAwp(awps: Number): IStrengthLevelLimits;
  strengthLevelsLimits(): Array<IStrengthLevelLimits>;
  fromJson(jsonString: String): IStrengthLevelsLimits;
}

export class StrengthLevelsLimits implements IStrengthLevelsLimits {
  private strengthLevelLimitsArray: Array<IStrengthLevelLimits>;

  constructor(stengthLevelsLimits: Array<IStrengthLevelLimits>) {
    this.strengthLevelLimitsArray = stengthLevelsLimits;
  }

  public strengthLevelLimits(strength: Number): IStrengthLevelLimits {
    var index = this.strengthLevelLimitsArray.findIndex(strengthLevel => strengthLevel.level() === strength);
    if (index == -1) {
      throw new Error(`Could not find strength level ${strength}`);
    }
    return this.strengthLevelLimitsArray[index];
  }

  public strengthLevelByAwp(awps: Number): IStrengthLevelLimits {
    for (var i = 0; i < this.strengthLevelLimitsArray.length; i++) {
      if (awps < this.strengthLevelLimitsArray[i].awpPoints() && i > 0) {
        return this.strengthLevelLimitsArray[i - 1];
      }
    }
    return new StrengthLevelLimits(-1, -1, -1);
  }

  public strengthLevelsLimits(): Array<IStrengthLevelLimits> {
    return this.strengthLevelLimitsArray.slice();
  }

  public fromJson(jsonString: String): IStrengthLevelsLimits {
    if (this.strengthLevelLimitsArray.length) {
      return new StrengthLevelsLimits(
        jsonString["strengthLevelArray"].map((strengthLevel: String, i: number) => {
          return this.strengthLevelLimitsArray[i].fromJson(strengthLevel);
        })
      );
    } else {
      return new StrengthLevelsLimits([]);
    }
  }
}
