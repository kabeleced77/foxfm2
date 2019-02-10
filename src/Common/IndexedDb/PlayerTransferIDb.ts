import { IDataModelIDbMatchday } from '../DataModel/DataModelIDbMatchday';
import { IDataModelIDbPlayerTransfer } from '../DataModel/DataModelIDbPlayerTransfer';
import { IMatchday } from '../IMatchday';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { MatchdayIDb } from './MatchdayIDb';
import { IPlayerTransfer } from '../IPlayerTransfer';

export class PlayerTransferIDb implements IPlayerTransfer {
  private source: FoxfmIndexedDb;
  private idValue: Number;

  constructor(db: FoxfmIndexedDb, id: Number) {
    this.source = db;
    this.idValue = id;
  }

  public id(): Number {
    return this.idValue;
  }

  public externalTransferId(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IDataModelIDbPlayerTransfer) => result.externalTransferId);
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

  public matchdayId(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IDataModelIDbPlayerTransfer) => result.matchdayId);
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
        throw `Transfer with matchday-id '${transferInIdb!.matchdayId}' and external transfer id '${transferInIdb!.externalTransferId}: no matchday found`;
      }
    });
  }

  public position(): Promise<String> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IDataModelIDbPlayerTransfer) => result.position);
  }
  public age(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IDataModelIDbPlayerTransfer) => result.age);
  }
  public strength(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IDataModelIDbPlayerTransfer) => result.strength);
  }
  public price(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IDataModelIDbPlayerTransfer) => result.price);
  }
}
