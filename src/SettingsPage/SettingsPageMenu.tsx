import React, { useState, useEffect, ReactNode } from "react";
import { RessourceCommonAppName, RessourceSettingsPageApplicationHome } from "../Common/Ressource";

export interface MenuSection {
  id: string;
  label: string;
  content: ReactNode;
}

interface SettingsPageMenuProps {
  menuSections: MenuSection[];
  headerContent?: ReactNode;
  footerContent?: ReactNode;
}

const SettingsPageMenu: React.FC<SettingsPageMenuProps> = ({
  menuSections,
  headerContent,
  footerContent,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const applicationName = new RessourceCommonAppName().value().toString();
  const homeLabel = new RessourceSettingsPageApplicationHome().value().toString();

  useEffect(() => {
    document.title = `${applicationName} - Settings`;
  }, [applicationName]);

  const w3_open = () => setSidebarOpen(true);
  const w3_close = () => setSidebarOpen(false);

  return (
    <>
      {/* Sidebar/menu */}
      <nav
        className={`w3-sidebar w3-red w3-collapse w3-top w3-large w3-padding ${sidebarOpen ? "w3-show" : ""}`}
        style={{ zIndex: 3, width: 300, fontWeight: "bold" }}
        id="mySidebar"
      >
        <br />
        <a
          href="javascript:void(0)"
          onClick={w3_close}
          className="w3-button w3-hide-large w3-display-topright"
          style={{ width: "100%", fontSize: 22 }}
        >
          ×
        </a>
        <div className="w3-container">
          <h3 className="w3-padding-64">
            <b>{applicationName}</b>
          </h3>
        </div>
        <div className="w3-bar-block">
          <a
            href="#"
            onClick={w3_close}
            className="w3-bar-item w3-button w3-hover-white"
          >
            {homeLabel}
          </a>
          {menuSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={w3_close}
              className="w3-bar-item w3-button w3-hover-white"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Top menu on small screens */}
      <header className="w3-container w3-top w3-hide-large w3-red w3-xlarge w3-padding">
        <a
          href="javascript:void(0)"
          className="w3-button w3-red w3-margin-right"
          onClick={w3_open}
        >
          ☰
        </a>
        <span>{applicationName}</span>
      </header>

      {/* Overlay effect when opening sidebar on small screens */}
      <div
        className={`w3-overlay w3-hide-large ${sidebarOpen ? "w3-show" : ""}`}
        onClick={w3_close}
        style={{ cursor: "pointer" }}
        title="close side menu"
        id="myOverlay"
      ></div>

      {/* !PAGE CONTENT! */}
      <div className="w3-main" style={{ marginLeft: 340, marginRight: 40 }}>
        {/* Header Content */}
        {headerContent && <div style={{ marginTop: 80 }}>{headerContent}</div>}

        {/* Menu Sections Content */}
        {menuSections.map((section) => (
          <div
            className="w3-container"
            key={section.id}
            id={section.id}
            style={{ marginTop: 75 }}
          >
            {section.content}
          </div>
        ))}

        {/* End page content */}
      </div>

      {/* Footer */}
      <div
        className="w3-light-grey w3-container w3-padding-32"
        style={{ marginTop: 75, paddingRight: 58 }}
      >
        {footerContent ? (
          footerContent
        ) : (
          <p className="w3-right">
            Powered by{" "}
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
        )}
      </div>
    </>
  );
};

export default SettingsPageMenu;
