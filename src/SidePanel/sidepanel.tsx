import React from "react";
import ReactDOM from "react-dom/client";
import "../SettingsPage/w3.css";
import "./sidepanel.css";
import { db } from "../Common/IndexedDb/FoxfmIndexedDb";
import { OfmFeaturesIDb } from "../Common/IndexedDb/OfmFeaturesIDb";
import { OfmFeatureXPathsIDb } from "../Common/IndexedDb/OfmFeatureXPathsIDb";
import { SettingNameStadiumPrices } from "../Common/Settings/SettingNameStadiumPrices";
import { IStadiumPrices, StadiumPriceLimits, StadiumPrices } from "../Common/StadiumPrices";
import { OfmStadiumXPathEntries, stadiumFeatureName } from "../Common/StadiumXPaths";
import { StorageLocal } from "../Common/Toolkit/StorageLocal";
import StadiumSidePanel from "./StadiumSidePanel";
import { StadiumPricesOnPage } from "./StadiumPricesOnPage";

// composition root of the side panel
const priceLimits = new StadiumPriceLimits();
const stadiumXPathEntries = new OfmStadiumXPathEntries();
const stadiumXPaths = new OfmFeatureXPathsIDb(
  db,
  new OfmFeaturesIDb(db),
  stadiumFeatureName,
  stadiumXPathEntries.defaults(),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StadiumSidePanel
      priceLimits={priceLimits}
      xPathEntries={stadiumXPathEntries}
      xPaths={stadiumXPaths}
      pricesSetting={
        new StorageLocal<IStadiumPrices>(
          new SettingNameStadiumPrices(),
          new StadiumPrices({}, {}, priceLimits),
        )
      }
      pricesOnPage={new StadiumPricesOnPage(stadiumXPaths)}
    />
  </React.StrictMode>,
);
