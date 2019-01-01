import { IMatchday } from '../IMatchday';
import { ITaskExecution } from './ITaskExecution';

export interface ITaskExecutions {
  all()
    : Promise<ITaskExecution[]>;

  latest(
    taskName: String,
  ): Promise<ITaskExecution>;

  getOrAdd(
    taskName: String,
    executionStatusName: String,
    startDateTime: Date,
    endDateTime: Date,
    executionMatchday: IMatchday,
  ): Promise<ITaskExecution>;

  updateStatusEndDateTime(
    id: Number,
    statusName: String,
    endDateTime: Date,
  ): Promise<ITaskExecution>;
}
