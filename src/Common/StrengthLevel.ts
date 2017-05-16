export interface IStrengthLevel {
  level(): Number;
  wage(): Number;
  awpPoints(): Number;
  fromJson(jsonString: String): IStrengthLevel;
}

export class StrengthLevel implements IStrengthLevel {
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

  public fromJson(jsonString: String): IStrengthLevel {
    return new StrengthLevel(
      jsonString["level"],
      jsonString["wageOfLevel"],
      jsonString["awps"]
    )
  }
}
