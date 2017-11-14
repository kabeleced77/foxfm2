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
import { EasyLogger, IEasyLogger } from '../Common/Logger/EasyLogger';

export class SettingsLogging {
  private log: ILogger;
  private logger: IEasyLogger;
  private registeredLoggingModulesSetting: ISetting<IRegisteredLoggingModules>;
  private applicationLogLevel: ISetting<ILogLevel>;

  public ressourceHeading: String;
  public ressourceIntro: String;
  public ressourceButtonApply: String;
  public loggingModules: Array<LoggingModuleViewModel>;
  public logLevels: Array<LogLevelViewModel>;
  public viewApplicationLogLevel: LogLevelViewModel;

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
            new Array<IRegisteredLoggingModule>()))));
    this.logger = new EasyLogger(this.log,
      new RegisteredLoggingModule(
        "SettingsLogging",
        new LogLevelError()));

    this.registeredLoggingModulesSetting = this.log.registeredModules();
    this.applicationLogLevel = this.log.applicationLogLevel();

    this.ressourceHeading = new RessourceSettingsPageLoggerHeading().value();
    this.ressourceIntro = new RessourceSettingsPageLoggerIntro().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();
    this.initialiseViewValues();
  }

  public logLevelMatcher = (logLevel1: LogLevelViewModel, logLevel2: LogLevelViewModel): Boolean => logLevel1.name === logLevel2.name;

  public submit() {
    this.logger.info(`Submitted called`);

    this.applicationLogLevel
      .update((currentAppLogLevel: ILogLevel) => {
        return new LogLevel(this.viewApplicationLogLevel.name, this.viewApplicationLogLevel.level);
      });

    this.registeredLoggingModulesSetting
      .update((modules: IRegisteredLoggingModules) => {
        return new RegisteredLoggingModules(
          this.loggingModules.map(m =>
            new RegisteredLoggingModule(m.name, new LogLevel(m.logLevel.name, m.logLevel.level))));
      });
  }

  private async initialiseViewValues() {
    let appLogLevel = await this.applicationLogLevel.value();
    this.viewApplicationLogLevel = new LogLevelViewModel(appLogLevel.name(), appLogLevel.level());

    this.logLevels = this.logLevelsViewModules();
    this.loggingModules = await this.loggingModulesViewModules(await this.registeredLoggingModulesSetting.value());
  }

  private async loggingModulesViewModules(registeredLoggingModules: IRegisteredLoggingModules) {
    let loggingModules = new Array<LoggingModuleViewModel>();
    let regLogModules = await this.registeredLoggingModulesSetting.value();
    registeredLoggingModules
        .modules().forEach(m => {
          this.logger.debug(`Loaded logging modules: ${m.name()}, ${JSON.stringify(m.logLevel())}`);
          loggingModules.push(new LoggingModuleViewModel(m.name(), new LogLevelViewModel(m.logLevel().name(), m.logLevel().level())));
        });
    return loggingModules;
  }

  private logLevelsViewModules(): Array<LogLevelViewModel> {
    let logLevels = new Array<LogLevelViewModel>();
    logLevels.push(this.collectLogLevel(new LogLevelOff()));
    logLevels.push(this.collectLogLevel(new LogLevelAll()));
    logLevels.push(this.collectLogLevel(new LogLevelDebug()));
    logLevels.push(this.collectLogLevel(new LogLevelWarn()));
    logLevels.push(this.collectLogLevel(new LogLevelError()));
    logLevels.push(this.collectLogLevel(new LogLevelInfo()));
    logLevels = logLevels.sort((a, b) => (a.level.valueOf() - b.level.valueOf()).valueOf());
    this.logger.debug(`Created array of log levels: ${logLevels.map(ll => JSON.stringify(ll)).join(", ")}`);
    return logLevels;
  }

  private collectLogLevel(logLevel: ILogLevel): LogLevelViewModel {
    return new LogLevelViewModel(logLevel.name(), logLevel.level());
  }
}

class LoggingModuleViewModel {
  public name: String;
  public logLevel: LogLevelViewModel;

  constructor(name: String, logLevel: LogLevelViewModel) {
    this.name = name;
    this.logLevel = logLevel;
  }
}

class LogLevelViewModel {
  public name: String;
  public level: Number;

  constructor(name: String, level: Number) {
    this.name = name;
    this.level = level;
  }
}
