import { IGameServer } from "./IGameServer";

export class GameServerConst implements IGameServer {
  constructor(
    private readonly msUri: String,
  ) { }

  public async uri(): Promise<String> {
    return this.msUri;
  }
}
