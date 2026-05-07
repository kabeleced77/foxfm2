import React, { useState, useEffect } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceCommonButtonApply,
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
import InputCheckbox from "../Components/InputCheckbox";
import Button from "../Components/Button";

interface TransferMarketAmateurTableSectionProps {
  logger: ILogger;
}

const TransferMarketAmateurTableSection: React.FC<
  TransferMarketAmateurTableSectionProps
> = ({ logger }) => {
  const [addAwpActivated, setAddAwpActivated] = useState(false);
  const [addAwpDiffActivated, setAddAwpDiffActivated] = useState(false);
  const [addNextStrengthActivated, setAddNextStrengthActivated] =
    useState(false);
  const [extendStrengthActivated, setExtendStrengthActivated] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

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
      setResourcesLoaded(true);
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
      <h1 className="w3-xxxlarge w3-text-red">
        <b>
          {new RessourceSettingsPageTransfersAmateurHeader().value().toString()}
        </b>
      </h1>
      <hr style={{ width: 50, border: "5px solid red" }} className="w3-round" />
      {new RessourceSettingsPageTransfersAmateurIntro().value().toString()}

      {resourcesLoaded && (
        <form onSubmit={handleSubmit}>
          <InputCheckbox
            id="add-awp"
            name="addAwp"
            label={new RessourceCommonSettingsAddColumnAwp().value().toString()}
            checked={addAwpActivated}
            onChange={(event) => setAddAwpActivated(event.target.checked)}
          />
          <InputCheckbox
            id="add-awp-diff"
            name="addAwpDiff"
            label={new RessourceCommonSettingsAddColumnAwpDiff()
              .value()
              .toString()}
            checked={addAwpDiffActivated}
            onChange={(event) => setAddAwpDiffActivated(event.target.checked)}
          />
          <InputCheckbox
            id="add-next-strength"
            name="addNextStrength"
            label={new RessourceCommonSettingsAddColumnNextStrength()
              .value()
              .toString()}
            checked={addNextStrengthActivated}
            labelClass=""
            onChange={(event) =>
              setAddNextStrengthActivated(event.target.checked)
            }
          />
          <InputCheckbox
            id="extend-strength"
            name="extendStrength"
            label={new RessourceCommonSettingsExtendColumnStrength()
              .value()
              .toString()}
            labelClass=""
            checked={extendStrengthActivated}
            onChange={(event) =>
              setExtendStrengthActivated(event.target.checked)
            }
          />
          <Button
            id="apply-settings"
            type="submit"
            title={new RessourceCommonButtonApply().value().toString()}
            value={new RessourceCommonButtonApply().value().toString()}
          />
        </form>
      )}
    </>
  );
};

export default TransferMarketAmateurTableSection;
