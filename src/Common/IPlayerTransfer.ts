import { IGameServer } from "./IGameServer";
import { IMatchday } from './IMatchday';

export interface IPlayerTransfer {
  id(): Number;
  gameServerId(): Promise<Number>;
  gameServer(): Promise<IGameServer>;
  externalTransferId(): Promise<Number>;
  matchdayId(): Promise<Number>;
  matchday(): Promise<IMatchday>;
  position(): Promise<String>;
  age(): Promise<Number>;
  strength(): Promise<Number>;
  price(): Promise<Number>;
}
