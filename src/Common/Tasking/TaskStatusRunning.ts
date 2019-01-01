import { ITaskStatus } from './ITaskStatus';

export class TaskStatusRunning implements ITaskStatus {
  private statusName = "Running";
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
