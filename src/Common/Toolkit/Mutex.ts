
export interface IMutex<T> {
  synchronize(task: () => Promise<T>): Promise<T>;
  dequeue(): void;
  execute(record): void;
}

export class Mutex<T> implements IMutex<T> {
  private busy: boolean;
  private queue = Array();

  constructor() {
    // console.log(`mutex instantiated`);
  }

  synchronize(task: () => Promise<T>): Promise<T> {
    var self = this;
    // console.info(`synchronize(): size of queue: ${self.queue.length}`);
    return new Promise<T>(function (resolve, reject) {
      self.queue.push([task, resolve, reject]);
      if (!self.busy) self.dequeue();
    });
  };

  dequeue(): void {
    this.busy = true;
    // console.info(`dequeue(): size of queue: ${this.queue.length}`);
    var next = this.queue.shift();

    if (next)
      this.execute(next);
    else
      this.busy = false;
  };

  execute(record): void {
    var task = <() => Promise<T>>record[0],
      resolve = record[1],
      reject = record[2],
      self = this;

    task()
      .then(resolve, reject)
      .then(function () {
        self.dequeue();
      });
  }
}
