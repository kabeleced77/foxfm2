import { IStrengthLevel } from "./StrengthLevel"
import { StrengthLevel } from "./StrengthLevel"

export interface IStrengthLevels {
  strengthLevel(strength: Number): IStrengthLevel;
  strengthLevelByAwp(awps: Number): IStrengthLevel;
  strengthLevels(): Array<IStrengthLevel>;
  fromJson(jsonString: String): IStrengthLevels;
}

export class StrengthLevels implements IStrengthLevels {
  private strengthLevelArray: Array<IStrengthLevel>;

  constructor(stengthLevels: Array<IStrengthLevel>) {
    this.strengthLevelArray = stengthLevels;
  }

  public strengthLevel(strength: Number): IStrengthLevel {
    return this.strengthLevelArray.find(strengthLevel => strengthLevel.strengthLevel() === strength);
  }

  public strengthLevelByAwp(awps: Number): IStrengthLevel {
    for (var i = 0; i < this.strengthLevelArray.length; i++) {
      if (awps < this.strengthLevelArray[i].awpPoints() && i>0) {
        return this.strengthLevelArray[i-1];
      }
    }
    return new StrengthLevel(-1, -1, -1);
  }

  public strengthLevels(): Array<IStrengthLevel> {
    return this.strengthLevelArray.slice();
  }

  public fromJson(jsonString: String): IStrengthLevels {
    if (this.strengthLevelArray.length) {
      return new StrengthLevels(
        jsonString["strengthLevelArray"].map((strengthLevel: String, i: number) => {
          return this.strengthLevelArray[i].fromJson(strengthLevel);
        })
      );
    } else {
      return new StrengthLevels([]);
    }
  }
}
