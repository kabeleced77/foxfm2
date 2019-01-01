import { ITask } from './ITask';

export interface ITasks {
  run(): Promise<void>;
}
