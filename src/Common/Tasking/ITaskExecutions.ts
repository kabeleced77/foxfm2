import { IMatchdayWithId } from "../IMatchdayWithId";
import { ITaskExecution } from './ITaskExecution';
import { ITaskStatus } from './ITaskStatus';

export interface ITaskExecutions {
  all()
    : Promise<ITaskExecution[]>;

  deleteFinalised(
    taskName: String,
    lastExecutionsToKeep: Number,
  )
    : Promise<Number>;

  latest(
    taskName: String,
  ): Promise<ITaskExecution>;

  getOrAdd(
    taskName: String,
    executionStatusName: ITaskStatus,
    startDateTime: Date,
    endDateTime: Date,
    executionMatchday: IMatchdayWithId,
  ): Promise<ITaskExecution>;

  updateStatusEndDateTime(
    id: Number,
    statusName: ITaskStatus,
    endDateTime: Date,
  ): Promise<ITaskExecution>;
}
