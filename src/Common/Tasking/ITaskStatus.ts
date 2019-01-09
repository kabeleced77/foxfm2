export interface ITaskStatus {
  id(): Number;
  name(): Promise<String>;
  final(): Promise<Boolean>;
}
