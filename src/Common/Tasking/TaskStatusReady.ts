import { ITaskStatus } from './ITaskStatus';

export class TaskStatusReady implements ITaskStatus {
  private statusName = "Ready";
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
