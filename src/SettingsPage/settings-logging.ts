import { Logger, ILogger } from '../Common/Logger/Logger';
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import { RegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevel, LogLevelOff, LogLevelAll, LogLevelDebug, LogLevelError, LogLevelInfo, LogLevelWarn } from '../Common/Logger/LogLevel';
import { RessourceSettingsPageLoggerHeading } from "../Common/Ressource"
import { RessourceSettingsPageLoggerIntro, RessourceCommonButtonApply } from "../Common/Ressource"
import { Mutex } from "../Common/Toolkit/Mutex";
import { SettingNameLoggingModules } from "../Common/Settings/SettingNameLoggingModules";
import { ISetting } from "../Common/Toolkit/Setting";
import { StorageLocal } from "../Common/Toolkit/StorageLocal";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";
import { SettingNameApplicationLogLevel } from "../Common/Settings/SettingNameApplicationLogLevel";

export class SettingsLogging {
  private thisModule: string = "SettingsLogging";
  private loggingModule: IRegisteredLoggingModule;
  private log: ILogger;
  private registeredLoggingModulesSetting: ISetting<IRegisteredLoggingModules>;
  private applicationLogLevel: ISetting<ILogLevel>;

  public ressourceHeading: String;
  public ressourceIntro: String;
  public ressourceButtonApply: String;
  public loggingModules: Array<LoggingModule>;
  public loggingLevels2: Array<ILogLevel>;
  public viewApplicationLogLevel: ILogLevel;

  constructor() {
    this.log = new Logger(
      new StorageLocal<ILogLevel>(
        new SettingNameApplicationLogLevel(),
        new LogLevelError()),
      new StorageLocalSync<IRegisteredLoggingModules>(
        new Mutex(),
        new StorageLocal<IRegisteredLoggingModules>(
          new SettingNameLoggingModules(),
          new RegisteredLoggingModules(
            new Array<IRegisteredLoggingModule>())))
    );
    this.registeredLoggingModulesSetting = this.log.registeredModules();
    this.loggingModule = new RegisteredLoggingModule(this.thisModule, new LogLevelError());
    this.log.registerModuleForLogging(this.loggingModule);
    this.applicationLogLevel = this.log.applicationLogLevel();

    this.ressourceHeading = new RessourceSettingsPageLoggerHeading().value();
    this.ressourceIntro = new RessourceSettingsPageLoggerIntro().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();

    this.applicationLogLevel.value()
      .then(logLevel =>
        this.viewApplicationLogLevel = new LogLevel(logLevel.name(), logLevel.level()));

    this.collectLogLevels2();
    this.loggingModules = new Array<LoggingModule>();
    this.registeredLoggingModulesSetting.value().then(modules => {
      modules.modules().forEach(m => {
        this.debug(`Loaded logging modules: ${m.name()}, ${JSON.stringify(m.logLevel())}`);
        this.loggingModules.push(new LoggingModule(m.name(), m.logLevel()));
      });
    });
  }

  public submit() {
    this.info(`Submitted called`);

    this.applicationLogLevel
      .update((currentAppLogLevel: ILogLevel) => {
        currentAppLogLevel.update(this.viewApplicationLogLevel);
        return currentAppLogLevel;
      });

    this.registeredLoggingModulesSetting
      .update((modules: IRegisteredLoggingModules) => {
        return new RegisteredLoggingModules(
          this.loggingModules.map(m =>
            new RegisteredLoggingModule(m.name, m.logLevel)));
      });
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
    this.loggingLevels2 = this.loggingLevels2.sort((a, b) =>
      (a.level().valueOf() - b.level().valueOf()).valueOf());
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
  public logLevel: ILogLevel;

  constructor(name: String, logLevel: ILogLevel) {
    this.name = name;
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
