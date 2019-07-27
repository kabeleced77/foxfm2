import { IGameServerWithoutId } from "./IGameServer";

export class GameServerConst implements IGameServerWithoutId {
  constructor(
    private readonly msUri: String,
  ) { }

  public async uri(): Promise<String> {
    return this.msUri;
  }
}
