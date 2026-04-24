import React, { useState, useEffect } from "react";
import { ILogger } from "../../Common/Logger/Logger";
import { LogLevelError } from "../../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../../Common/Logger/RegisteredLoggingModule";
import { EasyLogger } from "../../Common/Logger/EasyLogger";
import {
  RessourceCommonButtonApply,
  RessourceSettingsPageStadiumAddOffsetPrices,
  RessourceSettingsPageStadiumAddOverallPrices,
  RessourceSettingsPageStadiumHeader,
  RessourceSettingsPageStadiumIntro,
} from "../../Common/Ressource";
import { StadiumBlocksSetting } from "../../Common/Settings/StadiumBlocksSetting";
import { StadiumOverallEntryPricesSetting } from "../../Common/Settings/StadiumOverallEntryPricesSetting";
import { IStadiumOverallEntryPrices } from "../../Common/StadiumOverallEntryPrices";
import Section from "../Components/Section";

interface StadiumSectionProps {
  logger: ILogger;
}

const StadiumSection: React.FC<StadiumSectionProps> = ({ logger }) => {
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
      <h1 className="w3-xxxlarge w3-text-red">
        <b>{new RessourceSettingsPageStadiumHeader().value().toString()}</b>
      </h1>
      <hr style={{ width: 50, border: "5px solid red" }} className="w3-round" />
      <Section>
        <b>{new RessourceSettingsPageStadiumIntro().value().toString()}</b>
      </Section>

      {/* Stadium Settings Form */}
      {resourcesLoaded && (
        <section style={{ marginBottom: "30px" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div style={{ marginBottom: "15px" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={stadiumOverallPricesActivated}
                    onChange={(e) =>
                      setStadiumOverallPricesActivated(e.target.checked)
                    }
                  />{" "}
                  {new RessourceSettingsPageStadiumAddOverallPrices().value()},
                </label>
                <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={stadiumOffsetPricesActivated}
                      onChange={(e) =>
                        setStadiumOffsetPricesActivated(e.target.checked)
                      }
                      disabled={!stadiumOverallPricesActivated}
                    />{" "}
                    {new RessourceSettingsPageStadiumAddOffsetPrices().value()},
                  </label>
                </div>
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

export default StadiumSection;
