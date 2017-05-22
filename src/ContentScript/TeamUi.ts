import { Logger, ILogger } from "../Common/Logger/Logger"
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { NumberHelper } from "../Common/Toolkit/NumberHelper"
import { IStrengthLevels } from "../Common/StrengthLevels"
import { IStrengthLevelsSetting } from "../Common/Settings/StrengthLevelsSetting"
import { ITeamTableSetting } from "../Common/Settings/TeamTableSetting"

export class TeamUi {
  private log: ILogger;
  private loggingModule: IRegisteredLoggingModule;
  private strengthLevelsSetting: IStrengthLevelsSetting;
  private teamTableSetting: ITeamTableSetting;

  constructor(
    logger: ILogger,
    strengthLevelsSetting: IStrengthLevelsSetting,
    teamTableSetting: ITeamTableSetting,
  ) {
    this.log = logger;
    this.loggingModule = new RegisteredLoggingModule("TeamUi", new LogLevelError());
    this.log.registerModuleForLogging(this.loggingModule);
    this.strengthLevelsSetting = strengthLevelsSetting;
    this.teamTableSetting = teamTableSetting;
  }

  public addAdditionalInformation(doc: Document) {
    this.teamTableSetting
      .setting()
      .then(setting => {
        var executeOnThisPage = doc.location.href.match(setting.url().url().toString()) !== null;
        this.info("called from: " + doc.location.href + ": " + executeOnThisPage);
        if (setting.awpAndStrengthColumns().additionalInformationActivated && executeOnThisPage) {
          this.strengthLevelsSetting
            .strengthLevels()
            .then(strengthLevels => {
              setting.awpAndStrengthColumns().addAdditionalInformation(doc, strengthLevels);
            });
        }
      })
      .catch(e => { throw new Error(`Error while adding additional information to team table: ${e}`); });
  }

  private info(msg: string): void {
    this.log.info(this.loggingModule.name(), msg);
  }
  private warn(msg: string): void {
    this.log.warn(this.loggingModule.name(), msg);
  }
  private debug(msg: string): void {
    this.log.debug(this.loggingModule.name(), msg);
  }
}
