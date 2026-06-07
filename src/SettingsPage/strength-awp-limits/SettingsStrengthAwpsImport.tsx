import React, { useState } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceCommonButtonImport,
  RessourceSettingsPageStrengthAwpLimitsImportHeader,
  RessourceSettingsPageStrengthAwpLimitsImportIntro,
  RessourceSettingsPageStrengthAwpLimitsImportLabel,
  RessourceSettingsPageStrengthAwpLimitsImportSuccess,
} from "../../Common/Ressource";
import { StrengthsLimitsSetting } from "../../Common/Settings/StrengthsLimitsSetting";
import { StrengthLimits } from "../../Common/StrengthLimits";
import SettingsForm from "../Components/SettingsForm";

interface ISettingsStrengthAwpImportProps {
  logger: ILogger;
}

const SettingsStrengthAwpImport: React.FC<ISettingsStrengthAwpImportProps> = ({ logger }) => {
  const [strengthLevelLimits, setStrengthLevelLimits] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackIsError, setFeedbackIsError] = useState(false);
  const [settingsModel] = useState(() => new StrengthsLimitsSetting());

  const easyLogger = new EasyLogger(
    logger,
    new RegisteredLoggingModule("SettingsStrengthAwpImport", new LogLevelError()),
  );

  const importStrengthLevelLimits = async (input: string) => {
    const userinput = input.replace(/\./gm, "");
    if (!userinput) {
      throw new Error("ofm.strengthlevel.importerror");
    }

    const matched = userinput.match(/\d+\.*\d*/gm);
    easyLogger.debug(`Strengthlevel & points: ${matched}`);
    if (!matched) {
      throw new Error("ofm.strengthlevel.importerror");
    }

    let strDebug = "";
    for (let i = 0; i + 1 < matched.length; i += 2) {
      const strengthlevel = parseInt(matched[i], 10);
      const strengthlevelawps = parseInt(matched[i + 1], 10);
      if (strengthlevel > 0) {
        strDebug += `${strengthlevel} - ${strengthlevelawps}; `;
        const currentStrengthLimits = await settingsModel.strengthLevel(strengthlevel);
        await settingsModel.changeStrengthLimits(
          new StrengthLimits(strengthlevel, currentStrengthLimits.wage(), strengthlevelawps),
        );
      }
    }

    easyLogger.debug(strDebug);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    easyLogger.info(`Import called: ${strengthLevelLimits}`);

    try {
      if (strengthLevelLimits.trim().length > 0) {
        await importStrengthLevelLimits(strengthLevelLimits);
        setStrengthLevelLimits("");
        setFeedbackIsError(false);
        setFeedbackMessage(new RessourceSettingsPageStrengthAwpLimitsImportSuccess().value().toString());
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "ofm.strengthlevel.importerror";
      easyLogger.debug(`Import failed: ${message}`);
      setFeedbackIsError(true);
      setFeedbackMessage(message);
    }
  };

  return (
    <SettingsForm
      header={new RessourceSettingsPageStrengthAwpLimitsImportHeader().value().toString()}
      intro={new RessourceSettingsPageStrengthAwpLimitsImportIntro().value().toString()}
      handleSubmit={handleSubmit}
      buttonId="import-strength-awps"
      buttonLabel={new RessourceCommonButtonImport().value().toString()}
    >
      <div className="form-group" style={{ marginBottom: 20 }}>
        <label htmlFor="idStrLevelLimits">
          {new RessourceSettingsPageStrengthAwpLimitsImportLabel().value().toString()}
          <input
            id="idStrLevelLimits"
            name="strLevelLimits"
            type="text"
            value={strengthLevelLimits}
            onChange={(e) => setStrengthLevelLimits(e.target.value)}
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>

      {feedbackMessage && (
        <div className={feedbackIsError ? "w3-text-red" : "w3-text-green"} style={{ marginBottom: 16 }}>
          {feedbackMessage}
        </div>
      )}
    </SettingsForm>
  );
};

export default SettingsStrengthAwpImport;
