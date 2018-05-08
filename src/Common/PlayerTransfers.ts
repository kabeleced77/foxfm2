import { PlayerTransferDateModel } from './DataModel/PlayerTransferDataModel';
import { FoxfmIndexedDb } from './IndexedDb/FoxfmIndexedDb';
import { IPlayerTransfer, PlayerTransfer } from './PlayerTransfer';

export interface IPlayerTransfers {
  playerTransfers(): Promise<IPlayerTransfer[]>;
  add(
    gameServerId: Number,
    matchdayId: Number,
    transferId: Number,
    sellingTeam: String,
    buyingTeam: String,
    name: String,
    position: String,
    age: Number,
    strength: Number,
    price: Number,
  ): Promise<void | IPlayerTransfer>;
}

export class PlayerTransfers implements IPlayerTransfers {
  private dataBase: FoxfmIndexedDb;

  constructor(source: FoxfmIndexedDb) {
    this.dataBase = source;
  }

  public playerTransfers(): Promise<IPlayerTransfer[]> {
    let vals: IPlayerTransfer[] = [];
    return this.dataBase
      .playerTransfers
      .toCollection()
      .eachPrimaryKey((pk: Number) => vals.push(new PlayerTransfer(this.dataBase, pk)))
      .then(() => vals);
  }
  public add(
    gameServerId: Number,
    matchdayId: Number,
    transferId: Number,
    sellingTeam: String,
    buyingTeam: String,
    name: String,
    position: String,
    age: Number,
    strength: Number,
    price: Number,
  ): Promise<void | IPlayerTransfer> {
    return this.dataBase
      .playerTransfers
      .add(new PlayerTransferDateModel(
        gameServerId,
        matchdayId,
        transferId,
        sellingTeam,
        buyingTeam,
        name,
        position,
        age,
        strength,
        price,
      ))
      .then(id => {
        return new PlayerTransfer(
          this.dataBase,
          id,
        );
      })
      .catch('ConstraintError',
        e => { /* accepted, no handling necessary */ })
      .catch(
        e => { throw `Could not add new player transfer: ${e}` }
      );
  }
}
