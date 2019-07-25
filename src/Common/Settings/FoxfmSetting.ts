export interface IFoxfmSetting {
  scrape(): Boolean;
  fromJson(jsonString: String): IFoxfmSetting;
}

export class FoxfmSetting implements IFoxfmSetting {
  constructor(
    private readonly mbScrape: Boolean,
  ) { }

  public scrape(): Boolean {
    return this.mbScrape;
  }
  public fromJson(jsonString: String): IFoxfmSetting {
    return new FoxfmSetting(
      jsonString[nameof(this.mbScrape)],
    )
  }
}
