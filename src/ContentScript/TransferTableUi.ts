//import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
//import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
//import { LogLevelError } from '../Common/Logger/LogLevel';
import { IStrengthLevelsSetting } from "../Common/Settings/StrengthLevelsSetting"
import { ISetting } from "../Common/Toolkit/Setting";
import { ITransferTablePossibleOffers } from "../Common/TransferTablePossibleOffers";
//import { ILogger } from "../Common/Logger/Logger";
import { IWebPageToExtend } from "../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../Common/Toolkit/Url";
import { IDom } from "../Common/Toolkit/Dom";
import { IEasyLogger } from "../Common/Logger/EasyLogger";

export class TransferTableUi implements IWebPageToExtend {
  private domField: IDom;
  private urlField: IUrl;
  private log: IEasyLogger;
//  private loggingModule: IRegisteredLoggingModule;
  private strengthLevelsSetting: IStrengthLevelsSetting;
  private transferTablePossibleOffers2: ISetting<ITransferTablePossibleOffers>;

  constructor(
    dom: IDom,
    webPageUrl: IUrl,
    strengthLevelsSetting: IStrengthLevelsSetting,
    transferTablePossibleOffersSetting2: ISetting<ITransferTablePossibleOffers>,
    logger: IEasyLogger
  ) {
    this.domField = dom;
    this.urlField = webPageUrl;
    //    this.loggingModule = new RegisteredLoggingModule("TransferTableUi", new LogLevelError());
    //    this.log.registerModuleForLogging(this.loggingModule);
    this.strengthLevelsSetting = strengthLevelsSetting;
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
        //        var executeOnThisPage = doc.location.href.match("transfer/angebote.php") !== null;
        //       this.log.info("called from: " + doc.location.href + ": " + executeOnThisPage);
        if (
          //        executeOnThisPage && 
          setting.awpAndStrengthColumn().additionalInformationActivated()
        ) {
          this.strengthLevelsSetting
            .strengthLevels()
            .then(strengthLevels => {
              setting.awpAndStrengthColumn().addAdditionalInformation(doc, strengthLevels);
            })
        }
      });
  }
}
