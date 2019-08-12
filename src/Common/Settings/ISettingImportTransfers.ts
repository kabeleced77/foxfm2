export interface ISettingImportTransfers {
  activated(): Boolean;
  fromJson(jsonString: String): ISettingImportTransfers;
}
