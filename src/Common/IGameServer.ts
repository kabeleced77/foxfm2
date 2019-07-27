// TODO: rename to IGameServer
export interface IGameServerWithoutId {
  uri(): Promise<String>;
}

// TODO: rename to IGameServerDb and extend from IGameServer (IGameServerWithoutId)
export interface IGameServer {
  id(): Number;
  uri(): Promise<String>;
}
