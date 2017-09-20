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
import { ITransferOfferTableSettings, TransferOfferTableSettings } from '../Common/Settings/TransferOfferTableSettings';
import { SettingNameTransferTablePossibleOffers } from '../Common/Settings/SettingNameTransferTablePossibleOffers';
import { RessourceTransferMarketOfferTableSettingsHeader, RessourceTransferMarketOfferTableSettingsExtendColumnStrength, RessourceTransferMarketOfferTableSettingsAddColumnAwpDiff, RessourceTransferMarketOfferTableSettingsAddColumnNextStrength, RessourceCommonButtonApply } from '../Common/Ressource';

export class SettingsTransferMarketOfferTable {
  private log: IEasyLogger;
  private settings: ISetting<ITransferOfferTableSettings>;

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
        "SettingsTransferMarketOfferTable",
        new LogLevelError()));

    this.settings = new StorageLocal<ITransferOfferTableSettings>(
      new SettingNameTransferTablePossibleOffers(),
      new TransferOfferTableSettings(true, true, true));

    this.ressourceHeading = new RessourceTransferMarketOfferTableSettingsHeader().value();
    this.ressourceExtendColumngStrength = new RessourceTransferMarketOfferTableSettingsExtendColumnStrength().value();
    this.ressourceAddColumnAwpDiff = new RessourceTransferMarketOfferTableSettingsAddColumnAwpDiff().value();
    this.ressourceAddColumnNextStrength = new RessourceTransferMarketOfferTableSettingsAddColumnNextStrength().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();

    this.settings.value().then(settings => {
      this.extendColumngStrengthActivated = settings.extendStrengthColumnActivated();
      this.addColumngAwpDiffActivated = settings.addAwpDiffColumnActivated();
      this.addColumnNextStrengthActivated = settings.addNextStrengthColumnActivated();
    })
  }

  submit() {
    this.log.debug(`extend col strength: ${this.extendColumngStrengthActivated}, add col AWP Diff: ${this.addColumngAwpDiffActivated}, add col next strength: ${this.addColumnNextStrengthActivated}`);

    this.settings
      .save(new TeamTableSetting(
        this.extendColumngStrengthActivated,
        this.addColumngAwpDiffActivated,
        this.addColumnNextStrengthActivated));
  }
}
