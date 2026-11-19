import { IOfmFeature } from "./IOfmFeature";

export interface IOfmFeatures {
  getOrAdd(name: String): Promise<IOfmFeature>;
}
