import { DataModelIDbPlayerTransfer } from '../DataModel/DataModelIDbPlayerTransfer';
import { IPlayerTransfers } from '../IPlayerTransfers';
import { PlayerTransferIDb } from './PlayerTransferIDb';
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
      .eachPrimaryKey((pk: Number) => vals.push(new PlayerTransferIDb(this.dataBase, pk)))
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
      .add(new DataModelIDbPlayerTransfer(
        gameServerId,
        matchdayId,
        externalTransferId,
        position,
        age,
        strength,
        price,
      ))
      .then(id => {
        return new PlayerTransferIDb(this.dataBase, id);
      })
      .catch('ConstraintError', e => { })
      .catch(e => { throw `Could not add new player transfer: ${e}`; });
  }
}
