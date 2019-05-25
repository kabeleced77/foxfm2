import { IPlayerCategory } from "./IPlayerCategory";

export class PlayerCategory implements IPlayerCategory {
  constructor(
    private readonly positionValue: String,
    private readonly ageValue: Number,
    private readonly strengthValue: Number,
  ) { }

  public position(): String {
    return this.positionValue;
  }
  public age(): Number {
    return this.ageValue;
  }
  public strength(): Number {
    return this.strengthValue;
  }
}
