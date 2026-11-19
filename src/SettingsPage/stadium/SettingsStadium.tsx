import React from "react";
import { ILogger } from "../../Common/Logger/Logger";
import {
  RessourceSettingsPageStadiumHeader,
  RessourceSettingsPageStadiumIntro,
} from "../../Common/Ressource";
import Section from "../Components/Section";

interface StadiumSectionProps {
  logger: ILogger;
}

/**
 * The stadium prices are configured in the foxfm side panel. This section only explains how to open it.
 */
const SettingsStadium: React.FC<StadiumSectionProps> = () => (
  <div>
    <h1 className="w3-xxxlarge w3-text-red">
      <b>{new RessourceSettingsPageStadiumHeader().value().toString()}</b>
    </h1>
    <hr style={{ width: 50, border: "5px solid red" }} className="w3-round" />
    <Section>
      <p>{new RessourceSettingsPageStadiumIntro().value().toString()}</p>
    </Section>
  </div>
);

export default SettingsStadium;
