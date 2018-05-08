import { IMatchdayDataModel } from "./DataModel/MatchdayDataModel";
import { FoxfmIndexedDb } from "./IndexedDb/FoxfmIndexedDb";
import { IPlayerTransferDataModel } from "./DataModel/PlayerTransferDataModel";

export interface IPlayerTransfer {
  id(): Number;
  gameServerId(): Promise<Number>;
  matchdayId(): Promise<Number>;
  position(): Promise<String>;
  age(): Promise<Number>;
  strength(): Promise<Number>;
  prics(): Promise<Number>;
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
  public matchdayId(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IPlayerTransferDataModel) => result.matchdayId);
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
  public prics(): Promise<Number> {
    return this.source
      .playerTransfers
      .get(this.idValue)
      .then((result: IPlayerTransferDataModel) => result.price);
  }
}
