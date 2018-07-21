import { IClub } from './IClub';

export interface IClubs {
  clubs(): Promise<IClub[]>;
  add(gameServerId: Number, name: String, externalId: Number): Promise<void | IClub>;
}
