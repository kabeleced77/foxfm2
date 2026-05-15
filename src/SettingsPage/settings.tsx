import React from "react";
import ReactDOM from "react-dom/client";
import SettingsPageMenu from "./SettingsPageMenu";
import SettingsStadium from "./stadium/SettingsStadium";
import SettingsTeamTable from "./team-table/SettingsTeamTable";
import SettingsTransferMarketAmateur from "./tm-amateur-table/SettingsTransferMarketAmateur";
import SettingsTransferMarketProfessional from "./tm-pro-table/SettingsTransferMarketProfessional";
import SettingsLogging from "./logging/SettingsLogging";
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
import {
  RessourceCommonAppName,
  RessourceSettingsPageApplicationIntro,
  RessourceSettingsPageApplicationSettings,
  RessourceSettingsPageLoggerMenu,
  RessourceSettingsPageStadiumMenu,
  RessourceSettingsPageTeamTableMenu,
  RessourceSettingsPageTransfersAmateurMenu,
  RessourceSettingsPageTransfersProfessionalsImportMenu,
  RessourceSettingsPageTransfersProfessionalsMenu,
  RessourceSettingsPageTransferMarketSellingMenu,
} from "../Common/Ressource";
import SettingsTransferMarketProfessionalImport from "./tm-pro-import/SettingsTransferMarketProfessionalImport";
import SettingsTransferMarketSelling from "./tm-selling/SettingsTransferMarketSelling";

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
      headerContent={
        <div className="w3-container" id="#">
          <h1 className="w3-jumbo">
            <b>
              {new RessourceCommonAppName().value().toString()} {" "}
              {new RessourceSettingsPageApplicationSettings()
                .value()
                .toString()}
            </b>
          </h1>
          {new RessourceSettingsPageApplicationIntro().value().toString()}
        </div>
      }
      menuSections={[
        {
          id: "stadium",
          label: new RessourceSettingsPageStadiumMenu().value().toString(),
          content: <SettingsStadium logger={logger} />,
        },
        {
          id: "team-table",
          label: new RessourceSettingsPageTeamTableMenu().value().toString(),
          content: <SettingsTeamTable logger={logger} />,
        },
        {
          id: "transfer-market-amateur-table",
          label: new RessourceSettingsPageTransfersAmateurMenu().value().toString(),
          content: <SettingsTransferMarketAmateur logger={logger} />,
        },
        {
          id: "transfer-market-professional-table",
          label: new RessourceSettingsPageTransfersProfessionalsMenu().value().toString(),
          content: <SettingsTransferMarketProfessional logger={logger} />,
        },
        {
          id: "transfer-market-selling",
          label: new RessourceSettingsPageTransferMarketSellingMenu().value().toString(),
          content: <SettingsTransferMarketSelling logger={logger} />,
        },
        {
          id: "transfer-market-professional-import",
          label: new RessourceSettingsPageTransfersProfessionalsImportMenu().value().toString(),
          content: <SettingsTransferMarketProfessionalImport logger={logger} />,
        },
        {
          id: "logging",
          label: new RessourceSettingsPageLoggerMenu().value().toString(),
          content: <SettingsLogging logger={logger} />,
        },
      ]}
    />
  </React.StrictMode>,
);
