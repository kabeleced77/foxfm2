import { IMatchday } from './IMatchday';

export interface IMatchdays {
  matchdays(
    season?: Number,
  ): Promise<IMatchday[]>;
  add(
    gameServerName: String,
    gameSeason: Number,
    gameDay: Number,
    date: Date,
  ): Promise<IMatchday>;
}
