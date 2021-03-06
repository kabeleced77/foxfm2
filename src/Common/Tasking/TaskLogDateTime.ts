import { IMatchdayWithId } from "../IMatchdayWithId";
import { IEasyLogger } from '../Logger/EasyLogger';
import { ITask } from './ITask';

export class TaskLogDateTime implements ITask {
  constructor(
    private taskName: String,
    private activationStatus: Boolean,
    private executionIntervalSeconds: Number,
    private lastExecutionsToKeepValue: Number,
    private matchday: IMatchdayWithId,
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

  public lastExecutionsToKeep(): Number {
    return this.lastExecutionsToKeepValue;
  }

  public async run(): Promise<void> {
    try {
      let now = new Date();
      this.log.debug(`${this.name()}: started taks execution`);
      console.log(`${await (await this.matchday.gameServer()).uri()}: ${now}`)
    } catch (e) {
      throw new Error(`running task '${this.name()}': ${e.message}`);
    }
  }
}
