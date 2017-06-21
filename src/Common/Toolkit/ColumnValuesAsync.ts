import { IColumnValues } from "./ColumnValues";

export interface IColumnValuesAsync<T> {
  values(): Promise<IColumnValues<T>>;
}
