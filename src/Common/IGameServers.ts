import { IGameServerWithId } from "./IGameServerWithId";

export interface IGameServers {
  gameServers(): Promise<IGameServerWithId[]>;
  add(uri: String): Promise<void | IGameServerWithId>;
}
