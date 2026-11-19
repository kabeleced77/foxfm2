import { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { MessagingMessage } from "../Common/Messaging/MessagingMessage";
import {
  IStadiumPagePingResponse,
  MessagingMessageTypeStadiumPagePing,
} from "../Common/Messaging/StadiumPageMessages";

/**
 * - unknown: not checked yet
 * - unavailable: the active tab does not show the OFM stadium page
 * - stadium: the active tab shows the OFM stadium page
 */
export type PageStatus =
  | { kind: "unknown" }
  | { kind: "unavailable" }
  | { kind: "stadium"; tabId: number };

async function queryPageStatus(): Promise<PageStatus> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const tabId = tabs[0]?.id;
  if (tabId === undefined) return { kind: "unavailable" };
  try {
    // only the content script of the stadium page answers
    const response = (await browser.tabs.sendMessage(
      tabId,
      new MessagingMessage<Object>(new MessagingMessageTypeStadiumPagePing(), {}),
    )) as IStadiumPagePingResponse | undefined;
    return response?.ready ? { kind: "stadium", tabId } : { kind: "unavailable" };
  } catch {
    // no receiver: the stadium page is not shown in this tab
    return { kind: "unavailable" };
  }
}

/** status of the active tab of the window the side panel belongs to */
export function usePageStatus(): PageStatus {
  const [status, setStatus] = useState<PageStatus>({ kind: "unknown" });

  useEffect(() => {
    let disposed = false;
    let retry: number | undefined;

    const refresh = async (allowRetry: boolean) => {
      const current = await queryPageStatus();
      if (disposed) return;
      setStatus(current);
      // the content script might not be ready yet right after the page has been loaded
      if (current.kind === "unavailable" && allowRetry) {
        retry = window.setTimeout(() => refresh(false), 800);
      }
    };
    const onTabChanged = () => {
      window.clearTimeout(retry);
      refresh(true);
    };
    const onTabUpdated = (
      _tabId: number,
      changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
    ) => {
      if (changeInfo.status === "complete") onTabChanged();
    };

    browser.tabs.onActivated.addListener(onTabChanged);
    browser.tabs.onUpdated.addListener(onTabUpdated);
    onTabChanged();

    return () => {
      disposed = true;
      window.clearTimeout(retry);
      browser.tabs.onActivated.removeListener(onTabChanged);
      browser.tabs.onUpdated.removeListener(onTabUpdated);
    };
  }, []);

  return status;
}
