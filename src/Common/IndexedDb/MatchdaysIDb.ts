import { DataModelIDbMatchday, IDataModelIDbMatchday } from '../DataModel/DataModelIDbMatchday';
import { IMatchdayWithId } from "../IMatchdayWithId";
import { IMatchdays } from '../IMatchdays';
import { IEasyLogger } from '../Logger/EasyLogger';
import { FoxfmIndexedDb } from './FoxfmIndexedDb';
import { MatchdayIDb } from './MatchdayIDb';
import { IGameServerWithId } from '../IGameServerWithId';

export class MatchdaysIDb implements IMatchdays {
  constructor(
    private dataBase: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) { }

  public matchdays(season?: Number): Promise<IMatchdayWithId[]> {
    const seasonMin = season === undefined ? 0 : season;
    const seasonMax = season === undefined ? Number.MAX_SAFE_INTEGER : season.valueOf();
    let mds: IMatchdayWithId[] = [];
    return this.dataBase
      .matchdays
      .where(nameof<IDataModelIDbMatchday>(o => o.season))
      .between(seasonMin.valueOf(), seasonMax.valueOf(), true, true)
      .eachPrimaryKey((pk: Number) => mds.push(new MatchdayIDb(this.dataBase, pk)))
      .then(() => mds);
  }

  public async matchdaysByServerSeasonDay(
    gameServer: IGameServerWithId,
    season: Number,
    day: Number,
  ): Promise<IMatchdayWithId[]> {
    const serverUrl = await gameServer.uri();
    const serverId = gameServer.id();
    this.logger.debug(`will search for matchdays by game server '${serverUrl}(Id:${serverId})', season '${season}' and day '${day}'`);
    let mds: IMatchdayWithId[] = [];
    await this.dataBase
      .matchdays
      .where(`[${nameof<IDataModelIDbMatchday>(o => o.gameServerId)}+${nameof<IDataModelIDbMatchday>(o => o.season)}+${nameof<IDataModelIDbMatchday>(o => o.day)}]`)
      .equals([serverId.valueOf(), season.valueOf(), day.valueOf()])
      .eachPrimaryKey((pk: Number) => mds.push(new MatchdayIDb(this.dataBase, pk)));
    this.logger.debug(`number of found matchdays by game server '${serverUrl}(Id:${serverId})', season '${season}' and day '${day}': ${mds.length}`);
    return mds;
  }

  public add(gameServerUri: String, gameSeason: Number, gameDay: Number, date: Date): Promise<IMatchdayWithId> {
    return this.dataBase
      .transaction("rw", this.dataBase.gameServers, this.dataBase.matchdays, async () => {
        let gameServers = this.dataBase.gameServers.filter(gs => gs.uri === gameServerUri);
        if (await gameServers.count() === 1) {
          let gameServer = await gameServers.first();
          let matchdaysInDb = this.dataBase.matchdays.filter(m =>
            true
            && m.gameServerId === gameServer!.id!
            && m.season === gameSeason
            && m.day === gameDay
          );
          if (await matchdaysInDb.count() === 1) {
            let matchdayInDb = await matchdaysInDb!.first();
            this.logger.debug(`already in IDb: matchday: '${JSON.stringify(matchdayInDb)}'`);
            return new MatchdayIDb(this.dataBase, (matchdayInDb!.id!));
          } else {
            return this.dataBase
              .matchdays
              .add(new DataModelIDbMatchday(
                gameServer!.id!,
                gameSeason,
                gameDay,
                date,
              ))
              .then(id => {
                this.logger.debug(`added to IDb: new matchday: '${gameServerUri} ${gameSeason}-${gameDay}'`);
                return new MatchdayIDb(
                  this.dataBase,
                  id,
                );
              })
              .catch(
                e => { throw `Could not add new matchday to IDb: '${gameServerUri} ${gameSeason}-${gameDay}': ${e}` }
              );
          }
        } else {
          throw `Could not add matchday to IDb: '${gameServerUri} ${gameSeason}-${gameDay}': given game server is not supported: ${gameServerUri}`;
        }
      });
  }
}
