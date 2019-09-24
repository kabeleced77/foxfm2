import { IDataModelIDbMatchday } from '../DataModel/DataModelIDbMatchday';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { IMatchdayWithId } from "../IMatchdayWithId";
import { GameServerIDb } from './GameServerIDb';
import { IGameServerWithId } from "../IGameServerWithId";

export class MatchdayIDb implements IMatchdayWithId {
  constructor(
    private source: FoxfmIndexedDb,
    private idValue: Number,
  ) {
  }

  public id(): Number {
    return this.idValue;
  }

  public gameServerId(): Promise<Number> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IDataModelIDbMatchday) => result.gameServerId);
  }

  public gameServer(): Promise<IGameServerWithId> {
    return this.source.transaction("r", this.source.matchdays, this.source.gameServers, async () => {
      let matchdayInIdb = await this.source.matchdays.get(this.id());
      let gameServersInDb = this.source.gameServers.filter(gs => gs.id === matchdayInIdb!.gameServerId);
      if (await gameServersInDb.count() === 1) {
        return new GameServerIDb(
          this.source,
          (await gameServersInDb.first())!.id!
        );
      } else {
        throw `${matchdayInIdb!.season}-${matchdayInIdb!.day}: game server id: ${matchdayInIdb!.gameServerId}: no game server found`;
      }
    });
  }

  public day(): Promise<Number> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IDataModelIDbMatchday) => result.day);
  }

  public season(): Promise<Number> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IDataModelIDbMatchday) => result.season);
  }

  public date(): Promise<Date> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IDataModelIDbMatchday) => result.date);
  }
  public async toString(): Promise<String> {
    const server = this.gameServer();
    const season = await this.season();
    const day = await this.day();
    return new Promise(() => { return `Matchday['${server}':${season}-${day}]`; });
  }
}
