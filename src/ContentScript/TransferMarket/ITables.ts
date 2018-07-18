import { ITable } from '../../Common/Toolkit/Table';

export interface ITables<T> {
  tables(): ITable<T>[];
}
