import { IUrl } from "./Toolkit/Url"
import { IHtmlId } from "./Toolkit/HtmlId"
import { IAwpAndStrengthColumns } from "./AwpAndStrengthColumns";

export interface ITeamTable {
  url(): IUrl;
  id(): IHtmlId;
  awpAndStrengthColumns(): IAwpAndStrengthColumns;
  fromJson(jsonString: String): ITeamTable;
}

export class TeamTable implements ITeamTable {
  private teamTableUiUrl: IUrl;
  private tableId: IHtmlId;
  private awpAndStrengthColumnsField: IAwpAndStrengthColumns;

  constructor(
    url: IUrl,
    id: IHtmlId,
    awpAndStrengthColumns: IAwpAndStrengthColumns
  ) {
    this.teamTableUiUrl = url;
    this.tableId = id;
    this.awpAndStrengthColumnsField = awpAndStrengthColumns;
  }

  public url(): IUrl {
    return this.teamTableUiUrl;
  }
  public id(): IHtmlId {
    return this.tableId;
  }
  public awpAndStrengthColumns(): IAwpAndStrengthColumns {
    return this.awpAndStrengthColumnsField;
  }
  public fromJson(jsonString: String): ITeamTable {
    return new TeamTable(
      this.teamTableUiUrl.fromJson(jsonString["teamUiUrl"]),
      this.tableId.fromJson(jsonString["tableId"]),
      this.awpAndStrengthColumnsField.fromJson(jsonString["awpAndStrengthColumnsField"]),
    )
  }
}
