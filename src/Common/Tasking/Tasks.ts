import { ITask } from './ITask';
import { ITasks } from './ITasks';
import { IEasyLogger } from '../Logger/EasyLogger';
import { ITaskConfiguration } from './ITaskConfiguration';
import { ITaskConfigurations } from './ITaskConfigurations';

export class Tasks implements ITasks {
  constructor(
    private taskConfigs: ITaskConfigurations,
    private taskList: ITask[],
    private log: IEasyLogger,
  ) { }

  public async run(): Promise<void> {
    try {
      setInterval(() => {
        this.runTasks();
      }, 5000);
    } catch (e) {
      throw new Error(`Could not execute all tasks: ${e}`);
    }
  }

  private async runTasks()
    : Promise<void> {

    this.log.info(`start new tasks execution cycle`);

    for (let i = 0; i < this.taskList.length; i++) {
      const task: ITask = this.taskList[i];
      const taskName = task.name();
      const taskConfig = this.taskConfig(
        this.taskConfigs,
        taskName,
        await task.activated(),
        await task.intervalSeconds(),
      )
      let activated = await (await taskConfig).activated();
      let executionIntervalSeconds = await (await taskConfig).exectionIntervalSeconds();
      this.log.debug(`next task: name: '${taskName}'; activated: ${activated}; execution interval: ${executionIntervalSeconds} sec`);
      if (activated) {
        this.log.info(`starting: ${taskName}`);
        try {
          await task.run();
        } catch (e) {
          this.log.error(`Could not run task '${taskName}': ${e}`);
        }
      }
    }
  }

  private async taskConfig(
    taskConfigurations: ITaskConfigurations,
    name: String,
    activated: Boolean,
    executionIntervalSeconds: Number)
    : Promise<ITaskConfiguration> {

    return taskConfigurations.getOrAdd(
      name,
      activated,
      executionIntervalSeconds,
    );
  }
}
