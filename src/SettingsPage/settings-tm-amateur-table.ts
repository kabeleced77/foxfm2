import { ILogger, Logger } from '../Common/Logger/Logger';
import { RegisteredLoggingModule, IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from "../Common/Logger/RegisteredLoggingModules";
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { Mutex } from "../Common/Toolkit/Mutex";
import { SettingNameLoggingModules } from "../Common/Settings/SettingNameLoggingModules";
import { StorageLocal } from "../Common/Toolkit/StorageLocal";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";
import { SettingNameApplicationLogLevel } from "../Common/Settings/SettingNameApplicationLogLevel";
import { TeamTableSetting, ITeamTableSetting } from '../Common/Settings/TeamTableSetting';
import { SettingNameTeamTable } from '../Common/Settings/SettingNameTeamTable';
import { ISetting } from '../Common/Toolkit/Setting';
import { IEasyLogger, EasyLogger } from '../Common/Logger/EasyLogger';
import { RessourceCommonButtonApply, RessourceCommonSettingsExtendColumnStrength, RessourceCommonSettingsAddColumnAwpDiff, RessourceCommonSettingsAddColumnNextStrength, RessourceCommonSettingsAddColumnAwp, RessourceTransferMarketAmateurTableSettingsHeader } from '../Common/Ressource';
import { ITransferMarketSearchResultTableSettings, TransferMarketSearchResultTableSettings } from '../Common/Settings/TransferMarketSearchResultTableSettings';
import { ITransferMarketAmateurPlayerTableExtensionSetting, TransferMarketAmateurPlayerTableExtensionSetting } from "../Common/Settings/TransferMarketAmateurPlayerTableExtensionSetting";
import { SettingNameTransferMarketAmateurTable } from "../Common/Settings/SettingNameTransferMarketAmateurTable";

export class SettingsTransferMarketAmateurTable {
  private log: IEasyLogger;
  private settings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>;

  public ressourceHeading: String;
  public ressourceAddColumnAwp: String;
  public ressourceAddColumnAwpDiff: String;
  public ressourceAddColumnNextStrength: String;
  public ressourceButtonApply: String;
  public ressourceExtendColumnStrength: String;

  public addColumnAwpActivated: Boolean;
  public addColumnAwpDiffActivated: Boolean;
  public addColumnNextStrengthActivated: Boolean;
  public extendColumnStrengthActivated: Boolean;

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
        "SettingsTransferMarketAmateurTable",
        new LogLevelError()));

    this.settings = new StorageLocal<ITransferMarketAmateurPlayerTableExtensionSetting>(
      new SettingNameTransferMarketAmateurTable(),
      new TransferMarketAmateurPlayerTableExtensionSetting(true, true, true, true));

    this.ressourceHeading = new RessourceTransferMarketAmateurTableSettingsHeader().value();
    this.ressourceAddColumnAwp = new RessourceCommonSettingsAddColumnAwp().value();
    this.ressourceAddColumnAwpDiff = new RessourceCommonSettingsAddColumnAwpDiff().value();
    this.ressourceAddColumnNextStrength = new RessourceCommonSettingsAddColumnNextStrength().value();
    this.ressourceExtendColumnStrength = new RessourceCommonSettingsExtendColumnStrength().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();

    this.settings.value().then(settings => {
      this.addColumnAwpActivated = settings.addAwpColumnActivated();
      this.addColumnAwpDiffActivated = settings.addAwpDiffColumnActivated();
      this.addColumnNextStrengthActivated = settings.addNextStrengthColumnActivated();
      this.extendColumnStrengthActivated = settings.extendStrengthColumnActivated();
    })
  }

  submit() {
    this.log.debug(`extend col strength: ${this.extendColumnStrengthActivated}, add col AWP Diff: ${this.addColumnAwpDiffActivated}, add col next strength: ${this.addColumnNextStrengthActivated}`);

    this.settings
      .save(new TransferMarketAmateurPlayerTableExtensionSetting(
        this.addColumnAwpActivated,
        this.addColumnAwpDiffActivated,
        this.addColumnNextStrengthActivated,
        this.extendColumnStrengthActivated
      ));
  }
}
