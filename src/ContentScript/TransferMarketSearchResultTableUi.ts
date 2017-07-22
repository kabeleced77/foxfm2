import { IStrengthLevelsLimitsSetting } from "../Common/Settings/StrengthLevelsSetting"
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
  private strengthLevelsSetting: IStrengthLevelsLimitsSetting;
  private settings: ISetting<ITransferMarketSearchResultTable>;

  constructor(
    dom: IDom,
    webPageUrl: IUrl,
    strengthLevelsSetting: IStrengthLevelsLimitsSetting,
    transferMarketSearchResultTableSetting: ISetting<ITransferMarketSearchResultTable>,
    logger: IEasyLogger
  ) {
    this.domField = dom;
    this.webPageUrl = webPageUrl;
    this.strengthLevelsSetting = strengthLevelsSetting;
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
          this.strengthLevelsSetting
            .strengthLevelsLimits()
            .then(strengthLevelsLimits => {
              setting.experienceAndTrainingColumn().addAdditionalInformation(this.domField.dom(), strengthLevelsLimits);
            })
        }
      });
  }
}
