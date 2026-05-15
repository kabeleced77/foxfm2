import React, { useState, useEffect } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceCommonMatchday,
  RessourceCommonMatchdays,
  RessourceSettingsPageTransferMarketSellingChangeDuration,
  RessourceSettingsPageTransferMarketSellingHeader,
  RessourceSettingsPageTransferMarketSellingIntro,
} from "../../Common/Ressource";
import {
  ITransferMarketSellingDurationSettings,
  TransferMarketSellingDurationSettings,
} from "../../Common/Settings/TransferMarketSellingDurationSettings";
import { SettingNameTransferMarketSellingDuration } from "../../Common/Settings/SettingNameTransferMarketDuration";
import { StorageLocal } from "../../Common/Toolkit/StorageLocal";
import { TransferMarketSellingDurationSettingsDefaultValue } from "../../Common/SettingsDefaultValues/TransferMarketSellingDurationSettingsDefaultValue";
import SettingsForm from "../Components/SettingsForm";
import IInput from "../Interfaces/IInput";
import ISelect from "../Interfaces/ISelect";
import { ICheckboxWithSelectOption } from "../Components/CheckboxWithSelect";

interface ISettingsTransferMarketSellingProps {
  logger: ILogger;
}

const SettingsTransferMarketSelling: React.FC<
  ISettingsTransferMarketSellingProps
> = ({ logger }) => {
  const [isActivated, setIsActivated] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [durations, setDurations] = useState<ICheckboxWithSelectOption[]>([]);

  const easyLogger = new EasyLogger(
    logger,
    new RegisteredLoggingModule(
      "SettingsTransferMarketSelling",
      new LogLevelError(),
    ),
  );

  const [settingsModel] = useState(
    () =>
      new StorageLocal<ITransferMarketSellingDurationSettings>(
        new SettingNameTransferMarketSellingDuration(),
        new TransferMarketSellingDurationSettingsDefaultValue(),
      ),
  );

  // Initialize selling durations list
  const initializeDurations = (): ICheckboxWithSelectOption[] => {
    const maxSellingDuration = 8;
    const durationList: ICheckboxWithSelectOption[] = [];
    const singular = new RessourceCommonMatchday().value();
    const plural = new RessourceCommonMatchdays().value();

    for (let index = 1; index <= maxSellingDuration; index++) {
      let duration: string;
      switch (index) {
        case 1:
          duration = `${index} ${singular} 80 Kixx`;
          break;
        case 2:
          duration = `${index} ${plural} 80 Kixx`;
          break;
        default:
          duration = `${index} ${plural}`;
          break;
      }
      durationList.push({ value: index - 1, label: duration });
    }
    return durationList;
  };

  // Load initial settings
  useEffect(() => {
    const loadSettings = async () => {
      const currentDurations = initializeDurations();
      setDurations(currentDurations);

      const settings = await settingsModel.value();
      setIsActivated(settings.activated());
      setSelectedDuration(settings.defaultSellingDuration());
      setSettingsLoaded(true);
    };

    loadSettings();
  }, [settingsModel]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    easyLogger.debug(
      `selling duration: ${selectedDuration}, activated: ${isActivated}`,
    );

    settingsModel.save(
      new TransferMarketSellingDurationSettings(isActivated, selectedDuration),
    );
  };

  return (
    <>
      {settingsLoaded && (
        <SettingsForm
          header={new RessourceSettingsPageTransferMarketSellingHeader()
            .value()
            .toString()}
          intro={new RessourceSettingsPageTransferMarketSellingIntro()
            .value()
            .toString()}
          checkboxesWithSelect={[
            {
              checkbox: {
                id: "tm-selling-change-duration",
                label: new RessourceSettingsPageTransferMarketSellingChangeDuration()
                  .value()
                  .toString(),
                checked: isActivated,
                onChange: (e) => setIsActivated(e.target.checked),
              } as IInput,
              select: {
                id: "tm-selling-duration",
                defaultValue: selectedDuration,
                onChange: (e) => setSelectedDuration(Number(e.target.value)),
              } as ISelect,
              options: durations,
            },
          ]}
          handleSubmit={handleSubmit}
          buttonId="apply-settings-tm-selling"
        />
      )}
    </>
  );
};

export default SettingsTransferMarketSelling;
