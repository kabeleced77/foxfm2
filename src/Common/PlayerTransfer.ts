import { IMatchdayDataModel } from './DataModel/MatchdayDataModel';
import { IPlayerTransferDataModel } from './DataModel/PlayerTransferDataModel';
import { GameServerIDb, IGameServer } from './IndexedDb/GameServerIDb';
import { IMatchday } from './IMatchday';
import { FoxfmIndexedDb } from './IndexedDb/FoxfmIndexedDb';
import { MatchdayIDb } from './IndexedDb/MatchdayIDb';

export interface IPlayerTransfer {
  id(): Number;
  gameServerId(): Promise<Number>;
  gameServer(): Promise<IGameServer>;
  externalTransferId(): Promise<Number>;
  matchdayId(): Promise<Number>;
  matchday(): Promise<IMatchday>;
  position(): Promise<String>;
  age(): Promise<Number>;
  strength(): Promise<Number>;
  price(): Promise<Number>;
}

export class PlayerTransfer implements IPlayerTransfer {
  private source: FoxfmIndexedDb;
  private idValue: Number;

  constructor(db: FoxfmIndexedDb, id: Number) {
    this.source = db;
    this.idValue = id;
  }

  public id(): Number {
    return this.idValue;
  }
  public gameServerId(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IPlayerTransferDataModel) => result.gameServerId);
  }

  public gameServer(): Promise<IGameServer> {
    return this.source.transaction("r", this.source.playerTransfers, this.source.gameServers, async () => {
      let transferInIdb = await this.source.playerTransfers.get(this.id());
      let gameServersInDb = this.source.gameServers.filter(gs => gs.id === transferInIdb!.gameServerId);
      if (await gameServersInDb.count() === 1) {
        return new GameServerIDb(
          this.source,
          (await gameServersInDb.first())!.id!
        );
      } else {
        throw `Transfer with matchday-id '${transferInIdb!.matchdayId}' and external transfer id '${transferInIdb!.externalTransferId}: game server id: ${transferInIdb!.gameServerId}: no game server found`;
      }
    });
  }

  public externalTransferId(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IPlayerTransferDataModel) => result.externalTransferId);
  }

  public day(): Promise<Number> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IMatchdayDataModel) => result.dayValue);
  }

  public season(): Promise<Number> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IMatchdayDataModel) => result.seasonValue);
  }

  public date(): Promise<Date> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IMatchdayDataModel) => result.dateValue);
  }

  public matchdayId(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IPlayerTransferDataModel) => result.matchdayId);
  }

  public matchday(): Promise<IMatchday> {
    return this.source.transaction("r", this.source.playerTransfers, this.source.matchdays, async () => {
      let transferInIdb = await this.source.playerTransfers.get(this.id());
      let matchdaysInDb = this.source.matchdays.filter(m => m.id === transferInIdb!.matchdayId);
      if (await matchdaysInDb.count() === 1) {
        return new MatchdayIDb(
          this.source,
          (await matchdaysInDb.first())!.id!
        );
      } else {
        throw `Transfer with matchday-id '${transferInIdb!.matchdayId}' and external transfer id '${transferInIdb!.externalTransferId}: matchday id: ${transferInIdb!.gameServerId}: no matchday found`;
      }
    });
  }

  public position(): Promise<String> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IPlayerTransferDataModel) => result.position);
  }
  public age(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IPlayerTransferDataModel) => result.age);
  }
  public strength(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IPlayerTransferDataModel) => result.strength);
  }
  public price(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IPlayerTransferDataModel) => result.price);
  }
}
