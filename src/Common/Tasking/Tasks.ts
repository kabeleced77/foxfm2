import { ITask } from './ITask';
import { ITasks } from './ITasks';
import { IEasyLogger } from '../Logger/EasyLogger';

export class Tasks implements ITasks {
  constructor(
    private taskList: ITask[],
    private log: IEasyLogger,
  ) { }

  public async run(): Promise<void> {
    try {
      for (let i = 0; i < this.taskList.length; i++) {
        try {
          const task = this.taskList[i];
          this.log.info(`start next task: ${await (await task.name()).name()}`);
          await task.run();
        } catch (e) {
          throw new Error(`Could not run single task: ${e}`);
        }
      }
    } catch (e) {
      throw new Error(`Could not execute all tasks: ${e}`);
    }
  }
}
