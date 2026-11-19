export interface IDataModelIDbXPath {
  id?: Number;
  ofmFeatureId: Number;
  name: string;
  xPath: string;
}

export class DataModelIDbXPath implements IDataModelIDbXPath {
  constructor(
    public ofmFeatureId: Number,
    public name: string,
    public xPath: string,
  ) { }
}
