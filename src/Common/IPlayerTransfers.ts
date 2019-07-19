import { IPlayerTransfer } from "./IPlayerTransfer";

export interface IPlayerTransfers {
  all(): Promise<IPlayerTransfer[]>;
  add(
    gameServerId: Number,
    matchdayId: Number,
    externalTransferId: Number,
    position: String,
    age: Number,
    strength: Number,
    price: Number,
  ): Promise<void | IPlayerTransfer>;
  average(
    gameServerUri: String,
    position: String,
    age: Number,
    strength: Number,
  ): Promise<Number>;
  averages(
    gameServerUri: String,
    positions: String[],
    minAge: Number,
    maxAge: Number,
    minStrength: Number,
    maxStrength: Number,
  ): Promise<{}>;
}
