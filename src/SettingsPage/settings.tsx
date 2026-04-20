import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Logging from "./logging/Logging";
import { Logger } from "../Common/Logger/Logger";
import { ILogLevel, LogLevelError } from "../Common/Logger/LogLevel";
import {
  IRegisteredLoggingModule,
} from "../Common/Logger/RegisteredLoggingModule";
import {
  IRegisteredLoggingModules,
  RegisteredLoggingModules,
} from "../Common/Logger/RegisteredLoggingModules";
import { SettingNameApplicationLogLevel } from "../Common/Settings/SettingNameApplicationLogLevel";
import { SettingNameLoggingModules } from "../Common/Settings/SettingNameLoggingModules";
import { Mutex } from "../Common/Toolkit/Mutex";
import { StorageLocal } from "../Common/Toolkit/StorageLocal";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";
import './w3.css';
import './w3-colors-flat.css';

const logger = new Logger(
  new StorageLocal<ILogLevel>(
    new SettingNameApplicationLogLevel(),
    new LogLevelError(),
  ),
  new StorageLocalSync<IRegisteredLoggingModules>(
    new Mutex(),
    new StorageLocal<IRegisteredLoggingModules>(
      new SettingNameLoggingModules(),
      new RegisteredLoggingModules(new Array<IRegisteredLoggingModule>()),
    ),
  ),
);

const SettingsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [modalCaption, setModalCaption] = useState<string>("");

  useEffect(() => {
    document.title = "foxfm - Settings";
  }, []);

  const w3_open = () => setSidebarOpen(true);
  const w3_close = () => setSidebarOpen(false);

  const onClick = (element: HTMLImageElement) => {
    setModalImage(element.src);
    setModalCaption(element.alt);
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins" />
      <style>
        {`
          body, h1, h2, h3, h4, h5 {
            font-family: "Poppins", sans-serif;
          }
          body {
            font-size: 16px;
          }
          .w3-half img {
            margin-bottom: -6px;
            margin-top: 16px;
            opacity: 0.8;
            cursor: pointer;
          }
          .w3-half img:hover {
            opacity: 1;
          }
        `}
      </style>
      {/* Sidebar/menu */}
      <nav
        className={`w3-sidebar w3-red w3-collapse w3-top w3-large w3-padding ${sidebarOpen ? 'w3-show' : ''}`}
        style={{ zIndex: 3, width: 300, fontWeight: 'bold' }}
        id="mySidebar"
      >
        <br />
        <a
          href="javascript:void(0)"
          onClick={w3_close}
          className="w3-button w3-hide-large w3-display-topleft"
          style={{ width: '100%', fontSize: 22 }}
        >
          Close Menu
        </a>
        <div className="w3-container">
          <h3 className="w3-padding-64">
            <b>Foxfm</b>
          </h3>
        </div>
        <div className="w3-bar-block">
          <a
            href="#"
            onClick={w3_close}
            className="w3-bar-item w3-button w3-hover-white"
          >
            Home
          </a>
          <a
            href="#showcase"
            onClick={w3_close}
            className="w3-bar-item w3-button w3-hover-white"
          >
            Showcase
          </a>
          <a
            href="#services"
            onClick={w3_close}
            className="w3-bar-item w3-button w3-hover-white"
          >
            Services
          </a>
          <a
            href="#designers"
            onClick={w3_close}
            className="w3-bar-item w3-button w3-hover-white"
          >
            Designers
          </a>
          <a
            href="#packages"
            onClick={w3_close}
            className="w3-bar-item w3-button w3-hover-white"
          >
            Packages
          </a>
          <a
            href="#contact"
            onClick={w3_close}
            className="w3-bar-item w3-button w3-hover-white"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Top menu on small screens */}
      <header
        className="w3-container w3-top w3-hide-large w3-red w3-xlarge w3-padding"
      >
        <a
          href="javascript:void(0)"
          className="w3-button w3-red w3-margin-right"
          onClick={w3_open}
        >
          ☰
        </a>
        <span>Company Name</span>
      </header>

      {/* Overlay effect when opening sidebar on small screens */}
      <div
        className={`w3-overlay w3-hide-large ${sidebarOpen ? 'w3-show' : ''}`}
        onClick={w3_close}
        style={{ cursor: 'pointer' }}
        title="close side menu"
        id="myOverlay"
      ></div>

      {/* !PAGE CONTENT! */}
      <div className="w3-main" style={{ marginLeft: 340, marginRight: 40 }}>
        {/* Header */}
        <div className="w3-container" style={{ marginTop: 80 }} id="showcase">
          <h1 className="w3-jumbo">
            <b>Foxfm Settings</b>
          </h1>
          <h1 className="w3-xxxlarge w3-text-red">
            <b>Stadium.</b>
          </h1>
          <hr style={{ width: 50, border: '5px solid red' }} className="w3-round" />
        </div>

        {/* Photo grid (modal) */}
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

        {/* Packages / Pricing Tables */}
        <div className="w3-container" id="packages" style={{ marginTop: 75 }}>
          <h1 className="w3-xxxlarge w3-text-red">
            <b>Logging Settings.</b>
          </h1>
          <hr style={{ width: 50, border: '5px solid red' }} className="w3-round" />
          <p>
            The logging settings allow you to configure the logging behavior of
            the application. You can choose which logging modules are active and
            set the logging level for each module.
          </p>
        </div>

        <div id="root" className="w3-row-padding">
          <Logging logger={logger} />
        </div>

        {/* End page content */}
      </div>

      {/* W3.CSS Container */}
      <div
        className="w3-light-grey w3-container w3-padding-32"
        style={{ marginTop: 75, paddingRight: 58 }}
      >
        <p className="w3-right">
          Powered by{' '}
          <a
            href="https://www.w3schools.com/w3css/default.asp"
            title="W3.CSS"
            target="_blank"
            rel="noopener noreferrer"
            className="w3-hover-opacity"
          >
            w3.css
          </a>
        </p>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <SettingsPage />
  </React.StrictMode>,
);
