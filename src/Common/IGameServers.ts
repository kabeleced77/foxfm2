import { IGameServerWithId } from "./IGameServerWithId";

export interface IGameServers {
  gameServersByUri(uri: String): Promise<IGameServerWithId[]>;
  gameServers(): Promise<IGameServerWithId[]>;
  add(uri: String): Promise<void | IGameServerWithId>;
}
