import { IStrengthLevel, StrengthLevel } from "./StrengthLevel";
import { IPlayerCategory } from "./IPlayerCategory";

export class PlayerCategory implements IPlayerCategory {
  constructor(
    private readonly positionValue: String,
    private readonly ageValue: Number,
    private readonly strengthLevelValue: IStrengthLevel,

  ) { }

  public position(): String {
    return this.positionValue;
  }
  public age(): Number {
    return this.ageValue;
  }
  public strengthLevel(): IStrengthLevel {
    return this.strengthLevelValue;
  }
}
