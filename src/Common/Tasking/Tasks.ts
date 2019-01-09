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
import { ITaskConfiguration } from './ITaskConfiguration';

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
        await task.lastExecutionsToKeep(),
      );
      let activated = await taskConfig.activated();

      if (activated) {
        let executionIntervalSeconds = await taskConfig.executionIntervalSeconds();
        let currentExecutionStatusName = await this.currentExecutionStatusName(taskName);
        this.log.debug(`next task: '${taskName}'; activated: ${activated}; interval: ${executionIntervalSeconds} sec; current status: ${currentExecutionStatusName}`);
        await this.runTask(currentExecutionStatusName, taskName, task.run(), await taskConfig.lastExecutionsToKeep());
      }
    }
  }

  private removeOldTaskExecutions(taskName: String, lastExecutionsToKeep: Number): any {
    this.taskExecutions.deleteFinalised(taskName, lastExecutionsToKeep);
  }

  private async runTask(
    currentExecutionStatusName: String,
    taskName: String,
    task: Promise<void>,
    lastExecutionsToKeep: Number,
  ): Promise<void> {

    if (!(currentExecutionStatusName.match((await new TaskStatusRunning().name()).toString()))) {
      this.log.info(`starting: ${taskName}`);
      const exec = await this.taskExecutions.getOrAdd(taskName, new TaskStatusRunning(), new Date(), new Date(8640000000000000), this.matchday);
      try {
        await task;
        await this.taskExecutions.updateStatusEndDateTime(exec.id(), new TaskStatusExecuted(), new Date());
      }
      catch (e) {
        await this.taskExecutions.updateStatusEndDateTime(exec.id(), new TaskStatusFailed(), new Date());
        await this.removeOldTaskExecutions(taskName, lastExecutionsToKeep);
        throw e;
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
