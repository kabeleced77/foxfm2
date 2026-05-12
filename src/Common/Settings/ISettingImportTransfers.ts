export interface ISettingImportTransfers {
  activated(): boolean;
  fromJson(jsonString: String): ISettingImportTransfers;
}
