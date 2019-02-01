import { IDataModelIDbMatchday } from '../DataModel/DataModelIDbMatchday';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { IMatchday } from '../IMatchday';
import { GameServerIDb } from './GameServerIDb';
import { IGameServer } from "../IGameServer";

export class MatchdayIDb implements IMatchday {
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

  public gameServer(): Promise<IGameServer> {
    return this.source.transaction("r", this.source.matchdays, this.source.gameServers, async () => {
      let matchdayInIdb = await this.source.matchdays.get(this.id());
      let gameServersInDb = this.source.gameServers.filter(gs => gs.id === matchdayInIdb!.gameServerId);
      if (await gameServersInDb.count() === 1) {
        return new GameServerIDb(
          this.source,
          (await gameServersInDb.first())!.id!
        );
      } else {
        throw `${matchdayInIdb!.seasonValue}-${matchdayInIdb!.dayValue}: game server id: ${matchdayInIdb!.gameServerId}: no game server found`;
      }
    });
  }

  public day(): Promise<Number> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IDataModelIDbMatchday) => result.dayValue);
  }

  public season(): Promise<Number> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IDataModelIDbMatchday) => result.seasonValue);
  }

  public date(): Promise<Date> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IDataModelIDbMatchday) => result.dateValue);
  }
}
