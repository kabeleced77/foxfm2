export interface IFoxfmSetting {
  persistInBrowser(): Boolean;
  fromJson(jsonString: String): IFoxfmSetting;
}

export class FoxfmSetting implements IFoxfmSetting {
  constructor(
    private readonly persistLocally: Boolean,
  ) { }

  public persistInBrowser(): Boolean {
    return this.persistLocally;
  }
  public fromJson(jsonString: String): IFoxfmSetting {
    return new FoxfmSetting(
      jsonString[nameof(this.persistLocally)],
    )
  }
}
