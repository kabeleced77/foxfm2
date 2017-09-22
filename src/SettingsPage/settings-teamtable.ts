import { ILogger, Logger } from '../Common/Logger/Logger';
import { RegisteredLoggingModule, IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from "../Common/Logger/RegisteredLoggingModules";
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { RessourceTeamTableSettingsHeader, RessourceCommonButtonApply, RessourceCommonSettingsExtendColumnStrength, RessourceCommonSettingsAddColumnAwpDiff, RessourceCommonSettingsAddColumnNextStrength } from "../Common/Ressource"
import { Mutex } from "../Common/Toolkit/Mutex";
import { SettingNameLoggingModules } from "../Common/Settings/SettingNameLoggingModules";
import { StorageLocal } from "../Common/Toolkit/StorageLocal";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";
import { SettingNameApplicationLogLevel } from "../Common/Settings/SettingNameApplicationLogLevel";
import { TeamTableSetting, ITeamTableSetting } from '../Common/Settings/TeamTableSetting';
import { SettingNameTeamTable } from '../Common/Settings/SettingNameTeamTable';
import { ISetting } from '../Common/Toolkit/Setting';
import { IEasyLogger, EasyLogger } from '../Common/Logger/EasyLogger';

export class SettingsTeam {
  private log: IEasyLogger;
  private teamTableSettings: ISetting<ITeamTableSetting>;

  public ressourceHeading: String;
  public ressourceExtendColumngStrength: String;
  public ressourceAddColumnAwpDiff: String;
  public ressourceAddColumnNextStrength: String;
  public ressourceButtonApply: String;

  public addColumngAwpDiffActivated: Boolean;
  public extendColumngStrengthActivated: Boolean;
  public addColumnNextStrengthActivated: Boolean;

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
        "SettingsTeamTable",
        new LogLevelError()));

    this.teamTableSettings = new StorageLocal<ITeamTableSetting>(
      new SettingNameTeamTable(),
      new TeamTableSetting(true, true, true));

    this.ressourceHeading = new RessourceTeamTableSettingsHeader().value();
    this.ressourceExtendColumngStrength = new RessourceCommonSettingsExtendColumnStrength().value();
    this.ressourceAddColumnAwpDiff = new RessourceCommonSettingsAddColumnAwpDiff().value();
    this.ressourceAddColumnNextStrength = new RessourceCommonSettingsAddColumnNextStrength().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();

    this.teamTableSettings.value().then(settings => {
      this.extendColumngStrengthActivated = settings.extendStrengthColumnActivated();
      this.addColumngAwpDiffActivated = settings.addAwpDiffColumnActivated();
      this.addColumnNextStrengthActivated = settings.addNextStrengthColumnActivated();
    })
  }

  submit() {
    this.log.debug(`extend col strength: ${this.extendColumngStrengthActivated}, add col AWP Diff: ${this.addColumngAwpDiffActivated}, add col next strength: ${this.addColumnNextStrengthActivated}`);

    this.teamTableSettings
      .save(new TeamTableSetting(
        this.extendColumngStrengthActivated,
        this.addColumngAwpDiffActivated,
        this.addColumnNextStrengthActivated));
  }
}
