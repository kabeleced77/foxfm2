import React, { useState } from "react";

const StadiumSection: React.FC = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalCaption, setModalCaption] = useState<string>("");

  const onClick = (element: HTMLImageElement) => {
    setModalImage(element.src);
    setModalCaption(element.alt);
  };

  return (
    <>
      <h1 className="w3-xxxlarge w3-text-red">
        <b>Stadium.</b>
      </h1>
      <hr style={{ width: 50, border: '5px solid red' }} className="w3-round" />
      <div className="w3-row-padding">
        <div className="w3-half">
          <img
            src="/screenshots/foxfm2-stadium-overall-price-1280-800.png"
            style={{ width: '100%' }}
            onClick={(e) => onClick(e.currentTarget)}
            alt="Stadium overall price"
          />
        </div>

        <div className="w3-half">
          <img
            src="/screenshots/foxfm2-stadium-overall-price-offset-prices-1280-800.png"
            style={{ width: '100%' }}
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
