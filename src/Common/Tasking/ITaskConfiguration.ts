import { ITaskStatus } from './ITaskStatus';

export interface ITaskConfiguration {
  id(): Number;
  activated(): Promise<Boolean>;
  taskName(): Promise<String>;
  lastExecutionStatus(): Promise<ITaskStatus>;
  lastExectionDate(): Promise<Date>;
  exectionIntervalSeconds(): Promise<Number>;
  updateLastExecution(status: ITaskStatus, time: Date): Promise<void>;
}
