import { DataModelIDbXPath } from "../DataModel/DataModelIDbXPath";
import { IOfmFeatureXPaths } from "../IOfmFeatureXPaths";
import { IOfmFeatures } from "../IOfmFeatures";
import { FoxfmIndexedDb } from "./FoxfmIndexedDb";

/**
 * XPaths of one OFM feature stored in table 'xPaths', which refers to the
 * feature in table 'ofmFeatures'. The default XPaths also define which
 * names exist for the feature.
 */
export class OfmFeatureXPathsIDb implements IOfmFeatureXPaths {
  constructor(
    private readonly dataBase: FoxfmIndexedDb,
    private readonly features: IOfmFeatures,
    private readonly featureName: string,
    private readonly defaults: { [name: string]: string },
  ) { }

  public async xPaths(): Promise<{ [name: string]: string }> {
    const featureId = (await this.features.getOrAdd(this.featureName)).id().valueOf();
    const result: { [name: string]: string } = { ...this.defaults };
    const stored = await this.dataBase
      .xPaths
      .where("ofmFeatureId")
      .equals(featureId)
      .toArray();
    stored.forEach((s) => {
      if (s.name in result && s.xPath.trim().length > 0) {
        result[s.name] = s.xPath;
      }
    });
    return result;
  }

  public async xPath(name: string): Promise<string> {
    return (await this.xPaths())[this.knownName(name)];
  }

  public async change(name: string, xPath: string): Promise<void> {
    this.knownName(name);
    const value = xPath.trim();
    if (value.length === 0) return this.reset(name);

    const featureId = (await this.features.getOrAdd(this.featureName)).id().valueOf();
    await this.dataBase.transaction("rw", this.dataBase.xPaths, async () => {
      const existing = await this.dataBase
        .xPaths
        .where("[ofmFeatureId+name]")
        .equals([featureId, name])
        .first();
      if (existing) {
        await this.dataBase.xPaths.update(existing.id!, { xPath: value });
      } else {
        await this.dataBase.xPaths.add(new DataModelIDbXPath(featureId, name, value));
      }
    });
  }

  public async reset(name: string): Promise<void> {
    this.knownName(name);
    const featureId = (await this.features.getOrAdd(this.featureName)).id().valueOf();
    await this.dataBase
      .xPaths
      .where("[ofmFeatureId+name]")
      .equals([featureId, name])
      .delete();
  }

  public async resetAll(): Promise<void> {
    const featureId = (await this.features.getOrAdd(this.featureName)).id().valueOf();
    await this.dataBase
      .xPaths
      .where("ofmFeatureId")
      .equals(featureId)
      .delete();
  }

  private knownName(name: string): string {
    if (!(name in this.defaults)) {
      throw new Error(`Unknown XPath name '${name}' of OFM feature '${this.featureName}'.`);
    }
    return name;
  }
}
