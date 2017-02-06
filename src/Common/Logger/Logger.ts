import { LoggerInterface } from "./LoggerInterface"
import { ILogLevel } from "./LogLevel"
import { LogLevelOff } from "./LogLevel"
import { LogLevelInfo } from "./LogLevel"
import { LogLevelWarn } from "./LogLevel"
import { LogLevelDebug } from "./LogLevel"
import { LogLevelError } from "./LogLevel"
import { ILoggerLogLevelSetting } from "./LoggerLogLevelSetting"
import { LoggerLogLevelSetting } from "./LoggerLogLevelSetting"
import { IRegisteredLoggingModulesSetting } from "./RegisteredLoggingModulesSetting"
import { RegisteredLoggingModulesSetting } from "./RegisteredLoggingModulesSetting"
import { IRegisteredLoggingModule } from "./RegisteredLoggingModule"
import { RegisteredLoggingModule } from "./RegisteredLoggingModule"
import { IRegisteredLoggingModules } from "./RegisteredLoggingModules"
import { RegisteredLoggingModules } from "./RegisteredLoggingModules"

export class Logger implements LoggerInterface {
  private registeredLoggingModulesSetting: IRegisteredLoggingModulesSetting;
  private loggerLogLevel: ILoggerLogLevelSetting;

  constructor() {
    this.registeredLoggingModulesSetting = new RegisteredLoggingModulesSetting();
    this.loggerLogLevel = new LoggerLogLevelSetting();
  }

  public registeredModulesSetting(): IRegisteredLoggingModulesSetting {
    return this.registeredLoggingModulesSetting;
  }

  public loggerLogLevelSetting(): ILoggerLogLevelSetting {
    return this.loggerLogLevel;
  }

  public registerModuleForLogging(module: IRegisteredLoggingModule): Promise<void> {
    return this.registeredLoggingModulesSetting.addModule(module);
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
    this.loggerLogLevel.logLevel().then(level => {
      if (logLevel.level() <= level.level()) this.printMessage(module, logLevel, msg);
    });
  }

  private printMessage(moduleName: String, logLevel: ILogLevel, msg: String): void {
    this.registeredLoggingModulesSetting.modules().then(modules => {
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
