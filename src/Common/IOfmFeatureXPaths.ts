/**
 * The XPaths of the elements of the web page of one OFM feature.
 *
 * Every XPath is identified by its name, e.g. "price.League.1" for the
 * league price of block 1 of the stadium. XPaths which have not been
 * configured yet have a default value.
 */
export interface IOfmFeatureXPaths {
  /** all XPaths (name -> XPath), not configured ones are filled with their default */
  xPaths(): Promise<{ [name: string]: string }>;
  xPath(name: string): Promise<string>;
  /** an empty XPath resets the name to its default */
  change(name: string, xPath: string): Promise<void>;
  reset(name: string): Promise<void>;
  resetAll(): Promise<void>;
}
