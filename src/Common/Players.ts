import { IPlayers } from "./IPlayers";
import { IPlayer } from "./IPlayer";
import { IPlayerCategories } from "./IPlayerCategories";
import { Player } from "./Player";
import { IPlayerTransfers } from "./IPlayerTransfers";

export class Players implements IPlayers {
  /**
   *
   */
  constructor(
    private readonly uri: String,
    private readonly playerCatogiesValue: IPlayerCategories,
    private readonly transfers: IPlayerTransfers,
  ) { }

  public all(): IPlayer[] {
    return this
      .playerCatogiesValue
      .categories()
      .map((playerCategory) => {
        return new Player(
          this.uri,
          playerCategory,
          this.transfers,
        );
      });
  }
}
