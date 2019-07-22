export interface IXPathFirstResult<T extends Node> {
  xPathString(): String;
  node(): T;
}
