import { IStrengthLimits } from "./StrengthLimits"
import { StrengthLimits } from "./StrengthLimits"

export interface IStrengthsLimits {
  strengthLimits(strength: Number): IStrengthLimits;
  strengthLimitsByAwp(awps: Number): IStrengthLimits;
  strengthsLimits(): Array<IStrengthLimits>;
  fromJson(jsonString: String): IStrengthsLimits;
}

export class StrengthsLimits implements IStrengthsLimits {
  private strengthLimitsArray: Array<IStrengthLimits>;

  constructor(stengthLevelsLimits: Array<IStrengthLimits>) {
    this.strengthLimitsArray = stengthLevelsLimits;
  }

  public strengthLimits(strength: Number): IStrengthLimits {
    var index = this.strengthLimitsArray.findIndex(strengthLevel => strengthLevel.value() === strength);
    if (index == -1) {
      throw new Error(`Could not find strength level ${strength}`);
    }
    return this.strengthLimitsArray[index];
  }

  public strengthLimitsByAwp(awps: Number): IStrengthLimits {
    for (var i = 0; i < this.strengthLimitsArray.length; i++) {
      if (awps < this.strengthLimitsArray[i].awpPoints() && i > 0) {
        return this.strengthLimitsArray[i - 1];
      }
    }
    return new StrengthLimits(-1, -1, -1);
  }

  public strengthsLimits(): Array<IStrengthLimits> {
    return this.strengthLimitsArray.slice();
  }

  public fromJson(jsonString: String): IStrengthsLimits {
    if (this.strengthLimitsArray.length) {
      return new StrengthsLimits(
        jsonString["strengthLimitsArray"].map((strengthLevel: String, i: number) => {
          return this.strengthLimitsArray[i].fromJson(strengthLevel);
        })
      );
    } else {
      return new StrengthsLimits([]);
    }
  }
}
