import { ITaskStatus } from './ITaskStatus';
import { ITaskName } from './ITaskName';

export interface ITaskConfiguration {
  id(): Number;
  activated(): Promise<Boolean>;
  taskName(): Promise<ITaskName>;
  lastExecutionStatus(): Promise<ITaskStatus>;
  lastExectionDate(): Promise<Date>;
  exectionIntervalSeconds(): Promise<Number>;
  updateLastExecution(status: ITaskStatus, time: Date): Promise<void>;
}
