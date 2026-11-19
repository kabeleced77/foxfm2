import { IMessagingMessageTypeDataModel } from "./IMessagingMessageTypeDataModel";

/**
 * Messages between the side panel and the content script of the OFM stadium page.
 * They are sent with tabs.sendMessage() and answered by the content script.
 */
export class MessagingMessageTypeStadiumPagePing implements IMessagingMessageTypeDataModel {
  constructor(public name: String = "/stadiumPage/ping") { }
}
export class MessagingMessageTypeStadiumPageApplyPrices implements IMessagingMessageTypeDataModel {
  constructor(public name: String = "/stadiumPage/applyPrices") { }
}
export class MessagingMessageTypeStadiumPageStartPicking implements IMessagingMessageTypeDataModel {
  constructor(public name: String = "/stadiumPage/startPicking") { }
}
export class MessagingMessageTypeStadiumPageCancelPicking implements IMessagingMessageTypeDataModel {
  constructor(public name: String = "/stadiumPage/cancelPicking") { }
}

/** only the content script of the stadium page answers, i.e. any answer means: stadium page */
export interface IStadiumPagePingResponse {
  ready: boolean;
}

export interface IStadiumPageApplyPricesContent {
  prices: { name: string; xPath: string; price: number }[];
}
export interface IStadiumPageApplyPriceResult {
  name: string;
  applied: boolean;
  selectedText?: string;
  reason?: string;
}
export interface IStadiumPageApplyPricesResponse {
  results: IStadiumPageApplyPriceResult[];
}

export interface IStadiumPageStartPickingContent {
  name: string;
}
/** xPath and tagName are null if the picking has been cancelled */
export interface IStadiumPageStartPickingResponse {
  name: string;
  xPath: string | null;
  tagName: string | null;
}
