import { IEasyLogger } from '../Logger/EasyLogger';
import { ITask } from './ITask';
import { ITaskConfiguration } from './ITaskConfiguration';
import { ITaskConfigurations } from './ITaskConfigurations';
import { ITaskStatus } from './ITaskStatus';
import { TaskStatusSuccessful } from './TaskStatusSuccessful';

export class Task implements ITask {
  private cacheTaskConfig: ITaskConfiguration;

  constructor(
    private taskConfigs: ITaskConfigurations,
    private taskName: String,
    private activated: Boolean,
    private lastExecutionStatus: ITaskStatus,
    private lastExecutionTime: Date,
    private executionIntervalSeconds: Number,
    private log: IEasyLogger,
  ) { }

  public async name(): Promise<String> {
    return (await this.taskConfig()).taskName();
  }

  public async run(): Promise<void> {
    let taskConfig = await this.taskConfig();
    let taskName = await taskConfig.taskName();
    let activated = await taskConfig.activated();
    let lastExecutionTime = await taskConfig.lastExectionDate();
    let lastExecutionState = await taskConfig.lastExecutionStatus();
    let executionIntervalSeconds = await taskConfig.exectionIntervalSeconds();
    let nextExecution = new Date(lastExecutionTime.getTime() + (1000 * executionIntervalSeconds.valueOf()));

    this.log.debug(`name: ${taskName};activated: ${activated}; last execution state: ${await lastExecutionState.name()}; last execution: ${await lastExecutionTime}; execution interval (sec): ${executionIntervalSeconds}; next execution: ${nextExecution}`);

    let now = new Date();
    if (
      true
      && activated
      && (!(await lastExecutionState.name()).match((await new TaskStatusSuccessful().name()).toString())
        || nextExecution <= now)) {
      this.log.debug(`${taskName}: started execution of task`);
      await taskConfig.updateLastExecution(new TaskStatusSuccessful(), now);
    }
  }

  private async taskConfig(): Promise<ITaskConfiguration> {
    if (this.cacheTaskConfig === undefined) {
      // fill cache
      this.log.debug(`fill caching object with new task configuration`);
      this.cacheTaskConfig = await this.taskConfigs.add(
        this.taskName,
        this.activated,
        await this.lastExecutionStatus.name(),
        this.lastExecutionTime,
        this.executionIntervalSeconds,
      );
    } else {
      this.log.debug(`using cached object`);
    }
    return this.cacheTaskConfig;
  }
}
