import React from "react";
import {
  RessourceSidePanelStadiumApplyFailed,
  RessourceSidePanelStadiumApplyResult,
  RessourceSidePanelStadiumBlock,
} from "../Common/Ressource";
import { IStadiumPricesApplyResult } from "./StadiumPricesOnPage";
import { StadiumKindLabels } from "./StadiumKindLabels";

const kindLabels = new StadiumKindLabels();

/** result of setting the prices on the OFM page: how many have been set and which have not */
export default function StadiumApplyResultMessage({ result }: { result: IStadiumPricesApplyResult | null }) {
  if (!result) return null;
  if (result.error) return <p className="w3-small w3-text-red">{result.error}</p>;

  return (
    <div>
      <p className="w3-small w3-text-green">
        {new RessourceSidePanelStadiumApplyResult().value(`${result.applied}/${result.total}`).toString()}
      </p>
      {result.failed.length > 0 && (
        <div className="w3-small w3-text-red">
          {new RessourceSidePanelStadiumApplyFailed().value().toString()}
          <ul>
            {result.failed.map((entry) => (
              <li key={entry.name}>
                {new RessourceSidePanelStadiumBlock().value(entry.block).toString()} /{" "}
                {kindLabels.label(entry.kind)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
