export interface ITaskNameIDbDataModel {
  id?: String;
  name: String;
}

export class TaskIDbDataModel implements ITaskNameIDbDataModel {
  public id: String;

  constructor(
    public name: String,
  ) { }
}
