export interface IDataModelMessagingContentImportTransfers {
  gameServerUrl: String;
  day: Number;
  season: Number;
  date: Date;
}

export class DataModelMessagingContentImportTransfers implements IDataModelMessagingContentImportTransfers {
  constructor(
    public gameServerUrl: String,
    public day: Number,
    public season: Number,
    public date: Date,
  ) { }
}
