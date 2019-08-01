import { IMatchdayWithId } from "./IMatchdayWithId";

export interface IMatchdays {
  matchdays(
    season?: Number,
  ): Promise<IMatchdayWithId[]>;
  add(
    gameServerName: String,
    gameSeason: Number,
    gameDay: Number,
    date: Date,
  ): Promise<IMatchdayWithId>;
}
