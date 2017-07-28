export interface IStrengthLimits {
  value(): Number;
  wage(): Number;
  awpPoints(): Number;
  fromJson(jsonString: String): IStrengthLimits;
}

export class StrengthLimits implements IStrengthLimits {
  private valueOfStrength: Number;
  private wageOfStrength: Number;
  private awpsOfStrength: Number;

  constructor(
    strengthValue: Number,
    wageOfStrength: Number,
    awpsOfStrength: Number
  ) {
    this.valueOfStrength = strengthValue;
    this.wageOfStrength = wageOfStrength;
    this.awpsOfStrength = awpsOfStrength;
  }

  public value(): Number {
    return this.valueOfStrength;
  }

  public wage(): Number {
    return this.wageOfStrength;
  }

  public awpPoints(): Number {
    return this.awpsOfStrength;
  }

  public fromJson(jsonString: String): IStrengthLimits {
    return new StrengthLimits(
      jsonString["valueOfStrength"],
      jsonString["wageOfStrength"],
      jsonString["awpsOfStrength"]
    )
  }
}
