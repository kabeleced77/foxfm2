export interface IXPathFirstResult<T extends Node> {
  xPathString(): String;
  result(): T;
}
