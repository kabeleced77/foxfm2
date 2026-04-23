import React from "react";
import ReactDOM from "react-dom/client";
import SettingsPageMenu from "./SettingsPageMenu";
import StadiumSection from "./stadium/StadiumSection";
import Logging from "./logging/Logging";
import { Logger } from "../Common/Logger/Logger";
import { ILogLevel, LogLevelError } from "../Common/Logger/LogLevel";
import { IRegisteredLoggingModule } from "../Common/Logger/RegisteredLoggingModule";
import {
  IRegisteredLoggingModules,
  RegisteredLoggingModules,
} from "../Common/Logger/RegisteredLoggingModules";
import { SettingNameApplicationLogLevel } from "../Common/Settings/SettingNameApplicationLogLevel";
import { SettingNameLoggingModules } from "../Common/Settings/SettingNameLoggingModules";
import { Mutex } from "../Common/Toolkit/Mutex";
import { StorageLocal } from "../Common/Toolkit/StorageLocal";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";
import "./w3.css";
import "./w3-colors-flat.css";
import "./custom.css";
import { RessourceCommonAppName, RessourceSettingsPageApplicationSettings, RessourceSettingsPageLogger, RessourceStadium } from "../Common/Ressource";

const logger = new Logger(
  new StorageLocal<ILogLevel>(
    new SettingNameApplicationLogLevel(),
    new LogLevelError(),
  ),
  new StorageLocalSync<IRegisteredLoggingModules>(
    new Mutex(),
    new StorageLocal<IRegisteredLoggingModules>(
      new SettingNameLoggingModules(),
      new RegisteredLoggingModules(new Array<IRegisteredLoggingModule>()),
    ),
  ),
);

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <SettingsPageMenu
      menuSections={[
        {
          id: "stadium",
          label: new RessourceStadium().value().toString(),
          content: <StadiumSection logger={logger} />,
        },
        {
          id: "logging",
          label: new RessourceSettingsPageLogger().value().toString(),
          content: <Logging logger={logger} />,
        },
      ]}
      headerContent={
        <div className="w3-container" id="showcase">
          <h1 className="w3-jumbo">
            <b>{new RessourceCommonAppName().value().toString()} {new RessourceSettingsPageApplicationSettings().value().toString()}</b>
          </h1>
        </div>
      }
    />
  </React.StrictMode>,
);
