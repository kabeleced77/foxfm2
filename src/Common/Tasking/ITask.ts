import { ITaskName } from './ITaskName';

export interface ITask {
  name(): String;
  activated(): Boolean;
  intervalSeconds(): Number;
  run(): Promise<void>;
}
