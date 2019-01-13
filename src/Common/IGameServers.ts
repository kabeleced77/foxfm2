import { IGameServer } from "./IGameServer";

export interface IGameServers {
  gameServers(): Promise<IGameServer[]>;
  add(uri: String): Promise<void | IGameServer>;
}
