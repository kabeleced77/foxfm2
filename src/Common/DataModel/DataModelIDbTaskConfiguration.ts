export interface IDataModelIDbTaskConfiguration {
  id?: Number;
  activated: Boolean;
  taskNameId: Number;
  executionIntervalSeconds: Number;
}

export class DataModelIDbTaskConfiguration implements IDataModelIDbTaskConfiguration {
  public id: Number;

  constructor(
    public activated: Boolean,
    public taskNameId: Number,
    public executionIntervalSeconds: Number,
  ) { }
}
