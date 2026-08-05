import React, { JSX, useEffect, useState } from 'react';
import { ILogger } from '../../Common/Logger/Logger';
import { LogLevelError } from '../../Common/Logger/LogLevel';
import { RegisteredLoggingModule } from '../../Common/Logger/RegisteredLoggingModule';
import { EasyLogger } from '../../Common/Logger/EasyLogger';
import {
  RessourceCommonButtonApply,
  RessourceSettingsPageStrengthAwpLimitsHeader,
  RessourceSettingsPageStrengthAwpLimitsIntro,
  RessourceSettingsPageStrengthAwpLimitsTableHeaderAwps,
  RessourceSettingsPageStrengthAwpLimitsTableHeaderStrength,
} from '../../Common/Ressource';
import { StrengthsLimitsSetting } from '../../Common/Settings/StrengthsLimitsSetting';
import { StrengthLimits } from '../../Common/StrengthLimits';
import SettingsForm from '../Components/SettingsForm';

interface ISettingsStrengthAwpRowsProps {
  logger: ILogger;
}

interface StrengthLimitsViewModel {
  strength: number;
  strengthLabel: string;
  awps: string;
  wage: number;
}

const SettingsStrengthAwps: React.FC<ISettingsStrengthAwpRowsProps> = ({ logger }) => {
  const [strengthsLimits, setStrengthsLimits] = useState<StrengthLimitsViewModel[]>([]);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackIsError, setFeedbackIsError] = useState(false);
  const [settingsModel] = useState(() => new StrengthsLimitsSetting());

  const easyLogger = new EasyLogger(
    logger,
    new RegisteredLoggingModule('SettingsStrengthAwpRows', new LogLevelError()),
  );

  const parseLocalizedNumber = (s: string) => {
    if (!s) return NaN;
    const trimmed = s.trim();
    if (trimmed.length === 0) return NaN;

    const digitsOnly = trimmed.replace(/\D/g, '');
    return digitsOnly.length > 0 ? Number(digitsOnly) : NaN;
  };

  useEffect(() => {
    const loadSettings = async () => {
      const stored = await settingsModel.strengthsLimits();
      setStrengthsLimits(
        stored.strengthsLimits().map((limit) => ({
          strength: limit.value(),
          strengthLabel: String(limit.value()),
          awps: String(limit.awpPoints()),
          wage: limit.wage(),
        })),
      );
      setSettingsLoaded(true);
    };

    loadSettings();
  }, [settingsModel]);

  const updateAwpsValue = (strength: number, awps: string) => {
    setStrengthsLimits((current) =>
      current.map((limit) => (limit.strength === strength ? { ...limit, awps } : limit)),
    );
  };

  const saveStrengthsLimits = async () => {
    const changedLimits = strengthsLimits.map((limit) => {
      const parsed = parseLocalizedNumber(limit.awps);
      const awpsValue = Number.isNaN(parsed) ? NaN : Math.trunc(parsed);
      if (Number.isNaN(awpsValue)) {
        throw new Error('ofm.strengthlevel.importerror');
      }
      return new StrengthLimits(limit.strength, limit.wage, awpsValue);
    });

    await settingsModel.changeStrengthsLimits(changedLimits);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    easyLogger.info(`Save rows called`);

    try {
      await saveStrengthsLimits();
      setFeedbackIsError(false);
      setFeedbackMessage(new RessourceCommonButtonApply().value().toString());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'ofm.strengthlevel.importerror';
      easyLogger.debug(`Save failed: ${message}`);
      setFeedbackIsError(true);
      setFeedbackMessage(message);
    }
  };

  return (
    <>
      {settingsLoaded && (
        <SettingsForm
          header={new RessourceSettingsPageStrengthAwpLimitsHeader().value().toString()}
          intro={new RessourceSettingsPageStrengthAwpLimitsIntro().value().toString()}
          handleSubmit={handleSubmit}
          buttonId="save-strength-awps"
          buttonLabel={new RessourceCommonButtonApply().value().toString()}
        >
          {feedbackMessage && (
            <div
              className={feedbackIsError ? 'w3-text-red' : 'w3-text-green'}
              style={{ marginBottom: 16 }}
            >
              {feedbackMessage}
            </div>
          )}

          <table className="w3-table-all w3-centered">
            <thead>
              <tr className="w3-light-grey">
                {(() => {
                  const pairsPerRow = 3;
                  const headers: JSX.Element[] = [];
                  for (let i = 0; i < pairsPerRow; i++) {
                    headers.push(
                      <th key={`h-strength-${i}`}>
                        {new RessourceSettingsPageStrengthAwpLimitsTableHeaderStrength()
                          .value()
                          .toString()}
                      </th>,
                    );
                    headers.push(
                      <th key={`h-awps-${i}`}>
                        {new RessourceSettingsPageStrengthAwpLimitsTableHeaderAwps()
                          .value()
                          .toString()}
                      </th>,
                    );
                  }
                  return headers;
                })()}
              </tr>
            </thead>
            <tbody>
              {(() => {
                const pairsPerRow = 3;

                const rows: StrengthLimitsViewModel[][] = [];
                // split the strengthsLimits into rows of pairsPerRow
                for (let i = 0; i < strengthsLimits.length; i += pairsPerRow)
                  rows.push(strengthsLimits.slice(i, i + pairsPerRow));

                return rows.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`}>
                    {row.map((limit) => (
                      <React.Fragment key={limit.strength}>
                        <td>{limit.strengthLabel}</td>
                        <td>
                          <input
                            id={`awps-${limit.strength}`}
                            type="text"
                            inputMode="numeric"
                            value={limit.awps}
                            onChange={(e) => updateAwpsValue(limit.strength, e.target.value)}
                            style={{ width: 120 }}
                          />
                        </td>
                      </React.Fragment>
                    ))}
                    {row.length < pairsPerRow &&
                      Array.from({ length: pairsPerRow - row.length }).map((_, idx) => (
                        <React.Fragment key={`empty-${idx}`}>
                          <td />
                          <td />
                        </React.Fragment>
                      ))}
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </SettingsForm>
      )}
    </>
  );
};

export default SettingsStrengthAwps;
