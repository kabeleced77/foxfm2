export interface ITaskName {
  id(): Number;
  name(): Promise<String>;
}
