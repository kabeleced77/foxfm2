import { ClubDataModel } from '../DataModel/ClubDataModel';
import { IClub } from '../IClub';
import { IClubs } from '../IClubs';
import { ClubIDb } from './ClubIDb';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { IEasyLogger } from '../Logger/EasyLogger';

export class ClubsIDb implements IClubs {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) { }

  public clubs(): Promise<IClub[]> {
    let vals: IClub[] = [];
    return this.dataBase
      .clubs
      .toCollection()
      .eachPrimaryKey((pk: Number) => vals.push(new ClubIDb(this.dataBase, pk)))
      .then(() => vals);
  }
  public async add(gameServerName: String, clubName: String, externalClubId: Number): Promise<IClub> {
    return this.dataBase
      .transaction("rw", this.dataBase.gameServers, this.dataBase.clubs, async () => {
        let gameServers = this.dataBase.gameServers.filter(gs => gs.uri === gameServerName);
        if (await gameServers.count() === 1) {
          let gameServer = await gameServers.first();
          let clubsInDb = this.dataBase.clubs.filter(c =>
            true
            && c.gameServerId === gameServer!.id!
            && c.name === clubName.toString()
            && c.externalId === externalClubId
          );
          if ((await clubsInDb.count()) === 1) {
            let clubInDb = await clubsInDb.first();
            this.logger.debug(`already in IDb: club with name '${clubInDb!.name}' -> will be returned.`);
            return new ClubIDb(this.dataBase, (clubInDb!.id!));
          } else {
            return this.dataBase
              .clubs
              .add(new ClubDataModel(
                gameServer!.id!,
                clubName,
                externalClubId,
              ))
              .then(id => {
                this.logger.debug(`added to IDb: club with name '${clubName}' -> will be returned.`);
                return new ClubIDb(
                  this.dataBase,
                  id,
                );
              })
              .catch(
                e => { throw `Could not add new club to IDb'${clubName}': ${e}` }
              );
          }
        } else {
          throw `Could not add club '${clubName}' to IDb: given game server is not supported: ${gameServerName}`;
        }
      });
  }
}
