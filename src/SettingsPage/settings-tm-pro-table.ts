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
import { SettingNameTeamTable } from '../Common/Settings/SettingNameTeamTable';
import { ISetting } from '../Common/Toolkit/Setting';
import { IEasyLogger, EasyLogger } from '../Common/Logger/EasyLogger';
import { RessourceCommonButtonApply, RessourceTransferMarketProfessionalsTableSettingsHeader, RessourceCommonSettingsExtendColumnStrength, RessourceCommonSettingsAddColumnAwpDiff, RessourceCommonSettingsAddColumnNextStrength, RessourceCommonSettingsAddColumnAwp } from '../Common/Ressource';
import { ITransferMarketSearchResultTableSettings, TransferMarketSearchResultTableSettings } from '../Common/Settings/TransferMarketSearchResultTableSettings';
import { SettingNameTransferMarketProfessionalsSearchResultTable } from '../Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable';

export class SettingsTransferMarketProfessionalTable {
  private log: IEasyLogger;
  private settings: ISetting<ITransferMarketSearchResultTableSettings>;

  public ressourceHeading: String;
  public ressourceExtendColumngStrength: String;
  public ressourceAddColumnAwp: String;
  public ressourceAddColumnAwpDiff: String;
  public ressourceAddColumnNextStrength: String;
  public ressourceButtonApply: String;

  public addColumngAwpActivated: Boolean;
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
        "SettingsTransferMarketProfessionalTable",
        new LogLevelError()));

    this.settings = new StorageLocal<ITransferMarketSearchResultTableSettings>(
      new SettingNameTransferMarketProfessionalsSearchResultTable(),
      new TransferMarketSearchResultTableSettings(true, true, true, true));

    this.ressourceHeading = new RessourceTransferMarketProfessionalsTableSettingsHeader().value();
    this.ressourceExtendColumngStrength = new RessourceCommonSettingsExtendColumnStrength().value();
    this.ressourceAddColumnAwp = new RessourceCommonSettingsAddColumnAwp().value();
    this.ressourceAddColumnAwpDiff = new RessourceCommonSettingsAddColumnAwpDiff().value();
    this.ressourceAddColumnNextStrength = new RessourceCommonSettingsAddColumnNextStrength().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();

    this.settings.value().then(settings => {
      this.extendColumngStrengthActivated = settings.extendStrengthColumnActivated();
      this.addColumngAwpActivated = settings.addAwpColumnActivated();
      this.addColumngAwpDiffActivated = settings.addAwpDiffColumnActivated();
      this.addColumnNextStrengthActivated = settings.addNextStrengthColumnActivated();
    })
  }

  submit() {
    this.settings
      .save(new TransferMarketSearchResultTableSettings(
        this.extendColumngStrengthActivated,
        this.addColumngAwpActivated,
        this.addColumngAwpDiffActivated,
        this.addColumnNextStrengthActivated));
  }
}
