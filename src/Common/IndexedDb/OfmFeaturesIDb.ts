import { DataModelIDbOfmFeature } from "../DataModel/DataModelIDbOfmFeature";
import { IOfmFeature } from "../IOfmFeature";
import { IOfmFeatures } from "../IOfmFeatures";
import { FoxfmIndexedDb } from "./FoxfmIndexedDb";
import { OfmFeatureIDb } from "./OfmFeatureIDb";

export class OfmFeaturesIDb implements IOfmFeatures {
  constructor(
    private readonly dataBase: FoxfmIndexedDb,
  ) { }

  public getOrAdd(name: String): Promise<IOfmFeature> {
    return this.dataBase.transaction("rw", this.dataBase.ofmFeatures, async () => {
      const existing = await this.dataBase
        .ofmFeatures
        .where("name")
        .equals(name.toString())
        .first();
      if (existing) {
        return new OfmFeatureIDb(this.dataBase, existing.id!);
      }
      const id = await this.dataBase
        .ofmFeatures
        .add(new DataModelIDbOfmFeature(name.toString()));
      return new OfmFeatureIDb(this.dataBase, id);
    });
  }
}
