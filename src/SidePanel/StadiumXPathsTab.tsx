import React, { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { IOfmFeatureXPaths } from "../Common/IOfmFeatureXPaths";
import { MessagingMessage } from "../Common/Messaging/MessagingMessage";
import {
  IStadiumPageStartPickingContent,
  IStadiumPageStartPickingResponse,
  MessagingMessageTypeStadiumPageCancelPicking,
  MessagingMessageTypeStadiumPageStartPicking,
} from "../Common/Messaging/StadiumPageMessages";
import {
  RessourceSidePanelStadiumBlock,
  RessourceSidePanelStadiumXPathsIntro,
  RessourceSidePanelStadiumXPathsPickNotSelect,
  RessourceSidePanelStadiumXPathsPicking,
  RessourceSidePanelStadiumXPathsResetAll,
} from "../Common/Ressource";
import { IStadiumXPathEntries } from "../Common/StadiumXPaths";
import { PageStatus } from "./PageStatus";
import { StadiumKindLabels } from "./StadiumKindLabels";
import XPathInput from "./XPathInput";

const kindLabels = new StadiumKindLabels();

interface IStadiumXPathsTabProps {
  page: PageStatus;
  xPathEntries: IStadiumXPathEntries;
  xPaths: IOfmFeatureXPaths;
}

export default function StadiumXPathsTab(props: IStadiumXPathsTabProps) {
  const { page, xPathEntries, xPaths } = props;
  const [configured, setConfigured] = useState<{ [name: string]: string }>({});
  const [loaded, setLoaded] = useState(false);
  const [picking, setPicking] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    xPaths.xPaths().then((values) => {
      setConfigured(values);
      setLoaded(true);
    });
  }, [xPaths]);

  const save = async (name: string, xPath: string) => {
    await xPaths.change(name, xPath);
    setConfigured(await xPaths.xPaths());
  };

  const pick = async (name: string) => {
    if (page.kind !== "stadium") return;
    setPicking(name);
    setWarning(null);
    try {
      // answered when the user has clicked an element on the page or the picking has been cancelled
      const response = (await browser.tabs.sendMessage(
        page.tabId,
        new MessagingMessage<IStadiumPageStartPickingContent>(
          new MessagingMessageTypeStadiumPageStartPicking(),
          { name },
        ),
      )) as IStadiumPageStartPickingResponse | undefined;
      if (response?.xPath) {
        // a picked element is saved right away
        await save(name, response.xPath);
        if (response.tagName && response.tagName !== "select") {
          setWarning(
            new RessourceSidePanelStadiumXPathsPickNotSelect().value(response.tagName).toString(),
          );
        }
      }
    } catch (e) {
      setWarning(`${e}`);
    } finally {
      setPicking((current) => (current === name ? null : current));
    }
  };

  const cancelPicking = async () => {
    if (page.kind !== "stadium") return;
    try {
      await browser.tabs.sendMessage(
        page.tabId,
        new MessagingMessage<Object>(new MessagingMessageTypeStadiumPageCancelPicking(), {}),
      );
    } catch {
      // the page is gone, nothing to cancel
    }
  };

  const resetAll = async () => {
    await xPaths.resetAll();
    setConfigured(await xPaths.xPaths());
    setWarning(null);
  };

  if (!loaded) return null;

  return (
    <div>
      <p className="w3-small">{new RessourceSidePanelStadiumXPathsIntro().value().toString()}</p>

      {picking && (
        <div className="w3-panel w3-pale-yellow w3-padding-small w3-small">
          {new RessourceSidePanelStadiumXPathsPicking().value().toString()}
        </div>
      )}
      {warning && <p className="w3-small w3-text-red">{warning}</p>}

      {xPathEntries.blocks().map((block) => (
        <div key={block}>
          <h5 style={{ margin: "8px 0 4px" }}>
            <b>{new RessourceSidePanelStadiumBlock().value(block).toString()}</b>
          </h5>
          {xPathEntries.kinds().map((kind) => {
            const name = xPathEntries.name(block, kind);
            return (
              <XPathInput
                key={name}
                id={`stadium-xpath-${name}`}
                label={kindLabels.label(kind)}
                savedValue={configured[name] ?? ""}
                picking={picking === name}
                canPick={page.kind === "stadium"}
                onPick={() => pick(name)}
                onCancelPick={cancelPicking}
                onConfirm={(xPath) => save(name, xPath)}
              />
            );
          })}
        </div>
      ))}

      <button type="button" className="w3-button w3-border w3-small w3-margin-top" onClick={resetAll}>
        {new RessourceSidePanelStadiumXPathsResetAll().value().toString()}
      </button>
    </div>
  );
}
