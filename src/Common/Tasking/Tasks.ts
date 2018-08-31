import { ITask } from './ITask';
import { ITasks } from './ITasks';
import { IEasyLogger } from '../Logger/EasyLogger';

export class Tasks implements ITasks {
  constructor(
    private taskList: ITask[],
    private log: IEasyLogger,
  ) { }

  public run(): void {
    this.taskList.forEach(async task => {
      this.log.info(`start next task: ${await (await task.name()).name()}`);
      task.run();
    });
  }
}
