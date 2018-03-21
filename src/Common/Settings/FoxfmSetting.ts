export interface IFoxfmSetting {
  persistInBrowser(): Boolean;
  fromJson(jsonString: String): IFoxfmSetting;
}

export class FoxfmSetting implements IFoxfmSetting {
  private readonly persistLocally: Boolean;

  constructor(
    persistInBrowser: Boolean,
  ) {
    this.persistLocally = persistInBrowser;
  }

  public persistInBrowser(): Boolean {
    return this.persistLocally;
  }
  public fromJson(jsonString: String): IFoxfmSetting {
    return new FoxfmSetting(
      jsonString["persistLocally"]
    )
  }
}
