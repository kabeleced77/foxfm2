import { IStrengthsLimitsSetting } from "../Common/Settings/StrengthsLimitsSetting"
import { ISetting } from "../Common/Toolkit/Setting";
import { ITransferMarketSearchResultTable } from "../Common/TransferMarketSearchResultTable";
import { IEasyLogger } from "../Common/Logger/EasyLogger";
import { IUrl } from "../Common/Toolkit/Url";
import { IWebPageToExtend } from "../Common/Toolkit/WebPageToExtend";
import { IDom } from "../Common/Toolkit/Dom";

export class TransferMarketSearchResultTableUi implements IWebPageToExtend {
  private domField: IDom;
  private webPageUrl: IUrl;
  private log: IEasyLogger;
  private strengthsLimitsSetting: IStrengthsLimitsSetting;
  private settings: ISetting<ITransferMarketSearchResultTable>;

  constructor(
    dom: IDom,
    webPageUrl: IUrl,
    strengthsLimitsSetting: IStrengthsLimitsSetting,
    transferMarketSearchResultTableSetting: ISetting<ITransferMarketSearchResultTable>,
    logger: IEasyLogger
  ) {
    this.domField = dom;
    this.webPageUrl = webPageUrl;
    this.strengthsLimitsSetting = strengthsLimitsSetting;
    this.settings = transferMarketSearchResultTableSetting;
    this.log = logger;
  }
  public pageUrl(): IUrl {
    return this.webPageUrl;
  }
  public extend(): void {
    this.settings.value()
      .then(setting => {
        if (setting.experienceAndTrainingColumn().additionalInformationActivated()) {
          this.strengthsLimitsSetting
            .strengthsLimits()
            .then(strengthsLimits => {
              setting.experienceAndTrainingColumn().addAdditionalInformation(this.domField.dom(), strengthsLimits);
            })
        }
      });
  }
}
