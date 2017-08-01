import { IStrengthsLimitsSetting } from "../Common/Settings/StrengthsLimitsSetting"
import { ITeamTableSetting } from "../Common/Settings/TeamTableSetting"
import { IWebPageToExtend } from "../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../Common/Toolkit/Url";
import { IEasyLogger } from "../Common/Logger/EasyLogger";
import { IDom } from "../Common/Toolkit/Dom";

export class TeamWebPage implements IWebPageToExtend {
  private domField: IDom;
  private urlField: IUrl;
  private log: IEasyLogger;
  private strengthsLimitsSetting: IStrengthsLimitsSetting;
  private teamTableSetting: ITeamTableSetting;

  constructor(
    dom: IDom,
    url: IUrl,
    strengthsLimitsSetting: IStrengthsLimitsSetting,
    teamTableSetting: ITeamTableSetting,
    log: IEasyLogger
  ) {
    this.domField = dom;
    this.urlField = url;
    this.strengthsLimitsSetting = strengthsLimitsSetting;
    this.teamTableSetting = teamTableSetting;
    this.log = log;
  }

  public pageUrl(): IUrl {
    return this.urlField;
  }
  public extend(): void {
    this.teamTableSetting
      .setting()
      .then(setting => {
        if (setting.awpAndStrengthColumns().additionalInformationActivated) {
          this.strengthsLimitsSetting
            .strengthsLimits()
            .then(strengthsLimits => {
              setting.awpAndStrengthColumns().addAdditionalInformation(this.domField.dom(), strengthsLimits);
            });
        }
      })
      .catch(e => { throw new Error(`Error while adding additional information to team table: ${e}`); });
  }
}
