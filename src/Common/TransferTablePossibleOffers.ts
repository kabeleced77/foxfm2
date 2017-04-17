import { ITeamTableExistingColumns } from "./TeamTableExistingColumns"
import { IXPathString } from "./Toolkit/XPathString"
import { IHtmlId } from "./Toolkit/HtmlId"
import { IExistingColumn } from "./Toolkit/ExisitingColumn"
import { AwpColumn } from "./AwpColumn"
import { AwpAndStrengthColumns } from "./AwpAndStrengthColumns"

// //./table/tbody/tr/td/table[2]
export interface ITransferTablePossibleOffers {
  awpAndStrengthColumn(): AwpAndStrengthColumns;
  fromJson(jsonString: String): ITransferTablePossibleOffers;
}

export class TransferTablePossibleOffers implements ITransferTablePossibleOffers {
  private awpAndStrengthColumns: AwpAndStrengthColumns;

  constructor(
    awpAndStrengthColumns: AwpAndStrengthColumns
  ) {
    this.awpAndStrengthColumns = awpAndStrengthColumns;
  }

  public awpAndStrengthColumn(): AwpAndStrengthColumns {
    return this.awpAndStrengthColumns;
  }
  public fromJson(jsonString: String): ITransferTablePossibleOffers {
    return new TransferTablePossibleOffers(
      this.awpAndStrengthColumns.fromJson(jsonString["awpAndStrengthColumns"])
    );
  }
}
