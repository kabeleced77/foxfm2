import { IStrengthLimits } from "./StrengthLimits";
import { StrengthLimits } from "./StrengthLimits";
import { StrengthLimitsNotFound } from "./StrengthLimitsNotFound";

export interface IStrengthsLimits {
  strengthLimits(strength: Number): IStrengthLimits;
  strengthLimitsByAwp(awps: Number): IStrengthLimits;
  strengthsLimits(): Array<IStrengthLimits>;
  update(strengthLimits: IStrengthLimits): void;
  fromJson(jsonString: String): IStrengthsLimits;
}

export class StrengthsLimits implements IStrengthsLimits {
  private readonly strengthLimitsArray: Array<IStrengthLimits>;

  constructor(stengthLevelsLimits: Array<IStrengthLimits>) {
    this.strengthLimitsArray = stengthLevelsLimits;
  }

  public strengthLimits(strength: Number): IStrengthLimits {
    var index = this.strengthLimitsArray.findIndex((strengthLevel) => strengthLevel.value() === strength);
    return index == -1
      ? new StrengthLimitsNotFound()
      : this.strengthLimitsArray[index];
  }

  public strengthLimitsByAwp(awps: Number): IStrengthLimits {
    for (var i = 0; i < this.strengthLimitsArray.length; i++) {
      if (awps < this.strengthLimitsArray[i].awpPoints() && i > 0) {
        return this.strengthLimitsArray[i - 1];
      }
    }
    return new StrengthLimitsNotFound();
  }

  public strengthsLimits(): Array<IStrengthLimits> {
    return this.strengthLimitsArray.slice();
  }

  public update(strengthLimits: IStrengthLimits): void {
    let levelIndex = this.strengthLimitsArray.findIndex(sl => sl.value() == strengthLimits.value());
    if (levelIndex == -1) {
      this.strengthLimitsArray.push(strengthLimits);
    } else {
      this.strengthLimitsArray[levelIndex] = strengthLimits;
    }
  }

  public fromJson(jsonString: String): IStrengthsLimits {
      if (this.strengthLimitsArray.length) {
        return new StrengthsLimits(
        jsonString["strengthLimitsArray"].map((strengthLevel: String, i: number) => {
          return this.strengthLimitsArray[0].fromJson(strengthLevel);
        })
        );
      } else {
        return new StrengthsLimits([]);
    }
  }
}
