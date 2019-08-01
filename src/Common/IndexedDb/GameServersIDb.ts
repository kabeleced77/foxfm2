import { DataModelIDbGameServer } from '../DataModel/DataModelIDbGameServer';
import { GameServerIDb } from './GameServerIDb';
import { IGameServerWithId } from "../IGameServerWithId";
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { IGameServers } from '../IGameServers';

export class GameServersIDb implements IGameServers {
  private dataBase: FoxfmIndexedDb;

  constructor(
    source: FoxfmIndexedDb,
  ) {
    this.dataBase = source;
  }

  public gameServers(): Promise<IGameServerWithId[]> {
    let vals: IGameServerWithId[] = [];
    return this.dataBase
      .gameServers
      .toCollection()
      .eachPrimaryKey((pk: Number) => vals.push(new GameServerIDb(this.dataBase, pk)))
      .then(() => vals);
  }

  public add(name: String): Promise<void | IGameServerWithId> {
    return this.dataBase
      .gameServers
      .add(new DataModelIDbGameServer(name))
      .then(id => {
        return new GameServerIDb(this.dataBase, id);
      })
      .catch('ConstraintError', e => { })
      .catch(e => { throw `Could not add new game server: ${e}`; });
  }
}
