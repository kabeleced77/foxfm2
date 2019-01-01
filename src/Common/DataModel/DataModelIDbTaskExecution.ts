export interface IDataModelIDbTaskExecution {
  id?: Number;
  taskNameId: Number;
  taskStatusId: Number;
  startDateTime: Date;
  endDateTime: any;
  matchdayId: Number;
}

export class DataModelIDbTaskExecution implements IDataModelIDbTaskExecution {
  public id: Number;

  constructor(
    public taskNameId: Number,
    public taskStatusId: Number,
    public startDateTime: Date,
    public endDateTime: Date,
    public matchdayId: Number,
  ) { }
}
