import { GameServerDataModel } from './DataModel/GameServerDataModel';
import { GameServerIDb, IGameServer } from './IndexedDb/GameServerIDb';
import { FoxfmIndexedDb } from './IndexedDb/FoxfmIndexedDb';

export interface IGameServers {
  gameServers(): Promise<IGameServer[]>;
  add(uri: String): Promise<void | IGameServer>;
}

export class GameServersIDb implements IGameServers {
  private dataBase: FoxfmIndexedDb;

  constructor(source: FoxfmIndexedDb) {
    this.dataBase = source;
  }

  public gameServers(): Promise<IGameServer[]> {
    let vals: IGameServer[] = [];
    return this.dataBase
      .gameServers
      .toCollection()
      .eachPrimaryKey((pk: Number) => vals.push(new GameServerIDb(this.dataBase, pk)))
      .then(() => vals);
  }
  public add(name: String): Promise<void | IGameServer> {
    return this.dataBase
      .gameServers
      .add(new GameServerDataModel(
        name,
      ))
      .then(id => {
        return new GameServerIDb(
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
