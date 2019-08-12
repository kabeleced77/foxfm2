import { ISettingImportTransfers } from "./ISettingImportTransfers";

export class SettingImportTransfers implements ISettingImportTransfers {
  constructor(
    private readonly mbActivated: Boolean,
  ) { }

  public activated(): Boolean {
    return this.mbActivated;
  }
  public fromJson(jsonString: String): ISettingImportTransfers {
    return new SettingImportTransfers(
      jsonString[nameof(this.mbActivated)],
    )
  }
}
