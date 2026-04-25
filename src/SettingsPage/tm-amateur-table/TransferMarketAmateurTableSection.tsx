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
import Section from "../Components/Section";

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
      <Section>
        {new RessourceSettingsPageTransfersAmateurIntro().value().toString()}
      </Section>

      {resourcesLoaded && (
        <section style={{ marginBottom: "30px" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div style={{ marginBottom: "15px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={addAwpActivated}
                    onChange={(event) =>
                      setAddAwpActivated(event.target.checked)
                    }
                  />{" "}
                  {new RessourceCommonSettingsAddColumnAwp().value()}
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={addAwpDiffActivated}
                    onChange={(event) =>
                      setAddAwpDiffActivated(event.target.checked)
                    }
                  />{" "}
                  {new RessourceCommonSettingsAddColumnAwpDiff().value()}
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={addNextStrengthActivated}
                    onChange={(event) =>
                      setAddNextStrengthActivated(event.target.checked)
                    }
                  />{" "}
                  {new RessourceCommonSettingsAddColumnNextStrength().value()}
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={extendStrengthActivated}
                    onChange={(event) =>
                      setExtendStrengthActivated(event.target.checked)
                    }
                  />{" "}
                  {new RessourceCommonSettingsExtendColumnStrength().value()}
                </label>
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="w3-button w3-red">
                {new RessourceCommonButtonApply().value()}
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default TransferMarketAmateurTableSection;
