import { IGameServerWithoutId } from "./IGameServer";

export interface IMatchday {
  gameServer(): Promise<IGameServerWithoutId>;
  day(): Promise<Number>;
  season(): Promise<Number>;
  date(): Promise<Date>;
}
