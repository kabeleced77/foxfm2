import { IWebElementToExtend } from "../../Common/Toolkit/WebElementToExtend";
import { ISetting } from "../../Common/Toolkit/Setting";
import { IEasyLogger } from "../../Common/Logger/EasyLogger";
import { ITransferMarketSellingDurationSettings } from "../../Common/Settings/TransferMarketSellingDurationSettings";
import { IHtmlSelect } from "../../Common/Toolkit/HtmlSelect";

export class TransferMarketOfferDurationSelect implements IWebElementToExtend {
  private readonly select: IHtmlSelect;
  private readonly tmSellingDurationSettings: ISetting<ITransferMarketSellingDurationSettings>;
  private readonly log: IEasyLogger;

  constructor(
    select: IHtmlSelect,
    transferMarketSellingDurationSettings: ISetting<ITransferMarketSellingDurationSettings>,
    log: IEasyLogger
  ) {
    this.select = select;
    this.tmSellingDurationSettings = transferMarketSellingDurationSettings;
    this.log = log;
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
