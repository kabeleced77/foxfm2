import React from "react";
import ReactDOM from "react-dom/client";
import SettingsPage, { MenuSection } from "./SettingsPageMenu";
import StadiumSection from "./StadiumSection";
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

const headerContent = (
  <div className="w3-container" id="showcase">
    <h1 className="w3-jumbo">
      <b>Foxfm Settings</b>
    </h1>
  </div>
);

const stadiumContent = <StadiumSection />;

const loggingContent = (
  <>
    <h1 className="w3-xxxlarge w3-text-red">
      <b>Logging Settings.</b>
    </h1>
    <hr style={{ width: 50, border: "5px solid red" }} className="w3-round" />
    <p>
      The logging settings allow you to configure the logging behavior of the
      application. You can choose which logging modules are active and set the
      logging level for each module.
    </p>
    <div className="w3-row-padding">
      <Logging logger={logger} />
    </div>
  </>
);

const menuSections: MenuSection[] = [
  {
    id: "stadium",
    label: "Stadium",
    content: stadiumContent,
  },
  {
    id: "logging",
    label: "Logging",
    content: loggingContent,
  },
];

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <SettingsPage menuSections={menuSections} headerContent={headerContent} />
  </React.StrictMode>,
);
