import { IPlayerTransfer } from "./IPlayerTransfer";

export interface IPlayerTransfers {
  playerTransfers(): Promise<IPlayerTransfer[]>;
  add(
    matchdayId: Number,
    externalTransferId: Number,
    position: String,
    age: Number,
    strength: Number,
    price: Number,
  ): Promise<void | IPlayerTransfer>;
}


