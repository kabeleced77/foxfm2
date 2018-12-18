import { IMatchday } from '../IMatchday';
import { IEasyLogger } from '../Logger/EasyLogger';
import { ITask } from './ITask';
import { ITaskExecutions } from './ITaskExecutions';
import { ITaskStatus } from './ITaskStatus';
import { TaskStatusFailed } from './TaskStatusFailed';
import { TaskStatusSuccessful } from './TaskStatusSuccessful';
import { TaskStatusReady } from './TaskStatusReady';

export class TaskLogDateTime implements ITask {

  constructor(
    private taskExecutions: ITaskExecutions,
    private taskName: String,
    private activationStatus: Boolean,
    private executionIntervalSeconds: Number,
    private matchday: IMatchday,
    private log: IEasyLogger,
  ) {
  }

  public name(): String {
    return this.taskName;
  }

  public activated(): Boolean {
    return this.activationStatus;
  }

  public intervalSeconds(): Number {
    return this.executionIntervalSeconds;
  }

  public async run(): Promise<void> {
    try {
      let executionStatus: ITaskStatus = new TaskStatusReady();
      try {
        // get last task execution
        let taskExecution = await this.taskExecutions.latest(this.name());
        let lastExecutionTime = await taskExecution.exectionDate();
        let lastExecutionState = await taskExecution.executionStatus();
        let nextExecution = new Date(lastExecutionTime.getTime() + (1000 * this.intervalSeconds().valueOf()));
        this.log.debug(`name: ${this.name()}; last status: ${await lastExecutionState.name()}; last execution: ${await lastExecutionTime}; => next planned execution: ${nextExecution}`);

        let now = new Date();
        if (now >= nextExecution) {
          this.log.debug(`${this.name()}: started taks execution`);
          this.log.info(`${await (await this.matchday.gameServer()).uri()}: ${now}`)
          executionStatus = new TaskStatusSuccessful();
        }
      } catch (e) {
        executionStatus = new TaskStatusFailed();
        throw new Error(`Task '${this.name()}' could not run task: ${e}`);
      } finally {
        let statusName = await executionStatus.name();
        let time = new Date();
        this.log.info(`task '${this.name()}' finished execution '${statusName}' at ${time}.`);
        await this.taskExecutions.getOrAdd(
          this.name(),
          statusName,
          time,
          this.matchday,
        );
      }
    } catch (e) {
      throw new Error(`Running task: ${e}`);
    }
  }
}
