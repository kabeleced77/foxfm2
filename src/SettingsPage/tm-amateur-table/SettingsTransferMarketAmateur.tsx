import React, { useState, useEffect } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceCommonSettingsAddColumnAwp,
  RessourceCommonSettingsAddColumnAwpDiff,
  RessourceCommonSettingsAddColumnNextStrength,
  RessourceCommonSettingsExtendColumnStrength,
  RessourceSettingsPageTransfersAmateurHeader,
  RessourceSettingsPageTransfersAmateurIntro,
} from "../../Common/Ressource";
import {
  ITransferMarketAmateurPlayerTableSettings,
  TransferMarketAmateurPlayerTableSettings,
} from "../../Common/Settings/TransferMarketAmateurPlayerTableSettings";
import { SettingNameTransferMarketAmateurTable } from "../../Common/Settings/SettingNameTransferMarketAmateurTable";
import { StorageLocal } from "../../Common/Toolkit/StorageLocal";
import SettingsForm from "../Components/SettingsForm";

interface TransferMarketAmateurTableSectionProps {
  logger: ILogger;
}

const SettingsTransferMarketAmateur: React.FC<
  TransferMarketAmateurTableSectionProps
> = ({ logger }) => {
  const [addAwpActivated, setAddAwpActivated] = useState(false);
  const [addAwpDiffActivated, setAddAwpDiffActivated] = useState(false);
  const [addNextStrengthActivated, setAddNextStrengthActivated] =
    useState(false);
  const [extendStrengthActivated, setExtendStrengthActivated] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const easyLogger = new EasyLogger(
    logger,
    new RegisteredLoggingModule(
      "TransferMarketAmateurTableSection",
      new LogLevelError(),
    ),
  );

  const [settingsStorage] = useState(
    () =>
      new StorageLocal<ITransferMarketAmateurPlayerTableSettings>(
        new SettingNameTransferMarketAmateurTable(),
        new TransferMarketAmateurPlayerTableSettings(
          false,
          false,
          false,
          false,
        ),
      ),
  );

  useEffect(() => {
    settingsStorage.value().then((settings) => {
      setAddAwpActivated(settings.addAwpColumnActivated());
      setAddAwpDiffActivated(settings.addAwpDiffColumnActivated());
      setAddNextStrengthActivated(settings.addNextStrengthColumnActivated());
      setExtendStrengthActivated(settings.extendStrengthColumnActivated());
      setSettingsLoaded(true);
    });
  }, [settingsStorage]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    easyLogger.debug(
      `extend col strength: ${extendStrengthActivated}, add col AWP: ${addAwpActivated}, add col AWP Diff: ${addAwpDiffActivated}, add col next strength: ${addNextStrengthActivated}`,
    );

    settingsStorage.save(
      new TransferMarketAmateurPlayerTableSettings(
        addAwpActivated,
        addAwpDiffActivated,
        addNextStrengthActivated,
        extendStrengthActivated,
      ),
    );
  };

  return (
    <>
      {settingsLoaded && (
        <SettingsForm
          header={new RessourceSettingsPageTransfersAmateurHeader()
            .value()
            .toString()}
          intro={new RessourceSettingsPageTransfersAmateurIntro()
            .value()
            .toString()}
          checkboxes={[
            {
              id: "tma-add-awp",
              label: new RessourceCommonSettingsAddColumnAwp()
                .value()
                .toString(),
              checked: addAwpActivated,
              onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                setAddAwpActivated(event.target.checked),
            },
            {
              id: "tma-add-awp-diff",
              label: new RessourceCommonSettingsAddColumnAwpDiff()
                .value()
                .toString(),
              checked: addAwpDiffActivated,
              onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                setAddAwpDiffActivated(event.target.checked),
            },
            {
              id: "tma-add-next-strength",
              label: new RessourceCommonSettingsAddColumnNextStrength()
                .value()
                .toString(),
              checked: addNextStrengthActivated,
              onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                setAddNextStrengthActivated(event.target.checked),
            },
            {
              id: "tma-extend-strength",
              label: new RessourceCommonSettingsExtendColumnStrength()
                .value()
                .toString(),
              checked: extendStrengthActivated,
              onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                setExtendStrengthActivated(event.target.checked),
            },
          ]}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default SettingsTransferMarketAmateur;
