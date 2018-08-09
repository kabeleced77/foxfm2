import { ITaskStatus } from './ITaskStatus';

export class TaskStatusSuccessful implements ITaskStatus {
  private statusName = "Successful";
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
