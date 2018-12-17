import { IGameServer } from '../Common/GameServer';
import { IMatchday } from '../Common/IMatchday';
import { FoxfmIndexedDb } from '../Common/IndexedDb/FoxfmIndexedDb';
import { MatchdayIDb } from '../Common/IndexedDb/MatchdayIDb';
import { TaskConfigurationsIDb } from '../Common/IndexedDb/TaskConfigurationsIDb';
import { TaskExecutionsIDb } from '../Common/IndexedDb/TaskExecutionsIDb';
import { EasyLogger } from '../Common/Logger/EasyLogger';
import { ILogger, Logger } from '../Common/Logger/Logger';
import { ILogLevel, LogLevelError } from '../Common/Logger/LogLevel';
import { IRegisteredLoggingModule, RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import { MessagingBackgroundScript } from '../Common/Messaging/MessagingBackgroundScript';
import { IRessource, Ressource } from '../Common/Ressource';
import { SettingNameApplicationLogLevel } from '../Common/Settings/SettingNameApplicationLogLevel';
import { SettingNameLoggingModules } from '../Common/Settings/SettingNameLoggingModules';
import { ITasks } from '../Common/Tasking/ITasks';
import { TaskDownloadPlayerTransfers } from '../Common/Tasking/TaskDownloadPlayerTransfers';
import { Tasks } from '../Common/Tasking/Tasks';
import { TaskStatusReady } from '../Common/Tasking/TaskStatusReady';
import { Mutex } from '../Common/Toolkit/Mutex';
import { StorageLocal } from '../Common/Toolkit/StorageLocal';
import { StorageLocalSync } from '../Common/Toolkit/StorageLocalSync';

class FoxfmBackground {
  private log: ILogger;
  private thisModule: string = "FoxfmBackground";
  private ressourceSettings: IRessource;

  constructor(
    private tasks: ITasks,
    private indexedDb: FoxfmIndexedDb,
    logger: ILogger,
  ) {
    this.log = logger;
    var loggingModule = new RegisteredLoggingModule(this.thisModule, new LogLevelError());
    this.log.registerModuleForLogging(loggingModule);
    this.ressourceSettings = new Ressource("backgroundPageContextMenuAddonSettings");
  }

  public async main(): Promise<void> {
    try {
      this.log.info(this.thisModule, "S t a r t e d");

      this.createContextMenu();
      let messaging = new MessagingBackgroundScript(
        "",
        this.indexedDb,
        new EasyLogger(
          this.log,
          new RegisteredLoggingModule(
            "MessagingBackgroundScript",
            new LogLevelError())));
      messaging.connect();
      await this.tasks.run();
    }
    catch (e) {
      this.log.error(this.thisModule, `Error in background script: ${e.message}`);
    }
  }

  private createContextMenu() {
    chrome.contextMenus.create({ "title": this.ressourceSettings.value().toString(), "onclick": this.contextMenuSettingCallback });
  }

  private contextMenuSettingCallback(info: any, tab: any) {
    chrome.tabs.create({ url: "settings.html" });
  }
}

var logger = new Logger(
  new StorageLocal<ILogLevel>(
    new SettingNameApplicationLogLevel(),
    new LogLevelError()),
  new StorageLocalSync<IRegisteredLoggingModules>(
    new Mutex<IRegisteredLoggingModules>(),
    new StorageLocal<IRegisteredLoggingModules>(
      new SettingNameLoggingModules(),
      new RegisteredLoggingModules(
        new Array<IRegisteredLoggingModule>())))
);
var indexedDb = new FoxfmIndexedDb();

var background = new FoxfmBackground(
  new Tasks(
    [
      new TaskDownloadPlayerTransfers(
        new TaskConfigurationsIDb(
          indexedDb,
          new EasyLogger(
            logger,
            new RegisteredLoggingModule(
              "TaskConfigurationsIDb",
              new LogLevelError(),
            )),
        ),
        new TaskExecutionsIDb(
          indexedDb,
          new EasyLogger(
            logger,
            new RegisteredLoggingModule(
              "TaskExecutionsIDb",
              new LogLevelError(),
            )
          )
        ),
        "TaskDownloadPlayerTransfers",
        true,
        new TaskStatusReady(),
        new Date(2000, 2, 2, 2, 2, 2, 2),
        5,
        new MatchdayIDb(
          indexedDb,
          1,
        ),
        indexedDb,
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "Task",
            new LogLevelError(),
          )
        )
      ),
    ],
    new EasyLogger(logger,
      new RegisteredLoggingModule(
        "Tasks",
        new LogLevelError())),
  ),
  indexedDb,
  logger,
);

background.main();
