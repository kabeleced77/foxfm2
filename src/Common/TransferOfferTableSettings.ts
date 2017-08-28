import { AwpAndStrengthColumns } from "./AwpAndStrengthColumns"

export interface ITransferOfferTableSettings {
  awpAndStrengthColumn(): AwpAndStrengthColumns;
  fromJson(jsonString: String): ITransferOfferTableSettings;
}

export class TransferOferTableSettings implements ITransferOfferTableSettings {
  private awpAndStrengthColumns: AwpAndStrengthColumns;

  constructor(
    awpAndStrengthColumns: AwpAndStrengthColumns
  ) {
    this.awpAndStrengthColumns = awpAndStrengthColumns;
  }

  public awpAndStrengthColumn(): AwpAndStrengthColumns {
    return this.awpAndStrengthColumns;
  }
  public fromJson(jsonString: String): ITransferOfferTableSettings {
    return new TransferOferTableSettings(
      this.awpAndStrengthColumns.fromJson(jsonString["awpAndStrengthColumns"])
    );
  }
}
