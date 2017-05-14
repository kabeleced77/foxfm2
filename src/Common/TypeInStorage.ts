export interface ITypeInStorage<T> {
  fromJson(jsonString: String): T;
}
