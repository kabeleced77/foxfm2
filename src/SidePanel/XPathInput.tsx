import React, { useEffect, useState } from "react";
import {
  RessourceSidePanelXPathCancelPickTooltip,
  RessourceSidePanelXPathConfirmTooltip,
  RessourceSidePanelXPathPickTooltip,
} from "../Common/Ressource";

interface IXPathInputProps {
  id: string;
  label: string;
  /** the XPath as it is saved */
  savedValue: string;
  /** the user is currently picking the element on the OFM page */
  picking: boolean;
  canPick: boolean;
  /** starts picking the element on the OFM page; the picked XPath is saved right away */
  onPick: () => void;
  onCancelPick: () => void;
  /** the user confirmed an XPath typed into the input */
  onConfirm: (xPath: string) => void;
}

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  "aria-hidden": true,
} as const;

function IconButton(props: {
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`w3-button ${props.active ? "w3-red" : ""}`}
      style={{ padding: "2px 4px", lineHeight: 0 }}
      title={props.title}
      aria-label={props.title}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

/**
 * Input of an XPath with two small icons inside of the input:
 *  - crosshair: pick the element on the OFM page (the XPath is saved right away)
 *  - check: only visible after the text has been edited; confirms the new XPath
 */
export default function XPathInput(props: IXPathInputProps) {
  const [draft, setDraft] = useState(props.savedValue);

  useEffect(() => {
    setDraft(props.savedValue);
  }, [props.savedValue]);

  const edited = draft !== props.savedValue;
  const confirm = () => props.onConfirm(draft);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
      <label htmlFor={props.id} className="w3-small" style={{ width: 56, flexShrink: 0 }}>
        {props.label}
      </label>
      <div style={{ position: "relative", flex: 1 }}>
        <input
          id={props.id}
          type="text"
          className="w3-input w3-border w3-small"
          style={{ paddingRight: edited ? 52 : 28 }}
          value={draft}
          title={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && edited) {
              e.preventDefault();
              confirm();
            } else if (e.key === "Escape") {
              setDraft(props.savedValue);
            }
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 2,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
          }}
        >
          {edited && (
            <IconButton
              title={new RessourceSidePanelXPathConfirmTooltip().value().toString()}
              onClick={confirm}
            >
              <svg {...iconProps} strokeWidth={2}>
                <path d="M3 8.5l3.5 3.5L13 4.5" />
              </svg>
            </IconButton>
          )}
          <IconButton
            title={
              props.picking
                ? new RessourceSidePanelXPathCancelPickTooltip().value().toString()
                : new RessourceSidePanelXPathPickTooltip().value().toString()
            }
            active={props.picking}
            disabled={!props.canPick && !props.picking}
            onClick={props.picking ? props.onCancelPick : props.onPick}
          >
            <svg {...iconProps} strokeWidth={1.5}>
              <circle cx="8" cy="8" r="4.5" />
              <path d="M8 0.5v4M8 11.5v4M0.5 8h4M11.5 8h4" />
            </svg>
          </IconButton>
        </div>
      </div>
    </div>
  );
}
