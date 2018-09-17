import { ITaskStatus } from './ITaskStatus';

export class TaskStatusFailed implements ITaskStatus {
  private statusName = "Failed";
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
