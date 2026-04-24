import React, { useState, useEffect } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceTeamTableSettingsHeader,
  RessourceCommonButtonApply,
  RessourceCommonSettingsExtendColumnStrength,
  RessourceCommonSettingsAddColumnAwpDiff,
  RessourceCommonSettingsAddColumnNextStrength,
} from "../../Common/Ressource";
import {
  ITeamTableSetting,
  TeamTableSetting,
} from "../../Common/Settings/TeamTableSetting";
import { SettingNameTeamTable } from "../../Common/Settings/SettingNameTeamTable";
import { StorageLocal } from "../../Common/Toolkit/StorageLocal";

interface ITeamTableSectionProps {
  logger: ILogger;
}

const TeamTableSection: React.FC<ITeamTableSectionProps> = ({ logger }) => {
  const [extendColumngStrengthActivated, setExtendColumngStrengthActivated] =
    useState(false);
  const [addColumngAwpDiffActivated, setAddColumngAwpDiffActivated] =
    useState(false);
  const [addColumnNextStrengthActivated, setAddColumnNextStrengthActivated] =
    useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  const easyLogger = new EasyLogger(
    logger,
    new RegisteredLoggingModule("TeamTableSection", new LogLevelError()),
  );

  const [teamTableSettings] = useState(
    () =>
      new StorageLocal<ITeamTableSetting>(
        new SettingNameTeamTable(),
        new TeamTableSetting(false, false, false),
      ),
  );

  useEffect(() => {
    // Load initial settings
    teamTableSettings.value().then((settings) => {
      setExtendColumngStrengthActivated(
        settings.extendStrengthColumnActivated(),
      );
      setAddColumngAwpDiffActivated(settings.addAwpDiffColumnActivated());
      setAddColumnNextStrengthActivated(
        settings.addNextStrengthColumnActivated(),
      );
      setResourcesLoaded(true);
    });
  }, [teamTableSettings]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    easyLogger.debug(
      `extend col strength: ${extendColumngStrengthActivated}, add col AWP Diff: ${addColumngAwpDiffActivated}, add col next strength: ${addColumnNextStrengthActivated}`,
    );

    teamTableSettings.save(
      new TeamTableSetting(
        extendColumngStrengthActivated,
        addColumngAwpDiffActivated,
        addColumnNextStrengthActivated,
      ),
    );
  };

  return (
    <>
      <h1 className="w3-xxxlarge w3-text-red">
        <b>{new RessourceTeamTableSettingsHeader().value().toString()}</b>
      </h1>
      <hr style={{ width: 50, border: "5px solid red" }} className="w3-round" />

      {/* Team Table Settings Form */}
      {resourcesLoaded && (
        <section style={{ marginBottom: "30px" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div style={{ marginBottom: "15px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={extendColumngStrengthActivated}
                    onChange={(e) =>
                      setExtendColumngStrengthActivated(e.target.checked)
                    }
                  />{" "}
                  {new RessourceCommonSettingsExtendColumnStrength().value()}
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={addColumngAwpDiffActivated}
                    onChange={(e) =>
                      setAddColumngAwpDiffActivated(e.target.checked)
                    }
                  />{" "}
                  {new RessourceCommonSettingsAddColumnAwpDiff().value()}
                </label>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={addColumnNextStrengthActivated}
                    onChange={(e) =>
                      setAddColumnNextStrengthActivated(e.target.checked)
                    }
                  />{" "}
                  {new RessourceCommonSettingsAddColumnNextStrength().value()}
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

export default TeamTableSection;
