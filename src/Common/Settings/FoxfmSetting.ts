export interface IFoxfmSetting {
  fromJson(jsonString: String): IFoxfmSetting;
}

export class FoxfmSetting implements IFoxfmSetting {
  constructor(
  ) { }

  public fromJson(jsonString: String): IFoxfmSetting {
    return new FoxfmSetting(
    )
  }
}
