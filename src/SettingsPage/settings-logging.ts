import { LoggerInterface } from '../Common/Logger/LoggerInterface';
import { Logger } from '../Common/Logger/Logger';
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import { RegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import { IRegisteredLoggingModulesSetting } from '../Common/Logger/RegisteredLoggingModulesSetting';
import { RegisteredLoggingModulesSetting } from '../Common/Logger/RegisteredLoggingModulesSetting';
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevel, LogLevelOff, LogLevelAll, LogLevelDebug, LogLevelError, LogLevelInfo, LogLevelWarn } from '../Common/Logger/LogLevel';
import { ILoggerLogLevelSetting } from '../Common/Logger/LoggerLogLevelSetting';
import { LoggerLogLevelSetting } from '../Common/Logger/LoggerLogLevelSetting';
import { RessourceSettingsPageLoggerHeading } from "../Common/Ressource"
import { RessourceSettingsPageLoggerIntro } from "../Common/Ressource"

export class SettingsLogging {
  private thisModule: string = "SettingsLogging";
  private loggingModule: IRegisteredLoggingModule;
  private log: LoggerInterface;
  private registeredLoggingModulesSetting: IRegisteredLoggingModulesSetting;
  private loggerLogLevelSetting: ILoggerLogLevelSetting;

  public ressourceHeading: String;
  public ressourceIntro: String;
  public loggingModules: Array<LoggingModule>;
  public loggingLevels2: Array<ILogLevel>;
  public loggerLogLevel: ILogLevel;

  constructor() {
    this.log = new Logger();
    this.registeredLoggingModulesSetting = this.log.registeredModulesSetting();
    this.loggingModule = new RegisteredLoggingModule(this.thisModule, false, new LogLevelOff());
    this.log.registerModuleForLogging(this.loggingModule);
    this.loggerLogLevelSetting = this.log.loggerLogLevelSetting();

    this.ressourceHeading = new RessourceSettingsPageLoggerHeading().value();
    this.ressourceIntro = new RessourceSettingsPageLoggerIntro().value();

    this.loggerLogLevelSetting.logLevel()
      .then(logLevel =>
        this.loggerLogLevel = new LogLevel(logLevel.name(), logLevel.level()));

    this.collectLogLevels2();
    this.loggingModules = new Array<LoggingModule>();
    this.registeredLoggingModulesSetting.modules().then(modules => {
      modules.modules().forEach(m => {
        this.debug(`Loaded logging modules: ${m.name()}, ${m.loggingActivated()}, ${JSON.stringify(m.logLevel())}`);
        this.loggingModules.push(new LoggingModule(m.name(), m.loggingActivated(), m.logLevel()));
      });
    });
  }

  public submit() {
    this.info(`Submitted called`);

    this.loggerLogLevelSetting
      .changeLogLevel(new LogLevel(this.loggerLogLevel.name(), this.loggerLogLevel.level()));

    this.registeredLoggingModulesSetting.changeModules(
      this.loggingModules.map(m => new RegisteredLoggingModule(m.name, m.activated, m.logLevel)));
  }

  public logLevelMatcher = (logLevel1: ILogLevel, logLevel2: ILogLevel): Boolean => logLevel1.name() === logLevel2.name();

  private collectLogLevels2() {
    this.loggingLevels2 = new Array<ILogLevel>();
    this.loggingLevels2.push(new LogLevelOff());
    this.loggingLevels2.push(new LogLevelAll());
    this.loggingLevels2.push(new LogLevelDebug());
    this.loggingLevels2.push(new LogLevelWarn());
    this.loggingLevels2.push(new LogLevelError());
    this.loggingLevels2.push(new LogLevelInfo());
    this.debug(`Created array of log levels: ${this.loggingLevels2.map(ll => JSON.stringify(ll)).join(", ")}`);
  }

  private info(msg: string): void {
    this.log.info(this.thisModule, msg);
  }
  private debug(msg: string): void {
    this.log.debug(this.thisModule, msg);
  }
  private warn(msg: string): void {
    this.log.warn(this.thisModule, msg);
  }
}

class LoggingModule {
  public name: String;
  public activated: Boolean;
  public logLevel: ILogLevel;

  constructor(name: String, activated: Boolean, logLevel: ILogLevel) {
    this.name = name;
    this.activated = activated;
    this.logLevel = logLevel;
  }
}

class LoggerLogLevel {
  public name: String;
  public level: Number;

  constructor(name: String, level: Number) {
    this.name = name;
    this.level = level;
  }
}
