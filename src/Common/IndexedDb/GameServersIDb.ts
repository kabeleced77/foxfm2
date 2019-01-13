import { GameServerDataModel } from '../DataModel/GameServerDataModel';
import { GameServerIDb } from './GameServerIDb';
import { IGameServer } from "../IGameServer";
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { IGameServers } from '../IGameServers';

export class GameServersIDb implements IGameServers {
  private dataBase: FoxfmIndexedDb;

  constructor(
    source: FoxfmIndexedDb,
  ) {
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
      .add(new GameServerDataModel(name))
      .then(id => {
        return new GameServerIDb(this.dataBase, id);
      })
      .catch('ConstraintError', e => { })
      .catch(e => { throw `Could not add new game server: ${e}`; });
  }
}
