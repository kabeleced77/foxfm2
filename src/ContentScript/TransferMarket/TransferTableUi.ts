import { IStrengthsLimitsSetting } from "../../Common/Settings/StrengthsLimitsSetting"
import { ISetting } from "../../Common/Toolkit/Setting";
import { ITransferTablePossibleOffers } from "../../Common/TransferTablePossibleOffers";
import { IWebPageToExtend } from "../../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../../Common/Toolkit/Url";
import { IDom } from "../../Common/Toolkit/Dom";
import { IEasyLogger } from "../../Common/Logger/EasyLogger";

export class TransferTableUi implements IWebPageToExtend {
  private domField: IDom;
  private urlField: IUrl;
  private log: IEasyLogger;
  private strengthsLimitsSetting: IStrengthsLimitsSetting;
  private transferTablePossibleOffers2: ISetting<ITransferTablePossibleOffers>;

  constructor(
    dom: IDom,
    webPageUrl: IUrl,
    strengthsLimitsSetting: IStrengthsLimitsSetting,
    transferTablePossibleOffersSetting2: ISetting<ITransferTablePossibleOffers>,
    logger: IEasyLogger
  ) {
    this.domField = dom;
    this.urlField = webPageUrl;
    this.strengthsLimitsSetting = strengthsLimitsSetting;
    this.transferTablePossibleOffers2 = transferTablePossibleOffersSetting2;
    this.log = logger;
  }
  public pageUrl(): IUrl {
    return this.urlField;
  }
  public extend(): void {
    this.addAdditionalInformation(this.domField.dom());
  }
  public addAdditionalInformation(doc: Document) {
    this.transferTablePossibleOffers2.value()
      .then(setting => {
        if (setting.awpAndStrengthColumn().additionalInformationActivated()) {
          this.strengthsLimitsSetting
            .strengthsLimits()
            .then(strengthsLimits => {
              setting.awpAndStrengthColumn().addAdditionalInformation(doc, strengthsLimits);
            })
        }
      });
  }
}
