export interface IDataModelIDbTaskStatus {
  id?: Number;
  name: String;
  final: Boolean;
}

export class DataModelIDbTaskStatus implements IDataModelIDbTaskStatus {
  public id: Number;

  constructor(
    public name: String,
    public final: Boolean,
  ) { }
}
