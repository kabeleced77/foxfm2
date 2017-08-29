import { IUrl } from "../../Common/Toolkit/Url";
import { IExperienceAndTrainingColumn } from "../../Common/ExperienceAndTrainingColumn";

export interface ITransferMarketSearchResultTable {
  transferMarketProfessionalsUrl(): IUrl;
  experienceAndTrainingColumn(): IExperienceAndTrainingColumn;
  fromJson(jsonString: String): ITransferMarketSearchResultTable;
}

export class TransferMarketSearchResultTable implements ITransferMarketSearchResultTable {
  private transferMarketProfessionalsUrlField: IUrl;
  private experienceAndTrainingColumnField: IExperienceAndTrainingColumn;

  constructor(
    transferMarkteProfiUrl: IUrl,
    experienceAndTrainingColumn: IExperienceAndTrainingColumn
  ) {
    this.transferMarketProfessionalsUrlField = transferMarkteProfiUrl;
    this.experienceAndTrainingColumnField = experienceAndTrainingColumn;
  }

  public transferMarketProfessionalsUrl(): IUrl {
    return this.transferMarketProfessionalsUrlField;
  }
  public experienceAndTrainingColumn(): IExperienceAndTrainingColumn {
    return this.experienceAndTrainingColumnField;
  }
  public fromJson(jsonString: String): ITransferMarketSearchResultTable {
    return new TransferMarketSearchResultTable(
      this.transferMarketProfessionalsUrlField.fromJson(jsonString["transferMarketProfessionalsUrlField"]),
      this.experienceAndTrainingColumnField.fromJson(jsonString["experienceAndTrainingColumnField"])
    );
  }
}
