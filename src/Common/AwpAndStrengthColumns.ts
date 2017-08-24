export interface IAwpAndStrengthColumns {
  additionalInformationActivated(): Boolean;
  activateAdditionalInformation(status: Boolean): void;
  fromJson(jsonString: String): AwpAndStrengthColumns;
}

export class AwpAndStrengthColumns implements IAwpAndStrengthColumns {
  private additionalInformationStatus: Boolean;

  constructor(
    additionalInformationStatus: Boolean
  ) {
    this.additionalInformationStatus = additionalInformationStatus;
  }

  public additionalInformationActivated(): Boolean {
    return this.additionalInformationStatus;
  }
  public activateAdditionalInformation(status: Boolean): void {
    this.additionalInformationStatus = status;
  }
  public fromJson(jsonString: String): AwpAndStrengthColumns {
    return new AwpAndStrengthColumns(
      jsonString["additionalInformationStatus"]
    );
  }
}
