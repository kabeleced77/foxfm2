import { ITaskExecution } from '../Tasking/ITaskExecution';
import { ITaskName } from '../Tasking/ITaskName';
import { ITaskStatus } from '../Tasking/ITaskStatus';
import { IMatchday } from '../IMatchday';
import { TaskNameNotFound } from './TaskNameNotFound';
import { TaskStatusUnknown } from '../Tasking/TaskStatusUnknown';

export class TaskExecutionNotFound implements ITaskExecution {
  constructor() { }

  public id(): Number {
    return -1;
  }
  public taskName(): Promise<ITaskName> {
    return new Promise(resolve => resolve(new TaskNameNotFound()));
  }
  public executionStatus(): Promise<ITaskStatus> {
    return new Promise(resolve => resolve(new TaskStatusUnknown()));
  }
  public startDateTime(): Promise<Date> {
    return new Promise(resolve => resolve(new Date(-8640000000000000)));
  }
  public endDateTime(): Promise<Date> {
    return new Promise(resolve => resolve(new Date(-8640000000000000)));
  }
  public matchday(): Promise<IMatchday> {
    throw new Error("Method not implemented.");
  }
}
