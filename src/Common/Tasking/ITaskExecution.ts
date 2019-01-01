import { ITaskName } from "./ITaskName";
import { ITaskStatus } from "./ITaskStatus";
import { IMatchday } from "../IMatchday";

export interface ITaskExecution {
  id(): Number;
  taskName(): Promise<ITaskName>;
  executionStatus(): Promise<ITaskStatus>;
  startDateTime(): Promise<Date>;
  endDateTime(): Promise<Date>;
  matchday(): Promise<IMatchday>;
}
