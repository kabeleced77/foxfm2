import { Awp, AwpByEpTp, IAwp } from './Awp';
import { ISplitStrings } from './SplitStrings';
import { IValues } from './Values';

export interface IAwpPoints {
  points(): IAwp[];
}

export class AwpPoints implements IAwpPoints {
  private readonly awps: IValues<Number>;

  constructor(
    awps: IValues<Number>
  ) {
    this.awps = awps;
  }

  public points(): IAwp[] {
    return this.awps.values().map(awp => new Awp(awp));
  }
}

export class AwpPointsByEpTp implements IAwpPoints {
  private readonly eps: IValues<Number>;
  private readonly tps: IValues<Number>;

  constructor(
    eps: IValues<Number>,
    tps: IValues<Number>
  ) {
    this.eps = eps;
    this.tps = tps;
  }

  public points(): IAwp[] {
    if (this.tps.values().length !== this.eps.values().length)
      throw new Error(`Length of TPs and EPs array differ. Cannot calculate array of awp points.`);

    return this
      .eps
      .values()
      .map((ep, i) => new AwpByEpTp(ep, this.tps.values()[i]));
  }
}

export class AwpPointsBySplittedString implements IAwpPoints {
  private readonly splittedStrings: ISplitStrings<Number, Number>;

  constructor(
    splittedString: ISplitStrings<Number, Number>
  ) {
    this.splittedStrings = splittedString;
  }

  public points(): IAwp[] {
    return new AwpPointsByEpTp(this.splittedStrings.firstValues(), this.splittedStrings.secondValues()).points();
  }
}
