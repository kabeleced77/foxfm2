import { IOfmFeature } from "../IOfmFeature";
import { FoxfmIndexedDb } from "./FoxfmIndexedDb";

export class OfmFeatureIDb implements IOfmFeature {
  constructor(
    private readonly dataBase: FoxfmIndexedDb,
    private readonly idValue: Number,
  ) { }

  public id(): Number {
    return this.idValue;
  }

  public async name(): Promise<String> {
    const feature = await this.dataBase.ofmFeatures.get(this.idValue);
    if (!feature) throw new Error(`OFM feature with id '${this.idValue}' not found.`);
    return feature.name;
  }
}
