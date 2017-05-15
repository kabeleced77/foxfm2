import { IXPathString } from "./Toolkit/XPathString"
import { IHtmlId } from "./Toolkit/HtmlId"
import { IExtendExistingColumn } from "./Toolkit/ExtendExisitingColumn"
import { AwpAndStrengthColumns } from "./AwpAndStrengthColumns"
import { IUrl } from "./Toolkit/Url";
import { IExperienceAndTrainingColumn } from "./ExperienceAndTrainingColumn";
import { IExistingColumn } from "./Toolkit/ExisitingColumn";

export interface ITransferMarketAmateurTable {
  addAwpColumnActivated(): Boolean;
  trainingColumn(): IExistingColumn;
  fromJson(jsonString: String): ITransferMarketAmateurTable;
}

export class TransferMarketAmateurTable implements ITransferMarketAmateurTable {
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

  public fromJson(jsonString: String): ITransferMarketAmateurTable {
    return new TransferMarketAmateurTable(
      jsonString["addAwpColumnField"],
      this.trainingColumnField.fromJson(jsonString["trainingColumnField"])
    );
  }
}
