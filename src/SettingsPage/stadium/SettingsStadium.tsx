import React, { useState, useEffect } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceSettingsPageStadiumAddOffsetPrices,
  RessourceSettingsPageStadiumAddOverallPrices,
  RessourceSettingsPageStadiumHeader,
  RessourceSettingsPageStadiumIntro,
} from "../../Common/Ressource";
import { StadiumBlocksSetting } from "../../Common/Settings/StadiumBlocksSetting";
import { StadiumOverallEntryPricesSetting } from "../../Common/Settings/StadiumOverallEntryPricesSetting";
import { IStadiumOverallEntryPrices } from "../../Common/StadiumOverallEntryPrices";
import SettingsForm from "../Components/SettingsForm";

interface StadiumSectionProps {
  logger: ILogger;
}

const SettingsStadium: React.FC<StadiumSectionProps> = ({ logger }) => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalCaption, setModalCaption] = useState<string>("");
  const [stadiumOverallPricesActivated, setStadiumOverallPricesActivated] =
    useState(false);
  const [stadiumOffsetPricesActivated, setStadiumOffsetPricesActivated] =
    useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  const easyLogger = new EasyLogger(
    logger,
    new RegisteredLoggingModule("StadiumSection", new LogLevelError()),
  );

  const [stadiumOverallPrices] = useState(
    () => new StadiumOverallEntryPricesSetting(),
  );
  const [stadiumBlocks] = useState(() => new StadiumBlocksSetting());

  useEffect(() => {
    // Load initial settings
    stadiumOverallPrices
      .overallEntryPrices()
      .then((stadiumEntryPrices: IStadiumOverallEntryPrices) => {
        setStadiumOverallPricesActivated(stadiumEntryPrices.activated());
      });

    stadiumBlocks.blocksEntryPricesOffsetActivated().then((status: boolean) => {
      setStadiumOffsetPricesActivated(status);
    });

    setResourcesLoaded(true);
  }, [stadiumOverallPrices, stadiumBlocks]);

  const onClick = (element: HTMLImageElement) => {
    setModalImage(element.src);
    setModalCaption(element.alt);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    easyLogger.info(`status overall prices: ${stadiumOverallPricesActivated}`);
    easyLogger.info(`status offset prices: ${stadiumOffsetPricesActivated}`);

    stadiumOverallPrices.changeOverallEntryPricesStatus(
      stadiumOverallPricesActivated,
    );
    stadiumBlocks.changeBlockEntryPricesOffsetStatus(
      stadiumOffsetPricesActivated,
    );
  };

  return (
    <>
    <SettingsForm
        header={new RessourceSettingsPageStadiumHeader().value().toString()}
        intro={new RessourceSettingsPageStadiumIntro().value().toString()}
        checkboxes={[
          {
            id: "stadium-overall-prices",
            label: new RessourceSettingsPageStadiumAddOverallPrices().value().toString(),
            checked: stadiumOverallPricesActivated,
            onChange: (e) => setStadiumOverallPricesActivated(e.target.checked),
          },
          {
            id: "stadium-offset-prices",
            label: new RessourceSettingsPageStadiumAddOffsetPrices().value().toString(),
            checked: stadiumOffsetPricesActivated,
            onChange: (e) =>
              setStadiumOffsetPricesActivated(e.target.checked),
          },
        ]}
        handleSubmit={handleSubmit}
      />

      {/* Screenshot Images */}
      <div className="w3-row-padding">
        <div className="w3-half">
          <img
            src="/screenshots/foxfm2-stadium-overall-price-1280-800.png"
            style={{ width: "100%" }}
            onClick={(e) => onClick(e.currentTarget)}
            alt="Stadium overall price"
          />
        </div>

        <div className="w3-half">
          <img
            src="/screenshots/foxfm2-stadium-overall-price-offset-prices-1280-800.png"
            style={{ width: "100%" }}
            onClick={(e) => onClick(e.currentTarget)}
            alt="Stadium overall price offset prices"
          />
        </div>
      </div>

      {/* Modal for full size images on click*/}
      {modalImage && (
        <div
          id="modal01"
          className="w3-modal w3-black w3-show"
          style={{ paddingTop: 0 }}
          onClick={() => setModalImage(null)}
        >
          <span
            className="w3-button w3-black w3-xxlarge w3-display-topright"
            onClick={() => setModalImage(null)}
          >
            ×
          </span>
          <div className="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
            <img id="img01" className="w3-image" src={modalImage} />
            <p id="caption">{modalCaption}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsStadium;
