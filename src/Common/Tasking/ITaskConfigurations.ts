import { ITaskConfiguration } from './ITaskConfiguration';

export interface ITaskConfigurations {
  all(): Promise<ITaskConfiguration[]>;
  add(
    taskName: String,
    activated: Boolean,
    lastExecutionTaskStatusName: String,
    lastExecutionDate: Date,
    intervalSeconds: Number,
  ): Promise<ITaskConfiguration>;
  byTaskName(
    taskName: String,
  ): Promise<ITaskConfiguration[]>;
  getOrAdd(
    taskName: String,
    activated: Boolean,
    lastExecutionTaskStatusName: String,
    lastExecutionDate: Date,
    intervalSeconds: Number,
  ): Promise<ITaskConfiguration>;
}
