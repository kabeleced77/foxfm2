import { Logger } from '../Common/Logger/Logger';
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import { RegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { RessourceSettingsPageLoggerHeading } from "../Common/Ressource"
import { RessourceSettingsPageLoggerIntro, RessourceCommonButtonApply } from "../Common/Ressource"
import { Mutex } from "../Common/Toolkit/Mutex";
import { SettingNameLoggingModules } from "../Common/Settings/SettingNameLoggingModules";
import { ISetting } from "../Common/Toolkit/Setting";
import { StorageLocal } from "../Common/Toolkit/StorageLocal";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";
import { SettingNameApplicationLogLevel } from "../Common/Settings/SettingNameApplicationLogLevel";
import { IEasyLogger, EasyLogger } from '../Common/Logger/EasyLogger';
import { IStrengthsLimitsSetting, StrengthsLimitsSetting } from '../Common/Settings/StrengthsLimitsSetting';
import { StrengthLimits } from '../Common/StrengthLimits';

export class SettingsStrengthlevelLimits {
  private log: IEasyLogger;
  private strengthsLimitsSetting: IStrengthsLimitsSetting;

  public ressourceHeading: String;
  public ressourceIntro: String;
  public ressourceButtonApply: String;
  public strengthLevelLimits: String;
  public strengthsLimits: StrengthLimitsViewModel[];

  constructor() {
    this.log = new EasyLogger(new Logger(
      new StorageLocal<ILogLevel>(
        new SettingNameApplicationLogLevel(),
        new LogLevelError()),
      new StorageLocalSync<IRegisteredLoggingModules>(
        new Mutex<IRegisteredLoggingModules>(),
        new StorageLocal<IRegisteredLoggingModules>(
          new SettingNameLoggingModules(),
          new RegisteredLoggingModules(
            new Array<IRegisteredLoggingModule>())))),
      new RegisteredLoggingModule(
        "SettingsStrengthlevelLimits",
        new LogLevelError()));

    this.strengthsLimitsSetting = new StrengthsLimitsSetting();

    this.ressourceHeading = new RessourceSettingsPageLoggerHeading().value();
    this.ressourceIntro = new RessourceSettingsPageLoggerIntro().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();

    this.strengthsLimitsSetting
      .strengthsLimits()
      .then(strengthsLimits => this.strengthsLimits = strengthsLimits
        .strengthsLimits()
        .map(strengthLimits => new StrengthLimitsViewModel(strengthLimits.value(), strengthLimits.awpPoints())));
  }

  public submit() {
    this.log.info(`Submitted called: ${this.strengthLevelLimits}`);

    this.importStrengthLevelLimits(this.strengthLevelLimits);
  }

  private async importStrengthLevelLimits(strengthLevelLimitsString: String) {
    let maxOFMLevel = 27;
    var userinput = strengthLevelLimitsString.replace(/\./gm, '');
    if (userinput) {
      var aStrengthlevel = userinput.match(/\d+\.*\d*/gm);
      this.log.debug('Strengthlevel & points:' + aStrengthlevel);
      if (aStrengthlevel) {
        var strDebug = '';
        for (var i = 0; i < aStrengthlevel.length; i += 2) {
          var strengthlevel = parseInt(aStrengthlevel[i], 10);
          var strengthlevelawps = parseInt(aStrengthlevel[i + 1], 10);
          if (strengthlevel > 0 && strengthlevel <= maxOFMLevel) {
            strDebug += strengthlevel + ' - ' + strengthlevelawps + '; ';
            let currentStrengthLimits = await this.strengthsLimitsSetting.strengthLevel(strengthlevel);
            this.strengthsLimitsSetting.changeStrengthLimits(new StrengthLimits(strengthlevel, currentStrengthLimits.wage(), strengthlevelawps));
          }
        }
        this.log.debug(strDebug);
      }
    } else {
      throw new Error('ofm.strengthlevel.importerror');
    }
  }
}

class StrengthLimitsViewModel {
  public strength: Number;
  public awps: Number;
  constructor(strength: Number, awps: Number) {
    this.strength = strength;
    this.awps = awps;
  }
}
