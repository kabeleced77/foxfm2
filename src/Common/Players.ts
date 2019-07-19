import { IPlayers } from "./IPlayers";
import { IPlayer } from "./IPlayer";
import { IPlayerCategories } from "./IPlayerCategories";
import { Player } from "./Player";
import { IStrengthLevels } from "./StrengthLevels";

export class Players implements IPlayers {
  /**
   *
   */
  constructor(
    private readonly playerCatogiesValue: IPlayerCategories,
    private readonly playerStrengthLevels: IStrengthLevels,
  ) { }

  public async all(): Promise<IPlayer[]> {
    const playerStrengthLevels = await this.playerStrengthLevels.strengthLevels();
    if (this.playerCatogiesValue.categories().length !== playerStrengthLevels.length)
      throw new Error(`Length of player categories and strength levels array differ. Cannot calculate array of Players.`);

    return this
      .playerCatogiesValue
      .categories()
      .map((playerCategory, i: number) => {
        return new Player(
          playerCategory,
          playerStrengthLevels[i],
        );
      });
  }
}
