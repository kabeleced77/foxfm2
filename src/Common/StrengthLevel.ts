export interface IStrengthLevel {
  strengthLevel(): Number;
  wage(): Number;
  awpPoints(): Number;
  fromJson(jsonString: String): IStrengthLevel;
}

export class StrengthLevel implements IStrengthLevel {
  private level: Number;
  private wageOfLevel: Number;
  private awps: Number;

  constructor(strengthLevel: Number, wage: Number, awpPoints: Number) {
    this.level = strengthLevel;
    this.wageOfLevel = wage;
    this.awps = awpPoints;
  }

  public strengthLevel(): Number {
    return this.level;
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
