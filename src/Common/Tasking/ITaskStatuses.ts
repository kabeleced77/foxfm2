import { ITaskStatus } from './ITaskStatus';

export interface ITaskStatuses {
  all(): Promise<ITaskStatus[]>;
  byName(statusName: String): Promise<ITaskStatus[]>;
  getOrAdd(statusName: String, final: Boolean): Promise<ITaskStatus>;
}
