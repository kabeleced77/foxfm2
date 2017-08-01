import { IAwp, AwpByEpTp } from "./Awp";
import { ExperiencePoints, IExperiencePoints } from "../ExperiencePoints";
import { ITrainingPoints } from "../TrainingPoints";

export interface IAwpPoints {
  points(): IAwp[];
}

export class AwpPoints implements IAwpPoints {
  private readonly awps: IAwp[];

  constructor(awps: IAwp[]) {
    this.awps = awps;
  }
  public points(): IAwp[] {
    return this.awps;
  }
}

export class AwpPointsByEpTp implements IAwpPoints {
  private readonly eps: IExperiencePoints;
  private readonly tps: ITrainingPoints;

  constructor(
    eps: IExperiencePoints,
    tps: ITrainingPoints
  ) {
    this.eps = eps;
    this.tps = tps;
  }
  public points(): IAwp[] {
    if (this.tps.points().length !== this.eps.points().length) throw new Error(`Length of TPs and EPs array differ. Cannot calculate array of awp points.`);
    return this
      .eps
      .points()
      .map((ep, i) => new AwpByEpTp(ep, this.tps.points()[i]));
  }
}
