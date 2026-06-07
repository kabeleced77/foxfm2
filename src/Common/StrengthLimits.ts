export interface IStrengthLimits {
  value(): number;
  wage(): number;
  awpPoints(): number;
  fromJson(jsonString: String): IStrengthLimits;
}

export class StrengthLimits implements IStrengthLimits {
  private valueOfStrength: number;
  private wageOfStrength: number;
  private awpsOfStrength: number;

  constructor(
    strengthValue: number,
    wageOfStrength: number,
    awpsOfStrength: number
  ) {
    this.valueOfStrength = strengthValue;
    this.wageOfStrength = wageOfStrength;
    this.awpsOfStrength = awpsOfStrength;
  }

  public value(): number {
    return this.valueOfStrength;
  }

  public wage(): number {
    return this.wageOfStrength;
  }

  public awpPoints(): number {
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
