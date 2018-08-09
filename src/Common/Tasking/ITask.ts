import { ITaskStatus } from './ITaskStatus';

export interface ITask {
  name(): Promise<String>;
  run(): void;
}
