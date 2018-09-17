import { ITaskName } from "./ITaskName";
import { ITaskStatus } from "./ITaskStatus";

export interface ITaskExecution {
  id(): Number;
  taskName(): Promise<ITaskName>;
  executionStatus(): Promise<ITaskStatus>;
  exectionDate(): Promise<Date>;
}
