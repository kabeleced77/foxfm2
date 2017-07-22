export interface IStrengthLevelLimits {
  level(): Number;
  wage(): Number;
  awpPoints(): Number;
  fromJson(jsonString: String): IStrengthLevelLimits;
}

export class StrengthLevelLimits implements IStrengthLevelLimits {
  private levelOfStrength: Number;
  private wageOfLevel: Number;
  private awps: Number;

  constructor(
    level: Number,
    wage: Number,
    awpPoints: Number
  ) {
    this.levelOfStrength = level;
    this.wageOfLevel = wage;
    this.awps = awpPoints;
  }

  public level(): Number {
    return this.levelOfStrength;
  }

  public wage(): Number {
    return this.wageOfLevel;
  }

  public awpPoints(): Number {
    return this.awps;
  }

  public fromJson(jsonString: String): IStrengthLevelLimits {
    return new StrengthLevelLimits(
      jsonString["levelOfStrength"],
      jsonString["wageOfLevel"],
      jsonString["awps"]
    )
  }
}
