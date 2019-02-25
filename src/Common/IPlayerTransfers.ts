import { IPlayerTransfer } from "./IPlayerTransfer";

export interface IPlayerTransfers {
  playerTransfers(): Promise<IPlayerTransfer[]>;
  add(
    gameServerId: Number,
    matchdayId: Number,
    externalTransferId: Number,
    position: String,
    age: Number,
    strength: Number,
    price: Number,
  ): Promise<void | IPlayerTransfer>;
}


