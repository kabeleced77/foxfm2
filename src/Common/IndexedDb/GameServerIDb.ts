import { IDataModelIDbGameServer } from '../DataModel/GameServerDataModel';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { IGameServer } from '../IGameServer';

export class GameServerIDb implements IGameServer {
  private source: FoxfmIndexedDb;
  private idValue: Number;

  constructor(db: FoxfmIndexedDb, id: Number) {
    this.source = db;
    this.idValue = id;
  }

  public id(): Number {
    return this.idValue;
  }
  public uri(): Promise<String> {
    return this.source
      .gameServers
      .get(this.idValue)
      .then((result: IDataModelIDbGameServer) => result.uri);
  }
}
