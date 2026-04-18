import { useEffect, useState } from "react";
import {
  RessourceSettingsPageLoggerHeading,
  RessourceSettingsPageLoggerIntro,
} from "../../Common/Ressource";
import {
  LogLevelError,
  LogLevelInfo,
  ILogLevel,
} from "../../Common/Logger/LogLevel";
import {
  IRegisteredLoggingModule,
  RegisteredLoggingModule,
} from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import { ILogger } from "../../Common/Logger/Logger";
import LoggingLevel from "../Components/LoggingLevel";
import {
  IRegisteredLoggingModules,
  RegisteredLoggingModules,
} from "../../Common/Logger/RegisteredLoggingModules";

export default function Logging({ logger }: { logger: ILogger }) {
  const [appLogLevel, setAppLogLevel] = useState<ILogLevel>(new LogLevelInfo());
  const [loggingModules, setLoggingModules] =
    useState<IRegisteredLoggingModules>(
      new RegisteredLoggingModules(new Array<IRegisteredLoggingModule>()),
    );
  const easyLogger = new EasyLogger(
    logger,
    new RegisteredLoggingModule("SettingsLogging", new LogLevelError()),
  );

  useEffect(() => {
    const fetchData = async () => {
      setAppLogLevel(await easyLogger.logger().applicationLogLevel().value());
      setLoggingModules(await easyLogger.logger().registeredModules().value());
    };
    fetchData();
  }, []);

  function onChangeLogLevelForApplication(logLevel: ILogLevel) {
    setAppLogLevel(logLevel);
    easyLogger
      .logger()
      .applicationLogLevel()
      .update(() => logLevel);
  }
  function onChangeLogLevelForLoggingModule(
    moduleName: string,
    logLevel: ILogLevel,
  ) {
    const updatedLoggingModules = loggingModules
      .modules()
      .map((module) =>
        module.name() === moduleName
          ? new RegisteredLoggingModule(module.name(), logLevel)
          : module,
      );
    setLoggingModules(new RegisteredLoggingModules(updatedLoggingModules));
    easyLogger
      .logger()
      .registeredModules()
      .update(() => {
        return new RegisteredLoggingModules(updatedLoggingModules);
      });
  }
  const ressourceHeading = new RessourceSettingsPageLoggerHeading().value();
  const ressourceIntro = new RessourceSettingsPageLoggerIntro().value();
  return (
    <div>
      <h3>{ressourceHeading}</h3>
      <h4>{ressourceIntro}</h4>
      <LoggingLevel
        module="Application"
        selectedLogLevel={appLogLevel}
        onChange={onChangeLogLevelForApplication}
      />

      {loggingModules.modules().map((module) => (
        <LoggingLevel
          key={module.name()}
          module={module.name()}
          selectedLogLevel={module.logLevel()}
          onChange={(logLevel) =>
            onChangeLogLevelForLoggingModule(module.name(), logLevel)
          }
        />
      ))}
    </div>
  );
}
