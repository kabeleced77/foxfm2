import browser from "webextension-polyfill";
import {
  IStadiumPageApplyPriceResult,
  IStadiumPageApplyPricesContent,
  IStadiumPageApplyPricesResponse,
  IStadiumPagePingResponse,
  IStadiumPageStartPickingContent,
  IStadiumPageStartPickingResponse,
  MessagingMessageTypeStadiumPageApplyPrices,
  MessagingMessageTypeStadiumPageCancelPicking,
  MessagingMessageTypeStadiumPagePing,
  MessagingMessageTypeStadiumPageStartPicking,
} from "../../Common/Messaging/StadiumPageMessages";
import { IMessagingMessage } from "../../Common/Messaging/IMessagingMessage";
import { IEasyLogger } from "../../Common/Logger/EasyLogger";
import { IExtendWebElement } from "../../Common/Toolkit/IExtendWebElement";
import { IUrl } from "../../Common/Toolkit/Url";
import { XPathAllResults } from "../../Common/Toolkit/XPathAllResults";
import { XPathOfElement } from "../../Common/Toolkit/XPathOfElement";
import { XPathSingleResult } from "../../Common/Toolkit/XPathSingleResult";
import { XPathString } from "../../Common/Toolkit/XPathString";
import { IElementPicker } from "../ElementPicker";
import { SelectOptionOfPrice } from "./SelectOptionOfPrice";

/**
 * Connects the OFM stadium page with the foxfm side panel. The page itself is not
 * changed: the side panel sends commands which are executed on the page.
 *  - ping: tells the side panel that this is the stadium page
 *  - apply prices: sets the given prices in the select elements given by XPath
 *  - start/cancel picking: lets the user pick an element and answers its XPath
 *
 * Like every other IExtendWebElement it is only started (extend()) on the web
 * page given by targetUrl(). So only the frame showing the stadium page
 * answers the side panel.
 */
export class StadiumSidePanelBridge implements IExtendWebElement {
  constructor(
    private readonly url: IUrl,
    private readonly picker: IElementPicker,
    private readonly doc: Document,
    private readonly log: IEasyLogger,
  ) { }

  public targetUrl(): IUrl {
    return this.url;
  }

  public extend(): void {
    this.log.info("will listen to the commands of the side panel");
    browser.runtime.onMessage.addListener((message: any) => this.handle(message));
  }

  private handle(message: IMessagingMessage<any> | undefined): Promise<unknown> | undefined {
    switch (message?.type?.name) {
      case new MessagingMessageTypeStadiumPagePing().name:
        return Promise.resolve(<IStadiumPagePingResponse>{ ready: true });
      case new MessagingMessageTypeStadiumPageApplyPrices().name:
        return Promise.resolve(this.applyPrices(message.content));
      case new MessagingMessageTypeStadiumPageStartPicking().name:
        return this.startPicking(message.content);
      case new MessagingMessageTypeStadiumPageCancelPicking().name:
        this.picker.cancel();
        return Promise.resolve({});
      default:
        // not a message for this bridge
        return undefined;
    }
  }

  private applyPrices(content: IStadiumPageApplyPricesContent): IStadiumPageApplyPricesResponse {
    this.log.info(`will apply ${content.prices.length} prices`);
    return {
      results: content.prices.map((entry) => this.applyPrice(entry.name, entry.xPath, entry.price)),
    };
  }

  private applyPrice(name: string, xPath: string, price: number): IStadiumPageApplyPriceResult {
    try {
      const select = new XPathSingleResult<HTMLSelectElement>(
        new XPathAllResults(this.doc, new XPathString(xPath)),
      ).element();
      if (!(select instanceof HTMLSelectElement)) {
        return { name, applied: false, reason: `element is no select element: ${xPath}` };
      }
      const index = new SelectOptionOfPrice(select, price).value();
      if (index < 0) return { name, applied: false, reason: `no option for price ${price}` };
      select.selectedIndex = index;
      return { name, applied: true, selectedText: select.options[index].text.trim() };
    } catch (e) {
      this.log.error(`could not apply price of '${name}': ${e}`);
      return { name, applied: false, reason: `${e}` };
    }
  }

  private async startPicking(
    content: IStadiumPageStartPickingContent,
  ): Promise<IStadiumPageStartPickingResponse> {
    const element = await this.picker.pick();
    if (!element) return { name: content.name, xPath: null, tagName: null };
    const xPath = new XPathOfElement(this.doc, element).value();
    this.log.info(`picked element for '${content.name}': ${xPath}`);
    return { name: content.name, xPath, tagName: element.localName };
  }
}
