import React, { useState, useEffect } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceCommonSettingsExtendColumnStrength,
  RessourceCommonSettingsAddColumnAwpDiff,
  RessourceCommonSettingsAddColumnNextStrength,
  RessourceSettingsPageTeamTableIntro,
  RessourceSettingsPageTeamTableHeader,
} from "../../Common/Ressource";
import {
  ITeamTableSetting,
  TeamTableSetting,
} from "../../Common/Settings/TeamTableSetting";
import { SettingNameTeamTable } from "../../Common/Settings/SettingNameTeamTable";
import { StorageLocal } from "../../Common/Toolkit/StorageLocal";
import SettingsForm from "../Components/SettingsForm";

interface ITeamTableSectionProps {
  logger: ILogger;
}

const SettingsTeamTable: React.FC<ITeamTableSectionProps> = ({ logger }) => {
  const [extendColumngStrengthActivated, setExtendColumngStrengthActivated] =
    useState(false);
  const [addColumngAwpDiffActivated, setAddColumngAwpDiffActivated] =
    useState(false);
  const [addColumnNextStrengthActivated, setAddColumnNextStrengthActivated] =
    useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

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
      setSettingsLoaded(true);
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
      {settingsLoaded && (
        <SettingsForm
          header={new RessourceSettingsPageTeamTableHeader().value().toString()}
          intro={new RessourceSettingsPageTeamTableIntro().value().toString()}
          checkboxes={[
            {
              id: "extend-column-strength",
              label: new RessourceCommonSettingsExtendColumnStrength()
                .value()
                .toString(),
              checked: extendColumngStrengthActivated,
              onChange: (e) =>
                setExtendColumngStrengthActivated(e.target.checked),
            },
            {
              id: "add-column-awp-diff",
              label: new RessourceCommonSettingsAddColumnAwpDiff()
                .value()
                .toString(),
              checked: addColumngAwpDiffActivated,
              onChange: (e) => setAddColumngAwpDiffActivated(e.target.checked),
            },
            {
              id: "add-column-next-strength",
              label: new RessourceCommonSettingsAddColumnNextStrength()
                .value()
                .toString(),
              checked: addColumnNextStrengthActivated,
              onChange: (e) =>
                setAddColumnNextStrengthActivated(e.target.checked),
            },
          ]}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default SettingsTeamTable;
