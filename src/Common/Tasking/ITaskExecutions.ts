import { IMatchday } from '../IMatchday';
import { ITaskExecution } from './ITaskExecution';

export interface ITaskExecutions {
  all(): Promise<ITaskExecution[]>;
  latest(
    taskName: String,
  ): Promise<ITaskExecution>;
  getOrAdd(
    taskName: String,
    executionStatusName: String,
    executionDate: Date,
    executionMatchday: IMatchday,
  ): Promise<ITaskExecution>;
}
