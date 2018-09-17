export interface IDataModelIDbTaskExecution {
  id?: Number;
  taskNameId: Number;
  executionStatusId: Number;
  executionDate: Date;
  matchdayId: Number;
}

export class DataModelIDbTaskExecution implements IDataModelIDbTaskExecution {
  public id: Number;

  constructor(
    public taskNameId: Number,
    public executionStatusId: Number,
    public executionDate: Date,
    public matchdayId: Number,
  ) { }
}
