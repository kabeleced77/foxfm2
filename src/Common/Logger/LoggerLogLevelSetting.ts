import { ISetting } from "../Setting"
import { SettingInStorage } from "../SettingInStorage"
import { ILogLevel } from "./LogLevel"
import { LogLevelOff } from "./LogLevel"

export interface ILoggerLogLevelSetting {
  logLevel(): Promise<ILogLevel>;
  changeLogLevel(logLevel: ILogLevel): Promise<void>;
}

export class LoggerLogLevelSetting implements ILoggerLogLevelSetting {
  private level: ISetting<ILogLevel>;

  constructor() {
    this.level = new SettingInStorage<ILogLevel>(
      "foxfm2.logger.logLevel",
      new LogLevelOff()
    );
  }

  public logLevel(): Promise<ILogLevel> {
    return this.level.value();
  }

  public changeLogLevel(logLevel: ILogLevel): Promise<void> {
    return this.level.change(logLevel);
  }
}
