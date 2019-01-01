import { ITaskStatus } from './ITaskStatus';

export class TaskStatusExecuted implements ITaskStatus {
  private statusName = "Executed";
  constructor() { }

  public id(): Number {
    throw new Error("Method not implemented.");
  }

  public name(): Promise<String> {
    return new Promise((resolve, reject) => {
      resolve(this.statusName);
    });
  }
}
