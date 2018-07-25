export interface IPersistedClubMessagingDataModel {
  id: Number;
  gameServerUrl: String;
  name: String;
  externalId: Number;
}

export class PersistClubMessagingDataModel implements IPersistedClubMessagingDataModel {
  public id: Number;
  public gameServerUrl: String;
  public name: String;
  public externalId: Number;

  constructor(
    id: Number,
    gameServerUrl: String,
    name: String,
    externalId: Number,
  ) {
    this.id = id;
    this.gameServerUrl = gameServerUrl;
    this.name = name;
    this.externalId = externalId;
  }
}
