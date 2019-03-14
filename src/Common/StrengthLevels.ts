import { IStrengthLevel, StrengthLevel } from "./StrengthLevel";
import { IAwpPoints } from "./Toolkit/AwpPoints";
import { IStrengthValues } from "./StrengthValues";
import { IStrengthsLimitsSetting } from "./Settings/StrengthsLimitsSetting";

export interface IStrengthLevels {
  strengthLevels(): Promise<IStrengthLevel[]>;
}

export class StrengthLevels implements IStrengthLevels {
  constructor(
    private readonly strengthsLimitsSetting: IStrengthsLimitsSetting,
    private readonly strengthValues: IStrengthValues,
    private readonly awps: IAwpPoints
  ) { }

  public strengthLevels(): Promise<IStrengthLevel[]> {
    if (this.strengthValues.values().length !== this.awps.points().length)
      throw new Error(`Length of strength values and AWPs array differ. Cannot calculate array of strength levels.`);

    return this
      .strengthsLimitsSetting
      .strengthsLimits()
      .then(strengthsLimits => this
        .awps
        .points()
        .map((awp, i) => new StrengthLevel(strengthsLimits, this.strengthValues.values()[i], awp)));
  }
}
