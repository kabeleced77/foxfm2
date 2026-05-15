import React, { useState, useEffect } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceCommonSettingsExtendColumnStrength,
  RessourceCommonSettingsAddColumnAwpDiff,
  RessourceCommonSettingsAddColumnNextStrength,
  RessourceSettingsPageTransferMarketOfferTableIntro,
  RessourceSettingsPageTransferMarketOfferTableHeader,
} from "../../Common/Ressource";
import {
  ITransferOfferTableSettings,
  TransferOfferTableSettings,
} from "../../Common/Settings/TransferOfferTableSettings";
import { SettingNameTransferTablePossibleOffers } from "../../Common/Settings/SettingNameTransferTablePossibleOffers";
import { StorageLocal } from "../../Common/Toolkit/StorageLocal";
import SettingsForm from "../Components/SettingsForm";

interface ISettingsTransferMarketOfferTableProps {
  logger: ILogger;
}

const SettingsTransferMarketOfferTable: React.FC<
  ISettingsTransferMarketOfferTableProps
> = ({ logger }) => {
  const [extendColumngStrengthActivated, setExtendColumngStrengthActivated] =
    useState(false);
  const [addColumngAwpDiffActivated, setAddColumngAwpDiffActivated] =
    useState(false);
  const [addColumnNextStrengthActivated, setAddColumnNextStrengthActivated] =
    useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const easyLogger = new EasyLogger(
    logger,
    new RegisteredLoggingModule(
      "SettingsTransferMarketOfferTable",
      new LogLevelError(),
    ),
  );

  const [settingsModel] = useState(
    () =>
      new StorageLocal<ITransferOfferTableSettings>(
        new SettingNameTransferTablePossibleOffers(),
        new TransferOfferTableSettings(true, true, true),
      ),
  );

  useEffect(() => {
    settingsModel.value().then((settings) => {
      setExtendColumngStrengthActivated(settings.extendStrengthColumnActivated());
      setAddColumngAwpDiffActivated(settings.addAwpDiffColumnActivated());
      setAddColumnNextStrengthActivated(settings.addNextStrengthColumnActivated());
      setSettingsLoaded(true);
    });
  }, [settingsModel]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    easyLogger.debug(
      `extend col strength: ${extendColumngStrengthActivated}, add col AWP Diff: ${addColumngAwpDiffActivated}, add col next strength: ${addColumnNextStrengthActivated}`,
    );

    settingsModel.save(
      new TransferOfferTableSettings(
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
          header={new RessourceSettingsPageTransferMarketOfferTableHeader()
            .value()
            .toString()}
          intro={new RessourceSettingsPageTransferMarketOfferTableIntro()
            .value()
            .toString()}
          checkboxes={[
            {
              id: "tm-offer-extend-column-strength",
              label: new RessourceCommonSettingsExtendColumnStrength()
                .value()
                .toString(),
              checked: extendColumngStrengthActivated,
              onChange: (e) => setExtendColumngStrengthActivated(e.target.checked),
            },
            {
              id: "tm-offer-add-column-awp-diff",
              label: new RessourceCommonSettingsAddColumnAwpDiff()
                .value()
                .toString(),
              checked: addColumngAwpDiffActivated,
              onChange: (e) => setAddColumngAwpDiffActivated(e.target.checked),
            },
            {
              id: "tm-offer-add-column-next-strength",
              label: new RessourceCommonSettingsAddColumnNextStrength()
                .value()
                .toString(),
              checked: addColumnNextStrengthActivated,
              onChange: (e) => setAddColumnNextStrengthActivated(e.target.checked),
            },
          ]}
          handleSubmit={handleSubmit}
          buttonId="apply-settings-tm-offer-table"
        />
      )}
    </>
  );
};

export default SettingsTransferMarketOfferTable;
