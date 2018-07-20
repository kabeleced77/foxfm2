import { IMatchday } from './IMatchday';

export interface IMatchdays {
  matchdays(): Promise<IMatchday[]>;
  add(gameServerId: Number, day: Number, season: Number, date: Date): Promise<void | IMatchday>;
}
