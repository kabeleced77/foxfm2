export interface IDataModelIDbTaskConfiguration {
  id?: Number;
  activated: Boolean;
  taskName: String;
  lastExecutionStatusId: Number;
  lastExecutionDate: Date;
  executionIntervalSeconds: Number;
}

export class DataModelIDbTaskConfiguration implements IDataModelIDbTaskConfiguration {
  public id: Number;

  constructor(
    public activated: Boolean,
    public taskName: String,
    public lastExecutionStatusId: Number,
    public lastExecutionDate: Date,
    public executionIntervalSeconds: Number,
  ) { }
}
