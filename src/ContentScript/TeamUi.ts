import { IStrengthLevelsSetting } from "../Common/Settings/StrengthLevelsSetting"
import { ITeamTableSetting } from "../Common/Settings/TeamTableSetting"
import { IWebPageToExtend } from "../Common/Toolkit/WebPageToExtend";
import { IUrl } from "../Common/Toolkit/Url";
import { IEasyLogger } from "../Common/Logger/EasyLogger";
import { IDom } from "../Common/Toolkit/Dom";

export class TeamUi implements IWebPageToExtend {
  private domField: IDom;
  private urlField: IUrl;
  private log: IEasyLogger;
  private strengthLevelsSetting: IStrengthLevelsSetting;
  private teamTableSetting: ITeamTableSetting;

  constructor(
    dom: IDom,
    url: IUrl,
    strengthLevelsSetting: IStrengthLevelsSetting,
    teamTableSetting: ITeamTableSetting,
    log: IEasyLogger
  ) {
    this.domField = dom;
    this.urlField = url;
    this.strengthLevelsSetting = strengthLevelsSetting;
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
          this.strengthLevelsSetting
            .strengthLevels()
            .then(strengthLevels => {
              setting.awpAndStrengthColumns().addAdditionalInformation(this.domField.dom(), strengthLevels);
            });
        }
      })
      .catch(e => { throw new Error(`Error while adding additional information to team table: ${e}`); });
  }
}
