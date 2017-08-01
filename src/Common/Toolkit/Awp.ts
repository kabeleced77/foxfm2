export interface IAwp {
  awpPoints(): Number;
}

export class AwpByEpTp implements IAwp {
  private experiencePointsField: Number;
  private trainingPointsField: Number;

  constructor(experiencePoints: Number, trainingPoints: Number) {
    this.experiencePointsField = experiencePoints;
    this.trainingPointsField = trainingPoints;
  }

  public awpPoints(): Number {
    var ep = this.experiencePointsField.valueOf();
    var tp = this.trainingPointsField.valueOf();
    return Math.round(2 * ep * tp / (ep + tp));
  }
}

export class Awp implements IAwp {
  private awpField: Number;

  constructor(awp: Number) {
    this.awpField = awp;
  }

  public awpPoints(): Number {
    return this.awpField;
  }
}
