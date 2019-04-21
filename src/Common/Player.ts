import { IPlayerCategory } from "./IPlayerCategory";
import { IPlayer } from "./IPlayer";
import { IPlayerTransfers } from "./IPlayerTransfers";

export class Player implements IPlayer {
  constructor(
    private readonly gameServerUri: String,
    private readonly categoryValue: IPlayerCategory,
    private readonly transfers: IPlayerTransfers,
  ) { }

  public category(): IPlayerCategory {
    return this.categoryValue;
  }
  public averageTransferPrice(): Promise<Number> {
    return this.transfers
      .average(
        this.gameServerUri,
        this.categoryValue.position(),
        this.categoryValue.age(),
        this.categoryValue.strengthLevel().actualStrengthValue(),
      );
  }
}
