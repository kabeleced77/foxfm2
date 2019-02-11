import { IAwp } from "./Toolkit/Awp";
import { IStrengthsLimits } from "./StrengthsLimits";

export interface IStrengthLevel {
  awp(): IAwp;
  currentStrengthValue(): Number;
  actualStrengthValue(): Number;
  missingAwpsToNextStrengthValue(): Number;
  nextStrengthValue(): Number;
}

export class StrengthLevel implements IStrengthLevel {
  private readonly strengthsLimits: IStrengthsLimits;
  private readonly strengthValue: Number;
  private readonly awpField: IAwp;

  constructor(
    strengthLevelLimits: IStrengthsLimits,
    strengthValue: Number,
    awp: IAwp
  ) {
    this.strengthsLimits = strengthLevelLimits;
    this.strengthValue = strengthValue;
    this.awpField = awp;
  }

  public awp(): IAwp {
    return this.awpField;
  }
  public currentStrengthValue(): Number {
    return this.strengthValue;
  }
  public actualStrengthValue(): Number {
    return this.strengthsLimits.strengthLimitsByAwp(this.awpField.awpPoints()).value();
  }
  public missingAwpsToNextStrengthValue(): Number {
    let nextStrengthLimits = this.strengthsLimits.strengthLimits(this.actualStrengthValue().valueOf() + 1);
    return this.awpField.awpPoints().valueOf() - nextStrengthLimits.awpPoints().valueOf();
  }
  public nextStrengthValue(): Number {
    return this.actualStrengthValue().valueOf() + 1;
  }
}
