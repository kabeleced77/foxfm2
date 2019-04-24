import { IPlayerCategory } from "./IPlayerCategory";
import { IPlayerCategories } from "./IPlayerCategories";
import { IStrengthLevels, StrengthLevels } from "./StrengthLevels";
import { PlayerCategory } from "./PlayerCategory";
import { IValues } from "./Toolkit/Values";

export class PlayerCategories implements IPlayerCategories {
  constructor(
    private readonly positions: IValues<String>,
    private readonly ages: IValues<Number>,
    private readonly strengthLevels: IStrengthLevels,

  ) { }

  public async categories(): Promise<IPlayerCategory[]> {
    if (this.positions.values().length != this.ages.values().length || this.ages.values().length != (await this.strengthLevels.strengthLevels()).length) {
      throw new Error(`Length of 'positions', 'ages' and 'strengthLevels' differ. Cannot calculate array of categories.`);
    }

    return (await this
      .strengthLevels
      .strengthLevels())
      .map((strengthLevel, index) => {
        return new PlayerCategory(
          this.positions.values()[index],
          this.ages.values()[index],
          strengthLevel,
        );
      });
  }
}
