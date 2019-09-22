import { DataModelIDbGameServer, IDataModelIDbGameServer } from '../DataModel/DataModelIDbGameServer';
import { GameServerIDb } from './GameServerIDb';
import { IGameServerWithId } from "../IGameServerWithId";
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { IGameServers } from '../IGameServers';
import { IEasyLogger } from '../Logger/EasyLogger';

export class GameServersIDb implements IGameServers {
  private dataBase: FoxfmIndexedDb;

  constructor(
    source: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) {
    this.dataBase = source;
  }

  public async gameServersByUri(
    uri: String,
  ): Promise<IGameServerWithId[]> {
    this.logger.debug(`will search for game servers by uri '${uri}'`);
    let gameServers: IGameServerWithId[] = [];
    await this.dataBase
      .gameServers
      .where(`${nameof<IDataModelIDbGameServer>(o => o.uri)}`)
      .equals(uri.toString())
      .eachPrimaryKey((pk: Number) => gameServers.push(new GameServerIDb(this.dataBase, pk)));
    this.logger.debug(`number of found game servers by uri '${uri}': ${gameServers.length}`);
    return gameServers;
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
