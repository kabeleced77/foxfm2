import { ITaskName } from './ITaskName';

export interface ITask {
  name(): Promise<ITaskName>;
  run(): void;
}
