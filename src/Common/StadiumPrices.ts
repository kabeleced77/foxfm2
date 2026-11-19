export interface IStadiumPriceLimits {
  min(): number;
  max(): number;
  offsetMin(): number;
  offsetMax(): number;
}

export class StadiumPriceLimits implements IStadiumPriceLimits {
  public min(): number {
    return 1;
  }
  public max(): number {
    return 69;
  }
  public offsetMin(): number {
    return 0;
  }
  public offsetMax(): number {
    return 68;
  }
}

export interface IStadiumPrices {
  basePrice(kind: string): number;
  offsetPrice(block: string, kind: string): number;
  /** price to be set at the OFM page: base price + offset price of the block */
  price(block: string, kind: string): number;
  withBasePrice(kind: string, price: number): IStadiumPrices;
  withOffsetPrice(block: string, kind: string, price: number): IStadiumPrices;
  fromJson(jsonString: String): IStadiumPrices;
}

type PricesOfKinds = { [kind: string]: number };

/**
 * Base prices per kind of game and offset prices per block and kind of game.
 * Immutable: changes return a new instance.
 */
export class StadiumPrices implements IStadiumPrices {
  constructor(
    private readonly base: PricesOfKinds,
    private readonly offsets: { [block: string]: PricesOfKinds },
    private readonly limits: IStadiumPriceLimits,
  ) { }

  public basePrice(kind: string): number {
    return this.coerce(
      this.limits.min(),
      this.limits.max(),
      this.numberOr(this.base[kind], this.limits.min()),
    );
  }
  public offsetPrice(block: string, kind: string): number {
    const offsetsOfBlock = this.offsets[block] ?? {};
    return this.coerce(
      this.limits.offsetMin(),
      this.limits.offsetMax(),
      this.numberOr(offsetsOfBlock[kind], this.limits.offsetMin()),
    );
  }
  public price(block: string, kind: string): number {
    return this.coerce(
      this.limits.min(),
      this.limits.max(),
      this.basePrice(kind) + this.offsetPrice(block, kind),
    );
  }
  public withBasePrice(kind: string, price: number): IStadiumPrices {
    return new StadiumPrices({ ...this.base, [kind]: price }, this.offsets, this.limits);
  }
  public withOffsetPrice(block: string, kind: string, price: number): IStadiumPrices {
    return new StadiumPrices(
      this.base,
      { ...this.offsets, [block]: { ...(this.offsets[block] ?? {}), [kind]: price } },
      this.limits,
    );
  }
  public fromJson(jsonString: String): IStadiumPrices {
    const json = <any>jsonString;
    return new StadiumPrices(json?.["base"] ?? {}, json?.["offsets"] ?? {}, this.limits);
  }

  private numberOr(value: number | undefined, fallback: number): number {
    return typeof value === "number" && Number.isFinite(value) ? value : fallback;
  }
  private coerce(min: number, max: number, value: number): number {
    return Math.min(max, Math.max(min, value));
  }
}
