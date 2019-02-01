export interface IDataModelIDbGameServer {
  id?: Number;
  uri: String;
}

export class DataModelIDbGameServer implements IDataModelIDbGameServer {
  public id: Number;
  public uri: String;

  constructor(
    uri: String,
  ) {
    this.uri = uri;
  }
}
