export interface IColumnValuesAsync<T> {
  values(): Promise<Array<T>>;
}
