import { IExistingColumn } from "../Toolkit/ExisitingColumn";

export interface ITransferMarketAmateurPlayerTableExtensionSetting {
  addAwpColumnActivated(): Boolean;
  trainingColumn(): IExistingColumn;
  fromJson(jsonString: String): ITransferMarketAmateurPlayerTableExtensionSetting;
}

export class TransferMarketAmateurPlayerTableExtensionSetting implements ITransferMarketAmateurPlayerTableExtensionSetting {
  /*
  private awpColumnToAdd: IColumnToAdd;
  private strengthColumnToExtend: IColumnToExtend;

  constructor(awpColumnToAdd: IColumnToAdd, strengthColumnToExtend: IColumnToExtend) {
    this.awpColumnToAdd = awpColumnToAdd;
    this.strengthColumnToExtend = strengthColumnToExtend;
  }
  */
  private addAwpColumnField: Boolean;
  private experienceColumnField: IExistingColumn;
  private trainingColumnField: IExistingColumn;

  constructor(
    addAwpColumn: Boolean,
    //    experienceColumn: IExperienceAndTrainingColumn,
    trainingColumn: IExistingColumn
  ) {
    this.addAwpColumnField = addAwpColumn;
    //    this.experienceColumnField = experienceColumn;
    this.trainingColumnField = trainingColumn;
  }

  public addAwpColumnActivated(): Boolean {
    return this.addAwpColumnField;
  }
  public trainingColumn(): IExistingColumn {
    return this.trainingColumnField;
  }
  /*
  public transferMarketProfessionalsUrl(): IUrl {
    return this.transferMarketProfessionalsUrlField;
  }
  public experienceAndTrainingColumn(): IExperienceAndTrainingColumn {
    return this.experienceAndTrainingColumnField;
  }
  */

  public fromJson(jsonString: String): TransferMarketAmateurPlayerTableExtensionSetting {
    return new TransferMarketAmateurPlayerTableExtensionSetting(
      jsonString["addAwpColumnField"],
      this.trainingColumnField.fromJson(jsonString["trainingColumnField"])
    );

  }
}
