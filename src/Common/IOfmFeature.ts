/**
 * A feature of the OFM web site extended by foxfm, e.g. the stadium.
 */
export interface IOfmFeature {
  id(): Number;
  name(): Promise<String>;
}
