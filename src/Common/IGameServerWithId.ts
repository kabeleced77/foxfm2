import { IGameServer } from "./IGameServer";
export interface IGameServerWithId extends IGameServer {
  id(): Number;
}
