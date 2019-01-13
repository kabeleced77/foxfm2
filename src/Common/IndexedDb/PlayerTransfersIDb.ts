import { PlayerTransferDateModel } from '../DataModel/PlayerTransferDataModel';
import { IPlayerTransfers } from '../IPlayerTransfers';
import { PlayerTransfer } from '../PlayerTransfer';
import { IPlayerTransfer } from "../IPlayerTransfer";
import { FoxfmIndexedDb } from './FoxfmIndexedDb';

export class PlayerTransfersIDb implements IPlayerTransfers {
  constructor(
    private dataBase: FoxfmIndexedDb,
  ) { }

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
    externalTransferId: Number,
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
        externalTransferId,
        position,
        age,
        strength,
        price,
      ))
      .then(id => {
        return new PlayerTransfer(this.dataBase, id);
      })
      .catch('ConstraintError', e => { })
      .catch(e => { throw `Could not add new player transfer: ${e}`; });
  }
}
