export interface IGameServer {
  id(): Number;
  uri(): Promise<String>;
}
