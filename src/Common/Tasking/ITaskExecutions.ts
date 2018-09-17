import { IMatchday } from '../IMatchday';
import { ITaskExecution } from './ITaskExecution';

export interface ITaskExecutions {
  all(): Promise<ITaskExecution[]>;
  getOrAdd(
    taskName: String,
    executionStatusName: String,
    executionDate: Date,
    executionMatchday: IMatchday,
  ): Promise<ITaskExecution>;
}
