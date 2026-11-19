export interface IDataModelIDbOfmFeature {
  id?: Number;
  name: string;
}

export class DataModelIDbOfmFeature implements IDataModelIDbOfmFeature {
  constructor(
    public name: string,
  ) { }
}
