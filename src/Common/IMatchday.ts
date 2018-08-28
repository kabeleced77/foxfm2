import { IGameServer } from "./GameServer";

export interface IMatchday {
  id(): Number;
  gameServerId(): Promise<Number>;
  gameServer(): Promise<IGameServer>;
  day(): Promise<Number>;
  season(): Promise<Number>;
  date(): Promise<Date>;
}
