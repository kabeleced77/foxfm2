export interface IFoxfmSetting {
  scrape(): Boolean;
  importTransfers(): Boolean;
  fromJson(jsonString: String): IFoxfmSetting;
}

export class FoxfmSetting implements IFoxfmSetting {
  constructor(
    private readonly mbScrape: Boolean,
    private readonly mbImportTransfers: Boolean,
  ) { }

  public scrape(): Boolean {
    return this.mbScrape;
  }
  public importTransfers(): Boolean {
    return this.mbImportTransfers;
  }
  public fromJson(jsonString: String): IFoxfmSetting {
    return new FoxfmSetting(
      jsonString[nameof(this.mbScrape)],
      jsonString[nameof(this.mbImportTransfers)],
    )
  }
}
