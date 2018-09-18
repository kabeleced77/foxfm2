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
        const task = this.taskList[i];
        const name = await (await task.name()).name();
        this.log.info(`start next task: ${name}`);
        try {
          await task.run();
        } catch (e) {
          throw new Error(`Could not run task '${name}': ${e}`);
        }
      }
    } catch (e) {
      throw new Error(`Could not execute all tasks: ${e}`);
    }
  }
}
