import { FoxfmIndexedDb } from '../Common/IndexedDb/FoxfmIndexedDb';
import { MatchdayIDb } from '../Common/IndexedDb/MatchdayIDb';
import { TaskConfigurationsIDb } from '../Common/IndexedDb/TaskConfigurationsIDb';
import { TaskExecutionsIDb } from '../Common/IndexedDb/TaskExecutionsIDb';
import { EasyLogger } from '../Common/Logger/EasyLogger';
import { Logger } from '../Common/Logger/Logger';
import { ILogLevel, LogLevelError } from '../Common/Logger/LogLevel';
import { IRegisteredLoggingModule, RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import { SettingNameApplicationLogLevel } from '../Common/Settings/SettingNameApplicationLogLevel';
import { SettingNameLoggingModules } from '../Common/Settings/SettingNameLoggingModules';
import { Tasks } from '../Common/Tasking/Tasks';
import { Mutex } from '../Common/Toolkit/Mutex';
import { StorageLocal } from '../Common/Toolkit/StorageLocal';
import { StorageLocalSync } from '../Common/Toolkit/StorageLocalSync';
import { TaskLogDateTime } from '../Common/Tasking/TaskLogDateTime';
import { FoxfmBackground } from './FoxfmBackground';

/****************************************************
 * Create logger used within background script
*/
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

/****************************************************
 * Create IndexedDb used within background script
 */
var indexedDb = new FoxfmIndexedDb();

/****************************************************
 * Create background script application entry poing
 */
new FoxfmBackground(
  new Tasks(
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
    new MatchdayIDb(
      indexedDb,
      1,
    ),
    [
      new TaskLogDateTime(
        "TaskLogDateTime",
        true,
        3,
        5,
        new MatchdayIDb(
          indexedDb,
          1,
        ),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "TaskLogDateTime",
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
).main().catch(e => logger.error("Background script", `error: ${e}`));
