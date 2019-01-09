import { ITaskStatus } from './ITaskStatus';

export class TaskStatusUnknown implements ITaskStatus {
  constructor() { }

  public id(): Number {
    throw new Error("Method not implemented.");
  }

  public name(): Promise<String> {
    return new Promise((resolve) => resolve("Unknown"));
  }

  public final(): Promise<Boolean> {
    return new Promise((resolve) => resolve(false));
  }
}
