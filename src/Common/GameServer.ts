import { IGameServerDataModel } from './DataModel/GameServerDataModel';
import { FoxfmIndexedDb } from './IndexedDb/FoxfmIndexedDb';

export interface IGameServer {
  id(): Number;
  uri(): Promise<String>;
}

export class GameServer implements IGameServer {
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
      .then((result: IGameServerDataModel) => result.uri);
  }
}
