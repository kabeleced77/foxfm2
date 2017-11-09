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
import { RessourceTransferMarketOfferTableSettingsHeader, RessourceCommonButtonApply, RessourceCommonSettingsExtendColumnStrength, RessourceCommonSettingsAddColumnAwpDiff, RessourceCommonSettingsAddColumnNextStrength, RessourceTransferMarketSellingSettingsHeader, RessourceTransferMarketSellingChangeDuration, RessourceCommonMatchday, RessourceCommonMatchdays } from '../Common/Ressource';
import { ITransferMarketSellingDurationSettings, TransferMarketSellingDurationSettings } from '../Common/Settings/TransferMarketSellingDurationSettings';
import { SettingNameTransferMarketSellingDuration } from '../Common/Settings/SettingNameTransferMarketDuration';

export class SettingsTransferMarketSelling {
  private log: IEasyLogger;
  private settings: ISetting<ITransferMarketSellingDurationSettings>;

  public ressourceHeading: String;
  public ressourceButtonApply: String;
  public ressourceGameDay: String;
  public ressourceGameDays: String;
  public ressourceChangeSellingDuration: String;

  public changeDefaultSellingDuration: Boolean;
  public defaultSellingDuration: Number;

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
        "SettingsTransferMarketSelling",
        new LogLevelError()));

    this.settings = new StorageLocal<ITransferMarketSellingDurationSettings>(
      new SettingNameTransferMarketSellingDuration(),
      new TransferMarketSellingDurationSettings(false, 4));

    this.ressourceHeading = new RessourceTransferMarketSellingSettingsHeader().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();
    this.ressourceGameDay = new RessourceCommonMatchday().value();
    this.ressourceGameDays = new RessourceCommonMatchdays().value();
    this.ressourceChangeSellingDuration = new RessourceTransferMarketSellingChangeDuration().value();

    this.settings.value().then(settings => {
      this.changeDefaultSellingDuration = settings.changeDefaultSellingDuration();
      this.defaultSellingDuration = settings.defaultSellingDuration();
    })
  }

  submit() {
    this.settings
      .save(new TransferMarketSellingDurationSettings(
        this.changeDefaultSellingDuration,
        this.defaultSellingDuration));
  }
}
