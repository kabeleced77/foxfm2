import { IMatchdayWithId } from "./IMatchdayWithId";
import { IGameServerWithId } from "./IGameServerWithId";

export interface IMatchdays {
  matchdays(
    season?: Number,
  ): Promise<IMatchdayWithId[]>;
  matchdaysByServerSeasonDay(
    gameServer: IGameServerWithId,
    season: Number,
    day: Number,
  ): Promise<IMatchdayWithId[]>;
  add(
    gameServerName: String,
    gameSeason: Number,
    gameDay: Number,
    date: Date,
  ): Promise<IMatchdayWithId>;
}
