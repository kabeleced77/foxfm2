import { Awp } from "./Toolkit/Awp";
import { ITrainingPoints } from "./TrainingPoints";
import { IExperiencePoints } from "./ExperiencePoints";
import { IColumnValues, ColumnValues } from "./Toolkit/ColumnValues";
import { IStrengthLevelsLimitsSetting } from "./Settings/StrengthLevelsSetting";
import { IHtmlTableColumnValues } from "./Toolkit/HtmlTableColumnValues";
import { IColumnValuesAsync } from "./Toolkit/ColumnValuesAsync";

export class AwpDiffPointsByTrainingAndExperience implements IColumnValuesAsync<Number> {
  private trainingPoints: ITrainingPoints;
  private experiencePoints: IExperiencePoints;
  private strengthValues: IHtmlTableColumnValues<Number>;
  private strengthLevelsLimitsSetting: IStrengthLevelsLimitsSetting;

  constructor(
    trainingPoints: ITrainingPoints,
    experiencePoints: IExperiencePoints,
    strenthValues: IHtmlTableColumnValues<Number>,
    strengthLevelsLimits: IStrengthLevelsLimitsSetting
  ) {
    this.trainingPoints = trainingPoints;
    this.experiencePoints = experiencePoints;
    this.strengthValues = strenthValues;
    this.strengthLevelsLimitsSetting = strengthLevelsLimits;
  }

  public values(): Promise<IColumnValues<Number>> {
    return this.strengthLevelsLimitsSetting
      .strengthLevelsLimits()
      .then(strengthLevelsLimits => {
        let tps = this.trainingPoints.points();
        let eps = this.experiencePoints.points();
        let svs = this.strengthValues.values();
        let tpsLength = tps.length;
        let epsLength = eps.length;
        let svsLength = svs.length;
        if ((tpsLength !== epsLength) || (tpsLength !== svsLength) || (epsLength !== svsLength)) {
          throw new Error(`"Error while calculating AWP diff points. The number of experience 
          points ${eps.length}, training points ${tps.length} and strength values ${svs.length} differ."`);
        }

        var diffAwps = new Array<Number>(0);
        for (let i = 0; i < eps.length; i++) {
          let trainingPoints = tps[i];
          let experiencePoints = eps[i];
          let strengthValue = svs[i];
          let awp = new Awp(experiencePoints, trainingPoints).awpPoints().valueOf();
          let awpOfNextStrengthValue = strengthLevelsLimits.strengthLevelLimits(strengthValue.valueOf() + 1).awpPoints().valueOf();
          let diffToNextStrengthValue = awp - awpOfNextStrengthValue;

          diffAwps.push(diffToNextStrengthValue);
        }
        return new ColumnValues(diffAwps);
      })
      .catch(e => { throw new Error(`"Error while calculating the AWP diff points: ${e}."`); });
  }
}
