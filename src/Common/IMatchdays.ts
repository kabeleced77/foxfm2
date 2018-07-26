import { IMatchday } from './IMatchday';

export interface IMatchdays {
  matchdays(): Promise<IMatchday[]>;
  add(gameServerName: String, gameSeason: Number, gameDay: Number, date: Date): Promise<void | IMatchday>;
}
