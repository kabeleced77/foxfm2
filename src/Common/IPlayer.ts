import { IPlayerCategory } from "./IPlayerCategory";

export interface IPlayer {
  category(): IPlayerCategory;
  averageTransferPrice(): Promise<Number>;
}
