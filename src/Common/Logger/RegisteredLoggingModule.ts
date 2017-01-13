import { ILogLevel } from "./LogLevel"

export interface IRegisteredLoggingModule {
  name(): String;
  logLevel(): ILogLevel;
  changeLogLevel(level: ILogLevel): void;
  fromJson(jsonString: String): IRegisteredLoggingModule;
}

export class RegisteredLoggingModule implements IRegisteredLoggingModule {
  private moduleName: String;
  private moduleLogLevel: ILogLevel;

  constructor(name: String, logLevel: ILogLevel) {
    this.moduleName = name;
    this.moduleLogLevel = logLevel;
  }

  public name(): String {
    return this.moduleName;
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
      this.moduleLogLevel.fromJson(jsonString["moduleLogLevel"])
    );
  }
}
