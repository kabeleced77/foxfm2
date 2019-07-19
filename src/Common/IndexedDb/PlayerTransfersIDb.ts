import { DataModelIDbPlayerTransfer, IDataModelIDbPlayerTransfer } from '../DataModel/DataModelIDbPlayerTransfer';
import { IPlayerTransfers } from '../IPlayerTransfers';
import { PlayerTransferIDb } from './PlayerTransferIDb';
import { IPlayerTransfer } from "../IPlayerTransfer";
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { PlayerCategory } from '../PlayerCategory';

export class PlayerTransfersIDb implements IPlayerTransfers {
  constructor(
    private dataBase: FoxfmIndexedDb,
  ) { }

  public all(): Promise<IPlayerTransfer[]> {
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

  async average(
    gameServerUri: String,
    position: String,
    age: Number,
    strength: Number,
  ): Promise<Number> {

    let sumOfAllTransfers = 0;
    let countOfAllTransfers = 0;

    let gameServers = this.dataBase.gameServers.where('uri').equals(gameServerUri.toString());
    if (await gameServers.count() == 1) {
      let gameServerId = (await gameServers.first())!.id!;
      await this.dataBase
        .playerTransfers
        .where(`[${nameof<IDataModelIDbPlayerTransfer>(o => o.gameServerId)}+${nameof<IDataModelIDbPlayerTransfer>(o => o.position)}+${nameof<IDataModelIDbPlayerTransfer>(o => o.age)}+${nameof<IDataModelIDbPlayerTransfer>(o => o.strength)}]`)
        .equals([gameServerId.valueOf(), position.toString(), age.valueOf(), strength.valueOf()])
        .each(transfer => {
          countOfAllTransfers++;
          sumOfAllTransfers += transfer.price.valueOf();
        });
    } else {
      console.warn(`Could not calculate average transfer price: invalid game server uri: ${gameServerUri}`);
    }

    return Math.round(countOfAllTransfers == 0 ? 0 : sumOfAllTransfers / countOfAllTransfers);
  }

  public async averages(
    gameServerUri: String,
    positions: String[],
    minAge: number,
    maxAge: number,
    minStrength: number,
    maxStrength: number,
  ): Promise<{}> {
    let cAverages = {};
    await Promise.all(positions
      .map(async position => {
        for (let age = minAge; age < maxAge; age++) {
          for (let strength = minStrength; strength < maxStrength; strength++) {
            const average = await this.average(
              gameServerUri,
              position,
              age,
              strength,
            );
            const category = new PlayerCategory(
              position,
              age,
              strength,
            );
            if (average > 0) {
              cAverages[JSON.stringify(category)] = average;
            }
          }
        }
      }));
    return cAverages;
  }
}
