import { IPlayerCategory } from "./IPlayerCategory";
import { IPlayerCategories } from "./IPlayerCategories";
import { PlayerCategory } from "./PlayerCategory";
import { IValues } from "./Toolkit/Values";

export class PlayerCategories implements IPlayerCategories {
  constructor(
    private readonly positions: IValues<String>,
    private readonly ages: IValues<Number>,
    private readonly strengths: IValues<Number>,
  ) { }

  public categories(): IPlayerCategory[] {
    if (false
      || this.positions.values().length != this.ages.values().length
      || this.ages.values().length != this.strengths.values().length) {
      throw new Error(`Length of 'positions', 'ages' and 'strengths' differ. Cannot calculate array of categories.`);
    }

    return this.strengths
      .values()
      .map((strength, index) => {
        return new PlayerCategory(
          this.positions.values()[index],
          this.ages.values()[index],
          strength,
        );
      });
  }
}
