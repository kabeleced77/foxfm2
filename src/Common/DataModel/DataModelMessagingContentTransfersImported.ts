export interface IDataModelMessagingContentTransfersImported {
  gameServerUrl: String,
  day: Number,
  season: Number,
  date: Date,
}

export class DataModelMessagingContentTransfersImported implements IDataModelMessagingContentTransfersImported {
  constructor(
    public gameServerUrl: String,
    public day: Number,
    public season: Number,
    public date: Date,
  ) { }
}
