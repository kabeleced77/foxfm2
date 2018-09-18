import { ITaskName } from './ITaskName';

export interface ITaskConfiguration {
  id(): Number;
  activated(): Promise<Boolean>;
  taskName(): Promise<ITaskName>;
  exectionIntervalSeconds(): Promise<Number>;
}
