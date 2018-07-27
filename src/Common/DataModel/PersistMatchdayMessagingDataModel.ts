export interface IPersistMatchdayMessagingDataModel {
  gameServerUrl: String;
  gameSeason: Number;
  gameDay: Number;
}

export class PersistMatchdayMessagingDataModel implements IPersistMatchdayMessagingDataModel {
  constructor(
    public gameServerUrl: String,
    public gameSeason: Number,
    public gameDay: Number,
  ) { }
}
