import { IGameServer } from "./IGameServer";

export interface IMatchday {
  gameServer(): Promise<IGameServer>;
  day(): Promise<Number>;
  season(): Promise<Number>;
  date(): Promise<Date>;
}
