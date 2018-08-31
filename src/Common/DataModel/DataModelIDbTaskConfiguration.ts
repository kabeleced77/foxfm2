export interface IDataModelIDbTaskConfiguration {
  id?: Number;
  activated: Boolean;
  taskNameId: Number;
  lastExecutionStatusId: Number;
  lastExecutionDate: Date;
  executionIntervalSeconds: Number;
}

export class DataModelIDbTaskConfiguration implements IDataModelIDbTaskConfiguration {
  public id: Number;

  constructor(
    public activated: Boolean,
    public taskNameId: Number,
    public lastExecutionStatusId: Number,
    public lastExecutionDate: Date,
    public executionIntervalSeconds: Number,
  ) { }
}
