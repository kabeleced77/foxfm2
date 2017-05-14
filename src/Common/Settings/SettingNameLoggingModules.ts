import { ISettingName } from "./SettingName";

export class SettingNameLoggingModules implements ISettingName {
  private nameField: String;

  constructor() {
    this.nameField = "foxfm2.logger.loggingModules";
  }
  name(): String {
    return this.nameField;
  }
}
