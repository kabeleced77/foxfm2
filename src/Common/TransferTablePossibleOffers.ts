import { AwpAndStrengthColumns } from "./AwpAndStrengthColumns"

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
