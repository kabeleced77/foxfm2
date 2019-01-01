import { ITask } from './ITask';
import { ITasks } from './ITasks';
import { IEasyLogger } from '../Logger/EasyLogger';
import { ITaskConfigurations } from './ITaskConfigurations';
import { ITaskStatus } from './ITaskStatus';
import { TaskStatusFailed } from './TaskStatusFailed';
import { ITaskExecutions } from './ITaskExecutions';
import { IMatchday } from '../IMatchday';
import { TaskStatusRunning } from './TaskStatusRunning';
import { TaskStatusExecuted } from './TaskStatusExecuted';

export class Tasks implements ITasks {
  constructor(
    private taskConfigs: ITaskConfigurations,
    private taskExecutions: ITaskExecutions,
    private matchday: IMatchday,
    private taskList: ITask[],
    private log: IEasyLogger,
  ) { }

  public async run(): Promise<void> {
    setInterval(() =>
      this.runTasks()
        .catch(e => {
          this.log.error(`Error running tasks in 'setInterval()': ${e.stack}`);
        })
      , 2000);
  }

  private async runTasks()
    : Promise<void> {

    this.log.info(`start new tasks execution cycle`);
    for (let i = 0; i < this.taskList.length; i++) {
      const task: ITask = this.taskList[i];
      const taskName = task.name();
      const taskConfig = await this.taskConfigs.getOrAdd(
        taskName,
        await task.activated(),
        await task.intervalSeconds(),
      );

      let activated = await taskConfig.activated();
      let executionIntervalSeconds = await taskConfig.exectionIntervalSeconds();
      let currentExecutionStatusName = await this.currentExecutionStatusName(taskName);
      this.log.debug(`next task: '${taskName}'; activated: ${activated}; interval: ${executionIntervalSeconds} sec; current status: ${currentExecutionStatusName}`);
      if (activated && !(currentExecutionStatusName.match((await new TaskStatusRunning().name()).toString()))) {
        this.log.info(`starting: ${taskName}`);
        const exec = await this.taskExecutions.getOrAdd(
          taskName,
          await new TaskStatusRunning().name(),
          new Date(),
          new Date(8640000000000000),
          this.matchday,
        );

        try {
          await task.run();
          await this.taskExecutions.updateStatusEndDateTime(
            exec.id(),
            await new TaskStatusExecuted().name(),
            new Date(),
          );
        } catch (e) {
          this.taskExecutions.updateStatusEndDateTime(
            exec.id(),
            await new TaskStatusFailed().name(),
            new Date(),
          );
          throw e;
        }
      }
    }
  }

  private async currentExecutionStatusName(taskName: String): Promise<String> {
    let currentExecutionStatus: ITaskStatus = new TaskStatusExecuted();
    const currentExecution = await this.taskExecutions.latest(taskName);
    if (currentExecution.id() != -1) {
      currentExecutionStatus = await currentExecution.executionStatus();
    }
    return currentExecutionStatus.name();
  }
}
