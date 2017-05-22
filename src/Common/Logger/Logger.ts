import { ILogLevel } from "./LogLevel"
import { LogLevelInfo } from "./LogLevel"
import { LogLevelWarn } from "./LogLevel"
import { LogLevelDebug } from "./LogLevel"
import { LogLevelError } from "./LogLevel"
import { IRegisteredLoggingModule } from "./RegisteredLoggingModule"
import { IRegisteredLoggingModules } from "./RegisteredLoggingModules"
import { ISetting } from "../Toolkit/Setting";

export interface ILogger {
	registerModuleForLogging(module: IRegisteredLoggingModule): Promise<void>;
  registeredModules(): ISetting<IRegisteredLoggingModules>;
  applicationLogLevel(): ISetting<ILogLevel>;
	info(module: String, msg: string): void;
	debug(module: String, msg: string): void;
	warn(module: String, msg: string): void;
	error(module: String, msg: string): void;
}

export class Logger implements ILogger {
  private loggingModules: ISetting<IRegisteredLoggingModules>;
  private loggerLogLevel: ISetting<ILogLevel>;

  constructor(applicationLogLevel:ISetting<ILogLevel>, loggingModules: ISetting<IRegisteredLoggingModules>) {
    this.loggingModules = loggingModules;
    this.loggerLogLevel = applicationLogLevel;
  }

  public registeredModules(): ISetting<IRegisteredLoggingModules> {
    return this.loggingModules;
  }

  public applicationLogLevel(): ISetting<ILogLevel> {
    return this.loggerLogLevel;
  }

  public registerModuleForLogging(module: IRegisteredLoggingModule): Promise<void> {
    return this.loggingModules.update((modules) => {
      modules.add(module);
      return modules;
    });
  }

  public error(module: string, msg: string): void {
    this.checkIfLogLevelIsActivated(module, new LogLevelError(), msg);
  }

  public info(module: string, msg: string): void {
    this.checkIfLogLevelIsActivated(module, new LogLevelInfo(), msg);
  }

  public debug(module: string, msg: string): void {
    this.checkIfLogLevelIsActivated(module, new LogLevelDebug(), msg);
  }

  public warn(module: string, msg: string): void {
    this.checkIfLogLevelIsActivated(module, new LogLevelWarn(), msg);
  }

  private checkIfLogLevelIsActivated(module: String, logLevel: ILogLevel, msg: String) {
    this.loggerLogLevel.value().then(level => {
      if (logLevel.level() <= level.level()) this.printMessage(module, logLevel, msg);
    });
  }

  private printMessage(moduleName: String, logLevel: ILogLevel, msg: String): void {
    this.loggingModules.value().then(modules => {
      var module = modules.moduleByName(moduleName);
      if (logLevel.level() > module.logLevel().level()) return;

      var prefix = this.getPrefix(moduleName, logLevel.name());
      switch (logLevel.name()) {
        case new LogLevelError().name():
          console.error(prefix + msg);
          break;
        case new LogLevelInfo().name():
          console.info(prefix + msg);
          break;
        case new LogLevelWarn().name():
          console.warn(prefix + msg);
          break;
        case new LogLevelDebug().name():
          console.info(prefix + msg);
          break;
        default:
          console.info(prefix + msg);
      }
    });
  }

  private getPrefix(moduleName: String, logLevelName: String): string {
    var currentDate = new Date();
    return currentDate.toLocaleString('en-GB') + '|' + logLevelName + '| ' + moduleName + ': ';
  }
}
