import { IPlayerCategory } from "./IPlayerCategory";
import { IPlayer } from "./IPlayer";
import { IStrengthLevel } from "./StrengthLevel";

export class Player implements IPlayer {
  constructor(
    private readonly categoryValue: IPlayerCategory,
    private readonly strengthLevelValue: IStrengthLevel,
  ) { }

  public category(): IPlayerCategory {
    return this.categoryValue;
  }
  public strengthLevel(): IStrengthLevel {
    return this.strengthLevelValue;
  }
}
