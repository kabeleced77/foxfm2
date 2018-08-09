export interface ITaskStatus {
  id(): Number;
  name(): Promise<String>;
}

export class TaskStatus implements ITaskStatus {
  id(): Number {
    throw new Error("Method not implemented.");
  }
  constructor(
    private nameValue: String,
  ) { }

  public name(): Promise<String> {
    return new Promise(() => this.nameValue);
  }
}
