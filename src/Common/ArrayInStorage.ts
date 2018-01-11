import { ITypeInStorage } from "./TypeInStorage";

export interface IArrayInStorage<T> {
  array(): Array<T>;
  fromJson(jsonString: String): IArrayInStorage<T>;
}

export class ArrayInStorage<T extends ITypeInStorage<T>> implements IArrayInStorage<T>{
  private readonly arrayValue: Array<T>;

  constructor(
    array: Array<T>
  ) {
    this.arrayValue = array;
  }

  public array(): T[] {
    return this.arrayValue
  }
  public fromJson(jsonString: String): IArrayInStorage<T> {
    return new ArrayInStorage(
      jsonString["arrayValue"].map((value: String, i: number) => this.arrayValue[i].fromJson(value)));
  }
}
