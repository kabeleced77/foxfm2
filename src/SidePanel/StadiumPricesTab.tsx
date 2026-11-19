import React, { useEffect, useState } from "react";
import {
  RessourceSidePanelStadiumApplyHint,
  RessourceSidePanelStadiumBasePrices,
  RessourceSidePanelStadiumBlock,
  RessourceSidePanelStadiumPricesIntro,
  RessourceSidePanelStadiumTransfer,
  RessourceSidePanelStadiumTransferTooltip,
} from "../Common/Ressource";
import { IStadiumPriceLimits, IStadiumPrices } from "../Common/StadiumPrices";
import { IStadiumXPathEntries, IStadiumXPathEntry } from "../Common/StadiumXPaths";
import { ISetting } from "../Common/Toolkit/Setting";
import { PageStatus } from "./PageStatus";
import StadiumApplyResultMessage from "./StadiumApplyResultMessage";
import { StadiumKindLabels } from "./StadiumKindLabels";
import { IStadiumPricesApplyResult, IStadiumPricesOnPage } from "./StadiumPricesOnPage";

const kindLabels = new StadiumKindLabels();

interface IStadiumPricesTabProps {
  page: PageStatus;
  priceLimits: IStadiumPriceLimits;
  xPathEntries: IStadiumXPathEntries;
  pricesSetting: ISetting<IStadiumPrices>;
  pricesOnPage: IStadiumPricesOnPage;
}

function PriceSelect(props: {
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  const options: number[] = [];
  for (let price = props.min; price <= props.max; price++) options.push(price);
  return (
    <select
      id={props.id}
      className="w3-select w3-border w3-small"
      style={{ padding: "2px 0" }}
      value={props.value}
      onChange={(e) => props.onChange(Number(e.target.value))}
    >
      {options.map((price) => (
        <option key={price} value={price}>
          {price}
        </option>
      ))}
    </select>
  );
}

export default function StadiumPricesTab(props: IStadiumPricesTabProps) {
  const { page, priceLimits, xPathEntries, pricesSetting, pricesOnPage } = props;
  const [prices, setPrices] = useState<IStadiumPrices | null>(null);
  const [applyResult, setApplyResult] = useState<IStadiumPricesApplyResult | null>(null);

  useEffect(() => {
    pricesSetting.value().then(setPrices);
  }, [pricesSetting]);

  // every change is saved and applied to the OFM page right away
  const change = async (
    update: (current: IStadiumPrices) => IStadiumPrices,
    affected: IStadiumXPathEntry[],
  ) => {
    if (!prices) return;
    const updated = update(prices);
    setPrices(updated);
    pricesSetting.save(updated);
    if (page.kind !== "stadium") return;
    setApplyResult(null);
    setApplyResult(await pricesOnPage.apply(page.tabId, updated, affected));
  };

  // sets all prices shown here on the OFM page again, e.g. after the user has changed the page by hand
  const transfer = async () => {
    if (!prices || page.kind !== "stadium") return;
    setApplyResult(null);
    setApplyResult(await pricesOnPage.apply(page.tabId, prices, xPathEntries.all()));
  };

  if (!prices) return null;

  const kinds = xPathEntries.kinds();
  const entries = xPathEntries.all();
  const blockLabel = (block: string) => new RessourceSidePanelStadiumBlock().value(block).toString();
  const transferTooltip = new RessourceSidePanelStadiumTransferTooltip().value().toString();

  return (
    <div>
      <p className="w3-small">{new RessourceSidePanelStadiumPricesIntro().value().toString()}</p>
      <table className="w3-table w3-bordered w3-small w3-centered">
        <thead>
          <tr>
            <th />
            {kinds.map((kind) => (
              <th key={kind}>{kindLabels.label(kind)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>{new RessourceSidePanelStadiumBasePrices().value().toString()}</b>
            </td>
            {kinds.map((kind) => (
              <td key={kind}>
                <PriceSelect
                  id={`stadium-base-${kind}`}
                  value={prices.basePrice(kind)}
                  min={priceLimits.min()}
                  max={priceLimits.max()}
                  onChange={(price) =>
                    change(
                      (p) => p.withBasePrice(kind, price),
                      entries.filter((entry) => entry.kind === kind),
                    )
                  }
                />
              </td>
            ))}
          </tr>
          {xPathEntries.blocks().map((block) => (
            <tr key={block}>
              <td>{blockLabel(block)}</td>
              {kinds.map((kind) => (
                <td key={kind}>
                  <PriceSelect
                    id={`stadium-offset-${block}-${kind}`}
                    value={prices.offsetPrice(block, kind)}
                    min={priceLimits.offsetMin()}
                    max={priceLimits.offsetMax()}
                    onChange={(price) =>
                      change(
                        (p) => p.withOffsetPrice(block, kind, price),
                        entries.filter((entry) => entry.kind === kind && entry.block === block),
                      )
                    }
                  />
                  <div className="w3-text-grey">&rarr; {prices.price(block, kind)}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        id="stadium-transfer-prices"
        className="w3-button w3-red w3-small w3-margin-top"
        title={transferTooltip}
        aria-label={transferTooltip}
        disabled={page.kind !== "stadium"}
        onClick={transfer}
      >
        {new RessourceSidePanelStadiumTransfer().value().toString()}
      </button>
      <p className="w3-small w3-text-grey">
        {new RessourceSidePanelStadiumApplyHint().value().toString()}
      </p>
      <StadiumApplyResultMessage result={applyResult} />
    </div>
  );
}
