import { IGameServerWithId } from "./IGameServerWithId";
import { IMatchdayWithId } from "./IMatchdayWithId";

export interface IPlayerTransfer {
  id(): Number;
  gameServerId(): Promise<Number>;
  gameServer(): Promise<IGameServerWithId>;
  externalTransferId(): Promise<Number>;
  matchdayId(): Promise<Number>;
  matchday(): Promise<IMatchdayWithId>;
  position(): Promise<String>;
  age(): Promise<Number>;
  strength(): Promise<Number>;
  price(): Promise<Number>;
}
