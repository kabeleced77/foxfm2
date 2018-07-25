export interface IPersistedClubMessagingDataModel {
  id: Number;
  gameServerUrl: String;
  name: String;
  externalId: Number;
}

export class PersistClubMessagingDataModel implements IPersistedClubMessagingDataModel {
  constructor(
    public id: Number,
    public gameServerUrl: String,
    public name: String,
    public externalId: Number,
  ) { }
}
