import { IExistingColumn } from "./Toolkit/ExisitingColumn"
import { IXPathAllResults } from "./Toolkit/XPathAllResults"

export interface ITeamTableExistingColumns {
  awpColumn(): IExistingColumn;
  strengthColumn(): IExistingColumn;
  fromJson(jsonString: String): ITeamTableExistingColumns;
}

export class TeamTableExistingColumns implements ITeamTableExistingColumns {
  private teamTableAwpColumn: IExistingColumn;
  private teamTableStrengthColumn: IExistingColumn;

  constructor(
    awpColumn: IExistingColumn,
    strengthColumn: IExistingColumn
  ) {
    this.teamTableAwpColumn = awpColumn;
    this.teamTableStrengthColumn = strengthColumn;
  }

  public awpColumn(): IExistingColumn {
    return this.teamTableAwpColumn;
  }
  public strengthColumn(): IExistingColumn {
    return this.teamTableStrengthColumn;
  }
  public fromJson(jsonString: String): ITeamTableExistingColumns {
    return new TeamTableExistingColumns(
      this.teamTableAwpColumn.fromJson(jsonString["teamTableAwpColumn"]),
      this.teamTableStrengthColumn.fromJson(jsonString["teamTableStrengthColumn"])
    );
  }
}
