import { GameServerDataModel } from './DataModel/GamerServerDataModel';
import { GameServer, IGameServer } from './GameServer';
import { FoxfmIndexedDb } from './IndexedDb/FoxfmIndexedDb';

export interface IGameServers {
  gameServers(): Promise<IGameServer[]>;
  add(uri: String): Promise<void | IGameServer>;
}

export class Clubs implements IGameServers {
  private dataBase: FoxfmIndexedDb;

  constructor(source: FoxfmIndexedDb) {
    this.dataBase = source;
  }

  public gameServers(): Promise<IGameServer[]> {
    let vals: IGameServer[] = [];
    return this.dataBase
      .gameServer
      .toCollection()
      .eachPrimaryKey((pk: Number) => vals.push(new GameServer(this.dataBase, pk)))
      .then(() => vals);
  }
  public add(name: String): Promise<void | IGameServer> {
    return this.dataBase
      .gameServer
      .add(new GameServerDataModel(
        name,
      ))
      .then(id => {
        return new GameServer(
          this.dataBase,
          id,
        );
      })
      .catch('ConstraintError',
        e => { /* accepted, no handling necessary */ })
      .catch(
        e => { throw `Could not add new game server: ${e}` }
      );
  }
}
