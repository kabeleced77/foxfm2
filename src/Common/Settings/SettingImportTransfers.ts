import { ISettingImportTransfers } from "./ISettingImportTransfers";

export class SettingImportTransfers implements ISettingImportTransfers {
  constructor(
    private readonly mbActivated: boolean,
  ) { }

  public activated(): boolean {
    return this.mbActivated;
  }
  public fromJson(jsonString: string): ISettingImportTransfers {
    const json = JSON.parse(jsonString);
    return new SettingImportTransfers(
      json["mbActivated"],
    )
  }
}
