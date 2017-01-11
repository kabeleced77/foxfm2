import { ILogLevel } from "./LogLevel"
import { LogLevel } from "./LogLevel"

export interface IRegisteredLoggingModule {
  name(): String;
  loggingActivated(): Boolean;
  changeLoggingState(state: Boolean): void;
  fromJson(jsonString: String): IRegisteredLoggingModule;
  logLevel(): ILogLevel;
  changeLogLevel(level: ILogLevel): void;
}

export class RegisteredLoggingModule implements IRegisteredLoggingModule {
  private moduleName: String;
  private moduleLoggingActivated: Boolean;
  private moduleLogLevel: ILogLevel;

  constructor(name: String, loggingActivated: Boolean, logLevel: ILogLevel) {
    this.moduleName = name;
    this.moduleLoggingActivated = loggingActivated;
    this.moduleLogLevel = logLevel;
  }

  public name(): String {
    return this.moduleName;
  }

  public loggingActivated(): Boolean {
    return this.moduleLoggingActivated;
  }

  public changeLoggingState(state: Boolean) {
    this.moduleLoggingActivated = state;
  }

  public logLevel(): ILogLevel {
    return this.moduleLogLevel;
  }

  public changeLogLevel(logLevel: ILogLevel): void {
    this.moduleLogLevel = logLevel;
  }

  public fromJson(jsonString: String): IRegisteredLoggingModule {
    return new RegisteredLoggingModule(
      jsonString["moduleName"],
      jsonString["moduleLoggingActivated"],
      this.moduleLogLevel.fromJson(jsonString["moduleLogLevel"])
    );
  }
}
