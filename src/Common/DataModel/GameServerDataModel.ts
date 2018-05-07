export interface IGameServerDataModel {
  id?: Number;
  uri: String;
}

export class GameServerDataModel implements IGameServerDataModel {
  public id: Number;
  public uri: String;

  constructor(
    uri: String,
  ) {
    this.uri = uri;
  }
}
