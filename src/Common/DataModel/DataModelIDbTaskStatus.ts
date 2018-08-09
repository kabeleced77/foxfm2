export interface IDataModelIDbTaskStatus {
  id?: Number;
  name: String;
}

export class DataModelIDbTaskStatus implements IDataModelIDbTaskStatus {
  public id: Number;

  constructor(
    public name: String,
  ) { }
}
