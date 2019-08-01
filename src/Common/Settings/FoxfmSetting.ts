export interface IFoxfmSetting {
  importTransfers(): Boolean;
  fromJson(jsonString: String): IFoxfmSetting;
}

export class FoxfmSetting implements IFoxfmSetting {
  constructor(
    private readonly mbImportTransfers: Boolean,
  ) { }

  public importTransfers(): Boolean {
    return this.mbImportTransfers;
  }
  public fromJson(jsonString: String): IFoxfmSetting {
    return new FoxfmSetting(
      jsonString[nameof(this.mbImportTransfers)],
    )
  }
}
