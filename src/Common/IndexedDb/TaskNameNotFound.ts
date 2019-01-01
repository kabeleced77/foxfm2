import { ITaskName } from '../Tasking/ITaskName';

export class TaskNameNotFound implements ITaskName {
  constructor() { }

  public id(): Number {
    return -1;
  }
  public name(): Promise<String> {
    return new Promise(resolve => resolve("NotFound"));
  }
}
