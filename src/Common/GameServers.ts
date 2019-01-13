import { IGameServer } from './IndexedDb/GameServerIDb';

export interface IGameServers {
  gameServers(): Promise<IGameServer[]>;
  add(uri: String): Promise<void | IGameServer>;
}
