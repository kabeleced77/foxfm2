import { ITaskName } from './ITaskName';

export interface ITaskNames {
  all(): Promise<ITaskName[]>;
  getOrAdd(taskName: String): Promise<ITaskName>;
}
