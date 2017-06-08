import { IAwpPoints } from "./Toolkit/AwpPoints";
import { IAwp, Awp } from "./Toolkit/Awp";
import { ITrainingPoints } from "./TrainingPoints";
import { IExperiencePoints } from "./ExperiencePoints";

export class AwpPointsByTrainingAndExperience implements IAwpPoints {
  private trainingPoints: ITrainingPoints;
  private experiencePoints: IExperiencePoints;

  constructor(
    trainingPoints: ITrainingPoints,
    experiencePoints: IExperiencePoints
  ) {
    this.trainingPoints = trainingPoints;
    this.experiencePoints = experiencePoints;
  }

  public points(): IAwp[] {
    let tps = this.experiencePoints.points();
    let eps = this.experiencePoints.points();
    if (tps.length !== eps.length) {
      throw new Error(`"Error while calculating AWP points as the number 
      of experience points ${eps.length} is not equal to the number of 
      training points ${tps.length}."`);
    }

    var awps = new Array<IAwp>(0);
    for (let i = 0; i < eps.length; i++) {
      let tp = tps[i];
      let ep = eps[i];
      awps.push(new Awp(ep, tp));
    }

    return awps;
  }
}
