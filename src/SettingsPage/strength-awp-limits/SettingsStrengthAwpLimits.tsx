import React, { useEffect, useState } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceCommonButtonImport,
  RessourceStrengthAwpLimitsSettingsHeader,
  RessourceStrengthAwpLimitsSettingsIntro,
  RessourceStrengthAwpLimitsSettingsImportLabel,
  RessourceStrengthAwpLimitsSettingsTableHeaderStrength,
  RessourceStrengthAwpLimitsSettingsTableHeaderAwps,
  RessourceStrengthAwpLimitsSettingsImportSuccess,
} from "../../Common/Ressource";
import { StrengthsLimitsSetting } from "../../Common/Settings/StrengthsLimitsSetting";
import { StrengthLimits } from "../../Common/StrengthLimits";
import SettingsForm from "../Components/SettingsForm";

interface ISettingsStrengthAwpLimitsProps {
  logger: ILogger;
}

interface StrengthLimitsViewModel {
  strength: string;
  awps: string;
}

const SettingsStrengthAwpLimits: React.FC<ISettingsStrengthAwpLimitsProps> = ({ logger }) => {
  const [strengthLevelLimits, setStrengthLevelLimits] = useState("");
  const [strengthsLimits, setStrengthsLimits] = useState<StrengthLimitsViewModel[]>([]);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [settingsModel] = useState(() => new StrengthsLimitsSetting());

  const easyLogger = new EasyLogger(
    logger,
    new RegisteredLoggingModule("SettingsStrengthAwpLimits", new LogLevelError()),
  );

  useEffect(() => {
    const loadSettings = async () => {
      const stored = await settingsModel.strengthsLimits();
      setStrengthsLimits(
        stored.strengthsLimits().map((limit) => ({
          strength: limit.value().toLocaleString(),
          awps: limit.awpPoints().toLocaleString(),
        })),
      );
      setSettingsLoaded(true);
    };

    loadSettings();
  }, [settingsModel]);

  const refreshStrengthsLimits = async () => {
    const stored = await settingsModel.strengthsLimits();
    setStrengthsLimits(
      stored.strengthsLimits().map((limit) => ({
        strength: limit.value().toLocaleString(),
        awps: limit.awpPoints().toLocaleString(),
      })),
    );
  };

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
        settingsModel.changeStrengthLimits(
          new StrengthLimits(
            strengthlevel,
            currentStrengthLimits.wage(),
            strengthlevelawps,
          ),
        );
      }
    }

    easyLogger.debug(strDebug);
    await refreshStrengthsLimits();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    easyLogger.info(`Submitted called: ${strengthLevelLimits}`);

    try {
      await importStrengthLevelLimits(strengthLevelLimits);
      setErrorMessage(new RessourceStrengthAwpLimitsSettingsImportSuccess().value().toString());
    } catch (error) {
      const message = error instanceof Error ? error.message : "ofm.strengthlevel.importerror";
      easyLogger.debug(`Import failed: ${message}`);
      setErrorMessage(message);
    }
  };

  return (
    <>
      {settingsLoaded && (
        <SettingsForm
          header={new RessourceStrengthAwpLimitsSettingsHeader().value().toString()}
          intro={new RessourceStrengthAwpLimitsSettingsIntro().value().toString()}
          handleSubmit={handleSubmit}
          buttonId="apply-settings-strength-awp-limits"
          buttonLabel={new RessourceCommonButtonImport().value().toString()}
        >
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label htmlFor="idStrLevelLimits">
              {new RessourceStrengthAwpLimitsSettingsImportLabel()
                .value()
                .toString()}
              <input
                id="idStrLevelLimits"
                name="strLevelLimits"
                type="text"
                value={strengthLevelLimits}
                onChange={(event) => setStrengthLevelLimits(event.target.value)}
                style={{ marginLeft: 10 }}
              />
            </label>
          </div>

          {errorMessage && (
            <div className="w3-text-red" style={{ marginBottom: 16 }}>
              {errorMessage}
            </div>
          )}

          <table className="table table-striped">
            <thead>
              <tr>
                <th>
                  {new RessourceStrengthAwpLimitsSettingsTableHeaderStrength()
                    .value()
                    .toString()}
                </th>
                <th>
                  {new RessourceStrengthAwpLimitsSettingsTableHeaderAwps()
                    .value()
                    .toString()}
                </th>
              </tr>
            </thead>
            <tbody>
              {strengthsLimits.map((limit) => (
                <tr key={limit.strength}>
                  <td>{limit.strength}</td>
                  <td>{limit.awps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SettingsForm>
      )}
    </>
  );
};

export default SettingsStrengthAwpLimits;
