import { IGameServer } from "./IndexedDb/IGameServer";

export interface IGameServers {
  gameServers(): Promise<IGameServer[]>;
  add(uri: String): Promise<void | IGameServer>;
}
