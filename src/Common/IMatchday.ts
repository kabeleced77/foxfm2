import { IGameServer, IGameServerWithoutId } from "./IGameServer";

// TODO: rename to IMatchday
export interface IMatchdayWithoutId {
  gameServer(): Promise<IGameServerWithoutId>;
  day(): Promise<Number>;
  season(): Promise<Number>;
  date(): Promise<Date>;
}

// TODO: rename to IMatchdayDb and extend from IMatchday (IMatchdayWithoutId)
export interface IMatchday {
  id(): Number;
  gameServerId(): Promise<Number>;
  gameServer(): Promise<IGameServer>;
  day(): Promise<Number>;
  season(): Promise<Number>;
  date(): Promise<Date>;
}
