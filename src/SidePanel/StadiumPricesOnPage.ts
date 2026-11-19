import browser from "webextension-polyfill";
import { IOfmFeatureXPaths } from "../Common/IOfmFeatureXPaths";
import { MessagingMessage } from "../Common/Messaging/MessagingMessage";
import {
  IStadiumPageApplyPricesContent,
  IStadiumPageApplyPricesResponse,
  MessagingMessageTypeStadiumPageApplyPrices,
} from "../Common/Messaging/StadiumPageMessages";
import { IStadiumPrices } from "../Common/StadiumPrices";
import { IStadiumXPathEntry } from "../Common/StadiumXPaths";

export interface IStadiumPricesApplyResult {
  total: number;
  applied: number;
  /** entries whose price could not be set on the OFM page */
  failed: IStadiumXPathEntry[];
  /** set if the OFM page could not be reached at all */
  error?: string;
}

/**
 * Sets prices in the select elements of the OFM stadium page.
 */
export interface IStadiumPricesOnPage {
  apply(
    tabId: number,
    prices: IStadiumPrices,
    entries: IStadiumXPathEntry[],
  ): Promise<IStadiumPricesApplyResult>;
}

export class StadiumPricesOnPage implements IStadiumPricesOnPage {
  constructor(private readonly xPaths: IOfmFeatureXPaths) { }

  public async apply(
    tabId: number,
    prices: IStadiumPrices,
    entries: IStadiumXPathEntry[],
  ): Promise<IStadiumPricesApplyResult> {
    try {
      const configured = await this.xPaths.xPaths();
      const response = (await browser.tabs.sendMessage(
        tabId,
        new MessagingMessage<IStadiumPageApplyPricesContent>(
          new MessagingMessageTypeStadiumPageApplyPrices(),
          {
            prices: entries.map((entry) => ({
              name: entry.name,
              xPath: configured[entry.name],
              price: prices.price(entry.block, entry.kind),
            })),
          },
        ),
      )) as IStadiumPageApplyPricesResponse | undefined;

      const results = response?.results ?? [];
      const failed = entries.filter(
        (entry) => !results.some((result) => result.name === entry.name && result.applied),
      );
      return { total: entries.length, applied: entries.length - failed.length, failed };
    } catch (e) {
      return { total: entries.length, applied: 0, failed: entries, error: `${e}` };
    }
  }
}
