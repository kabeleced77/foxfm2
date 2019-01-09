import { ITaskName } from './ITaskName';

export interface ITaskConfiguration {
  id(): Number;
  activated(): Promise<Boolean>;
  taskName(): Promise<ITaskName>;
  executionIntervalSeconds(): Promise<Number>;
  lastExecutionsToKeep(): Promise<Number>;
}
