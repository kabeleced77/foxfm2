import React, { useState, useEffect } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceSettingsPageTransferMarketProfessionalsImportTransfers,
  RessourceSettingsPageTransferMarketProfessionalsImportTransfersHeader,
  RessourceSettingsPageTransferMarketProfessionalsImportTransfersDescription,
  RessourceSettingsPageTransferMarketProfessionalsImportTransfersWarningBrowserLanguageMustMatch,
} from "../../Common/Ressource";
import { ISettingImportTransfers } from "../../Common/Settings/ISettingImportTransfers";
import { SettingNameImportTransfers } from "../../Common/Settings/SettingNameImports";
import { SettingImportTransfers } from "../../Common/Settings/SettingImportTransfers";
import { StorageLocal } from "../../Common/Toolkit/StorageLocal";
import SettingsForm from "../Components/SettingsForm";

interface ITransferMarketProfessionalTableSectionProps {
  logger: ILogger;
}

const SettingsTransferMarketProfessionalImport: React.FC<
  ITransferMarketProfessionalTableSectionProps
> = ({ logger }) => {
  const [importTransfersActivated, setImportTransfersActivated] =
    useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const easyLogger = new EasyLogger(
    logger,
    new RegisteredLoggingModule(
      "SettingsTransferMarketProfessionalTable",
      new LogLevelError(),
    ),
  );

  const [settingsImport] = useState(
    () =>
      new StorageLocal<ISettingImportTransfers>(
        new SettingNameImportTransfers(),
        new SettingImportTransfers(false),
      ),
  );

  useEffect(() => {
    // Load initial settings
    settingsImport.value().then((importSettings) => {
      setImportTransfersActivated(importSettings.activated());
      setSettingsLoaded(true);
    });
  }, [settingsImport]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    easyLogger.debug(`import transfers: ${importTransfersActivated}`);

    settingsImport.save(new SettingImportTransfers(importTransfersActivated));
  };

  return (
    <>
      {settingsLoaded && (
        <>
          <SettingsForm
            header={new RessourceSettingsPageTransferMarketProfessionalsImportTransfersHeader()
              .value()
              .toString()}
            intro={`${new RessourceSettingsPageTransferMarketProfessionalsImportTransfersDescription()
              .value()
              .toString()}<br />${new RessourceSettingsPageTransferMarketProfessionalsImportTransfersWarningBrowserLanguageMustMatch()
              .value()
              .toString()}`}
            checkboxes={[
              {
                id: "tmp-import-transfers",
                label:
                  new RessourceSettingsPageTransferMarketProfessionalsImportTransfers()
                    .value()
                    .toString(),
                checked: importTransfersActivated,
                onChange: (e) => setImportTransfersActivated(e.target.checked),
              },
            ]}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </>
  );
};

export default SettingsTransferMarketProfessionalImport;
