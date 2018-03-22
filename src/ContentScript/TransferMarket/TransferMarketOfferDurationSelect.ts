import { IEasyLogger } from '../../Common/Logger/EasyLogger';
import { ITransferMarketSellingDurationSettings } from '../../Common/Settings/TransferMarketSellingDurationSettings';
import { IExtendWebElement } from '../../Common/Toolkit/ExtendWebElement';
import { IHtmlSelect } from '../../Common/Toolkit/HtmlSelect';
import { ISetting } from '../../Common/Toolkit/Setting';
import { IUrl } from '../../Common/Toolkit/Url';

export class TransferMarketOfferDurationSelect implements IExtendWebElement {
  private readonly url: IUrl;
  private readonly select: IHtmlSelect;
  private readonly tmSellingDurationSettings: ISetting<ITransferMarketSellingDurationSettings>;
  private readonly log: IEasyLogger;

  constructor(
    targetUrl: IUrl,
    select: IHtmlSelect,
    transferMarketSellingDurationSettings: ISetting<ITransferMarketSellingDurationSettings>,
    log: IEasyLogger
  ) {
    this.url = targetUrl;
    this.select = select;
    this.tmSellingDurationSettings = transferMarketSellingDurationSettings;
    this.log = log;
  }

  public targetUrl(): IUrl {
    return this.url;
  }
  public extend(): void {
    this.log.info("start extension");
    this.tmSellingDurationSettings
      .value()
      .then(setting => {
        let changeDefaultSellingDuration = setting.activated();

        if (changeDefaultSellingDuration) {
          let currentSellingDurationIndex = this.select.select().selectedIndex;
          let configuredSellingDurationIndex = setting.defaultSellingDuration();
          this.log.info(`adjustment of selling duration selection activated: will change selection index from currently '${currentSellingDurationIndex}' to '${configuredSellingDurationIndex}'`)
          this.select.select().selectedIndex = configuredSellingDurationIndex.valueOf();
        }
      })
      .catch(e => { throw new Error(`"Error while settings the transfer market duration: ${e}. ${e.stack}"`); });
  }
}
