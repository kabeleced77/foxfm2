import { IClub } from './IClub';

export interface IClubs {
  clubs(): Promise<IClub[]>;
  add(gameServerName: String, clubName: String, externalClubId: Number): Promise<void | IClub>;
}
