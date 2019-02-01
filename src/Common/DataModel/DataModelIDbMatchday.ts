export interface IDataModelIDbMatchday {
  id?: Number;
  gameServerId: Number;
  day: Number;
  season: Number;
  date: Date;
}

export class DataModelIDbMatchday implements IDataModelIDbMatchday {
  public id: Number;

  constructor(
    public gameServerId: Number,
    public season: Number,
    public day: Number,
    public date: Date,
  ) { }
}
