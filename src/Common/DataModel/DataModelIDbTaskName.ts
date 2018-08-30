export interface IDataModelIDbTaskName {
  id?: Number;
  name: String;
}

export class DataModelIDbTaskName implements IDataModelIDbTaskName {
  public id: Number;

  constructor(
    public name: String,
  ) { }
}
