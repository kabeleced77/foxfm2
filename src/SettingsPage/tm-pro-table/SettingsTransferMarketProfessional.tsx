import React, { useState, useEffect } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceSettingsPageTransfersProfessionalsHeader,
  RessourceCommonSettingsExtendColumnStrength,
  RessourceCommonSettingsAddColumnAwp,
  RessourceCommonSettingsAddColumnAwpDiff,
  RessourceCommonSettingsAddColumnNextStrength,
  RessourceSettingsPageTransfersProfessionalsWarningSlidersAreNotSupported,
  RessourceSettingsPageTransfersProfessionalsIntro,
  RessourceCommonSettingsAddColumnsTransferPricesIntroduction,
  RessourceCommonSettingsAddColumnTransferPriceCurrentStrength,
  RessourceCommonSettingsAddColumnTransferPriceNextAgeCurrentStrength,
  RessourceCommonSettingsAddColumnTransferPriceNextAgeNextStrength,
  RessourceCommonSettingsAddColumnTransferPriceNextStrength,
} from "../../Common/Ressource";
import {
  ITransferMarketSearchResultTableSettings,
  TransferMarketSearchResultTableSettings,
} from "../../Common/Settings/TransferMarketSearchResultTableSettings";
import { SettingNameTransferMarketProfessionalsSearchResultTable } from "../../Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable";
import { ISettingImportTransfers } from "../../Common/Settings/ISettingImportTransfers";
import { SettingNameImportTransfers } from "../../Common/Settings/SettingNameImports";
import { SettingImportTransfers } from "../../Common/Settings/SettingImportTransfers";
import { StorageLocal } from "../../Common/Toolkit/StorageLocal";
import SettingsForm from "../Components/SettingsForm";

interface ITransferMarketProfessionalTableSectionProps {
  logger: ILogger;
}

const SettingsTransferMarketProfessional: React.FC<
  ITransferMarketProfessionalTableSectionProps
> = ({ logger }) => {
  const [extendColumngStrengthActivated, setExtendColumngStrengthActivated] =
    useState(false);
  const [addColumngAwpActivated, setAddColumngAwpActivated] = useState(false);
  const [addColumngAwpDiffActivated, setAddColumngAwpDiffActivated] =
    useState(false);
  const [addColumnNextStrengthActivated, setAddColumnNextStrengthActivated] =
    useState(false);
  const [
    addColumnTransferPricesCurrentStrengthActivated,
    setAddColumnTransferPricesCurrentStrengthActivated,
  ] = useState(false);
  const [
    addColumnTransferPricesNextStrengthActivated,
    setAddColumnTransferPricesNextStrengthActivated,
  ] = useState(false);
  const [
    addColumnTransferPricesNextAgeCurrentStrengthActivated,
    setAddColumnTransferPricesNextAgeCurrentStrengthActivated,
  ] = useState(false);
  const [
    addColumnTransferPricesNextAgeNextStrengthActivated,
    setAddColumnTransferPricesNextAgeNextStrengthActivated,
  ] = useState(false);
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

  const [transferMarketSettings] = useState(
    () =>
      new StorageLocal<ITransferMarketSearchResultTableSettings>(
        new SettingNameTransferMarketProfessionalsSearchResultTable(),
        new TransferMarketSearchResultTableSettings(
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ),
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
    transferMarketSettings.value().then((transferSettings) => {
      setExtendColumngStrengthActivated(
        transferSettings.extendStrengthColumnActivated(),
      );
      setAddColumngAwpActivated(transferSettings.addAwpColumnActivated());
      setAddColumngAwpDiffActivated(
        transferSettings.addAwpDiffColumnActivated(),
      );
      setAddColumnNextStrengthActivated(
        transferSettings.addNextStrengthColumnActivated(),
      );
      setAddColumnTransferPricesCurrentStrengthActivated(
        transferSettings.addTransferPriceStrengthColumnActivated(),
      );
      setAddColumnTransferPricesNextStrengthActivated(
        transferSettings.addTransferPriceNextStrengthColumnActivated(),
      );
      setAddColumnTransferPricesNextAgeCurrentStrengthActivated(
        transferSettings.addTransferPriceNextAgeStrengthColumnActivated(),
      );
      setAddColumnTransferPricesNextAgeNextStrengthActivated(
        transferSettings.addTransferPriceNextAgeNextStrengthColumnActivated(),
      );
      setSettingsLoaded(true);
    });
  }, [transferMarketSettings, settingsImport]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    easyLogger.debug(
      `extend col strength: ${extendColumngStrengthActivated}, add col AWP: ${addColumngAwpActivated}, add col AWP Diff: ${addColumngAwpDiffActivated}, add col next strength: ${addColumnNextStrengthActivated}, add col transfer price current strength: ${addColumnTransferPricesCurrentStrengthActivated}, add col transfer price next strength: ${addColumnTransferPricesNextStrengthActivated}, add col transfer price next age current strength: ${addColumnTransferPricesNextAgeCurrentStrengthActivated}, add col transfer price next age next strength: ${addColumnTransferPricesNextAgeNextStrengthActivated}, import transfers: ${importTransfersActivated}`,
    );

    transferMarketSettings.save(
      new TransferMarketSearchResultTableSettings(
        extendColumngStrengthActivated,
        addColumngAwpActivated,
        addColumngAwpDiffActivated,
        addColumnNextStrengthActivated,
        addColumnTransferPricesCurrentStrengthActivated,
        addColumnTransferPricesNextStrengthActivated,
        addColumnTransferPricesNextAgeCurrentStrengthActivated,
        addColumnTransferPricesNextAgeNextStrengthActivated,
      ),
    );
  };

  return (
    <>
      {settingsLoaded && (
        <>
          <SettingsForm
            header={new RessourceSettingsPageTransfersProfessionalsHeader()
              .value()
              .toString()}
            intro={
              new RessourceSettingsPageTransfersProfessionalsIntro()
                .value()
                .toString() +
              " " +
              new RessourceSettingsPageTransfersProfessionalsWarningSlidersAreNotSupported()
                .value()
                .toString() +
              " " +
              new RessourceCommonSettingsAddColumnsTransferPricesIntroduction()
                .value()
                .toString()
            }
            checkboxes={[
              {
                id: "tmp-extend-column-strength",
                label: new RessourceCommonSettingsExtendColumnStrength()
                  .value()
                  .toString(),
                checked: extendColumngStrengthActivated,
                onChange: (e) =>
                  setExtendColumngStrengthActivated(e.target.checked),
              },
              {
                id: "tmp-add-column-awp",
                label: new RessourceCommonSettingsAddColumnAwp()
                  .value()
                  .toString(),
                checked: addColumngAwpActivated,
                onChange: (e) => setAddColumngAwpActivated(e.target.checked),
              },
              {
                id: "tmp-add-column-awp-diff",
                label: new RessourceCommonSettingsAddColumnAwpDiff()
                  .value()
                  .toString(),
                checked: addColumngAwpDiffActivated,
                onChange: (e) =>
                  setAddColumngAwpDiffActivated(e.target.checked),
              },
              {
                id: "tmp-add-column-next-strength",
                label: new RessourceCommonSettingsAddColumnNextStrength()
                  .value()
                  .toString(),
                checked: addColumnNextStrengthActivated,
                onChange: (e) =>
                  setAddColumnNextStrengthActivated(e.target.checked),
              },
              {
                id: "tmp-add-column-transfer-price-current-strength",
                label:
                  new RessourceCommonSettingsAddColumnTransferPriceCurrentStrength()
                    .value()
                    .toString(),
                checked: addColumnTransferPricesCurrentStrengthActivated,
                onChange: (e) =>
                  setAddColumnTransferPricesCurrentStrengthActivated(
                    e.target.checked,
                  ),
              },
              {
                id: "tmp-add-column-transfer-price-next-strength",
                label:
                  new RessourceCommonSettingsAddColumnTransferPriceNextStrength()
                    .value()
                    .toString(),
                checked: addColumnTransferPricesNextStrengthActivated,
                onChange: (e) =>
                  setAddColumnTransferPricesNextStrengthActivated(
                    e.target.checked,
                  ),
              },
              {
                id: "tmp-add-column-transfer-price-next-age-current-strength",
                label:
                  new RessourceCommonSettingsAddColumnTransferPriceNextAgeCurrentStrength()
                    .value()
                    .toString(),
                checked: addColumnTransferPricesNextAgeCurrentStrengthActivated,
                onChange: (e) =>
                  setAddColumnTransferPricesNextAgeCurrentStrengthActivated(
                    e.target.checked,
                  ),
              },
              {
                id: "tmp-add-column-transfer-price-next-age-next-strength",
                label:
                  new RessourceCommonSettingsAddColumnTransferPriceNextAgeNextStrength()
                    .value()
                    .toString(),
                checked: addColumnTransferPricesNextAgeNextStrengthActivated,
                onChange: (e) =>
                  setAddColumnTransferPricesNextAgeNextStrengthActivated(
                    e.target.checked,
                  ),
              },
            ]}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </>
  );
};

export default SettingsTransferMarketProfessional;
