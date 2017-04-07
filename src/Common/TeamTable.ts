import { ITeamTableExistingColumns } from "./TeamTableExistingColumns"
import { IUrl } from "./Toolkit/Url"
import { IHtmlId } from "./Toolkit/HtmlId"

export interface ITeamTable {
  url(): IUrl;
  id(): IHtmlId;
  activateAdditionalColumns(status: Boolean): void;
  additionalColumnsActivated(): Boolean;
  existingColumns(): ITeamTableExistingColumns;
  fromJson(jsonString: String): ITeamTable;
}

export class TeamTable implements ITeamTable {
  private teamUiUrl: IUrl;
  private tableId: IHtmlId;
  private showAdditionalColumns: Boolean;
  private teamTableExistingColumns: ITeamTableExistingColumns;

  constructor(
    url: IUrl,
    id: IHtmlId,
    activateAdditionalColumns: Boolean,
    existingColumns: ITeamTableExistingColumns
  ) {
    this.teamUiUrl = url;
    this.tableId = id;
    this.showAdditionalColumns = activateAdditionalColumns;
    this.teamTableExistingColumns = existingColumns;
  }

  public url(): IUrl {
    return this.teamUiUrl;
  }
  public id(): IHtmlId {
    return this.tableId;
  }
  public activateAdditionalColumns(activationStatus: Boolean): void {
    this.showAdditionalColumns = activationStatus;
  }
  public additionalColumnsActivated(): Boolean {
    return this.showAdditionalColumns;
  }
  public existingColumns(): ITeamTableExistingColumns {
    return this.teamTableExistingColumns;
  }
  public fromJson(jsonString: String): ITeamTable {
    return new TeamTable(
      this.teamUiUrl.fromJson(jsonString["teamUiUrl"]),
      this.tableId.fromJson(jsonString["tableId"]),
      jsonString["showAdditionalInformation"],
      this.teamTableExistingColumns.fromJson(jsonString["teamTableExistingColumns"])
    )
  }
}
