import { IPlayer } from "./IPlayer";

export interface IPlayers {
  all(): Promise<IPlayer[]>;
}
