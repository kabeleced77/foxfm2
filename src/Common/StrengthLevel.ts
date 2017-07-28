import { IAwp } from "./Toolkit/Awp";
import { IStrengthLimits } from "./StrengthLimits";
import { IStrengthsLimits } from "./StrengthsLimits";

export interface IStrengthLevel {
  currentStrengthValue(): Number;
  actualStrengthValue(): Number;
  missingAwpsToNextStrengthValue(): Number;
}

export class StrengthLevelByAwp implements IStrengthLevel {
  private readonly strengthsLimits: IStrengthsLimits;
  private readonly strengthValue: Number;
  private readonly awp: IAwp;

  constructor(strengthLevelLimits: IStrengthsLimits, strengthValue: Number, awp: IAwp) {
    this.strengthsLimits = strengthLevelLimits;
    this.strengthValue = strengthValue;
    this.awp = awp;
  }

  currentStrengthValue(): Number {
    return this.strengthValue;
  }
  actualStrengthValue(): Number {
    return this.strengthsLimits.strengthLimitsByAwp(this.awp.awpPoints()).value();
  }
  missingAwpsToNextStrengthValue(): Number {
    let nextStrengthLimits = this.strengthsLimits.strengthLimits(this.actualStrengthValue().valueOf() + 1);
    return this.awp.awpPoints().valueOf() - nextStrengthLimits.awpPoints().valueOf();
  }
}
