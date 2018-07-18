export interface IValueAsync<T> {
  value(): Promise<T>;
}
