import { ITaskName } from "./ITaskName";
import { ITaskStatus } from "./ITaskStatus";
import { IMatchdayWithId } from "../IMatchdayWithId";

export interface ITaskExecution {
  id(): Number;
  taskName(): Promise<ITaskName>;
  executionStatus(): Promise<ITaskStatus>;
  startDateTime(): Promise<Date>;
  endDateTime(): Promise<Date>;
  matchday(): Promise<IMatchdayWithId>;
}
