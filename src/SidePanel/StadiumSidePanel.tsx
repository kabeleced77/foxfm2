import React, { useState } from "react";
import { IOfmFeatureXPaths } from "../Common/IOfmFeatureXPaths";
import {
  RessourceSidePanelStadiumHintNotStadiumPage,
  RessourceSidePanelStadiumTabPrices,
  RessourceSidePanelStadiumTabXPaths,
  RessourceSidePanelStadiumTitle,
} from "../Common/Ressource";
import { IStadiumPriceLimits, IStadiumPrices } from "../Common/StadiumPrices";
import { IStadiumXPathEntries } from "../Common/StadiumXPaths";
import { ISetting } from "../Common/Toolkit/Setting";
import { usePageStatus } from "./PageStatus";
import { IStadiumPricesOnPage } from "./StadiumPricesOnPage";
import StadiumPricesTab from "./StadiumPricesTab";
import StadiumXPathsTab from "./StadiumXPathsTab";

type Tab = "prices" | "xpaths";

interface IStadiumSidePanelProps {
  priceLimits: IStadiumPriceLimits;
  xPathEntries: IStadiumXPathEntries;
  xPaths: IOfmFeatureXPaths;
  pricesSetting: ISetting<IStadiumPrices>;
  pricesOnPage: IStadiumPricesOnPage;
}

export default function StadiumSidePanel(props: IStadiumSidePanelProps) {
  const [tab, setTab] = useState<Tab>("prices");
  const page = usePageStatus();

  const tabClass = (name: Tab) => `w3-bar-item w3-button ${tab === name ? "w3-red" : ""}`;

  return (
    <div className="w3-container">
      <h3 className="w3-text-red">
        <b>{new RessourceSidePanelStadiumTitle().value().toString()}</b>
      </h3>
      {page.kind === "unavailable" && (
        <div className="w3-panel w3-pale-yellow w3-padding-small">
          {new RessourceSidePanelStadiumHintNotStadiumPage().value().toString()}
        </div>
      )}

      <div className="w3-bar w3-border-bottom">
        <button type="button" className={tabClass("prices")} onClick={() => setTab("prices")}>
          {new RessourceSidePanelStadiumTabPrices().value().toString()}
        </button>
        <button type="button" className={tabClass("xpaths")} onClick={() => setTab("xpaths")}>
          {new RessourceSidePanelStadiumTabXPaths().value().toString()}
        </button>
      </div>

      {/* both tabs stay mounted, so unsaved entries are not lost when switching */}
      <div style={{ display: tab === "prices" ? "block" : "none" }}>
        <StadiumPricesTab
          page={page}
          priceLimits={props.priceLimits}
          xPathEntries={props.xPathEntries}
          pricesSetting={props.pricesSetting}
          pricesOnPage={props.pricesOnPage}
        />
      </div>
      <div style={{ display: tab === "xpaths" ? "block" : "none" }}>
        <StadiumXPathsTab page={page} xPathEntries={props.xPathEntries} xPaths={props.xPaths} />
      </div>
    </div>
  );
}
