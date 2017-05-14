export interface IExistingColumn {
  index(doc: Document): Number;
  fromJson(jsonString: String): IExistingColumn;
}
