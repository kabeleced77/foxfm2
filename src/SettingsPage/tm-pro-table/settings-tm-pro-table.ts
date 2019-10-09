import { ILogger, Logger } from '../../Common/Logger/Logger';
import { RegisteredLoggingModule, IRegisteredLoggingModule } from '../../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from "../../Common/Logger/RegisteredLoggingModules";
import { ILogLevel } from '../../Common/Logger/LogLevel';
import { LogLevelError } from '../../Common/Logger/LogLevel';
import { Mutex } from "../../Common/Toolkit/Mutex";
import { SettingNameLoggingModules } from "../../Common/Settings/SettingNameLoggingModules";
import { StorageLocal } from "../../Common/Toolkit/StorageLocal";
import { StorageLocalSync } from "../../Common/Toolkit/StorageLocalSync";
import { SettingNameApplicationLogLevel } from "../../Common/Settings/SettingNameApplicationLogLevel";
import { SettingNameTeamTable } from '../../Common/Settings/SettingNameTeamTable';
import { ISetting } from '../../Common/Toolkit/Setting';
import { IEasyLogger, EasyLogger } from '../../Common/Logger/EasyLogger';
import {
  RessourceCommonButtonApply, RessourceTransferMarketProfessionalsTableSettingsHeader, RessourceCommonSettingsExtendColumnStrength, RessourceCommonSettingsAddColumnAwpDiff, RessourceCommonSettingsAddColumnNextStrength, RessourceCommonSettingsAddColumnAwp, RessourceCommonSettingsAddColumnTransferPriceCurrentStrength, RessourceCommonSettingsAddColumnTransferPriceNextStrength, RessourceCommonSettingsAddColumnTransferPriceNextAgeCurrentStrength, RessourceCommonSettingsAddColumnTransferPriceNextAgeNextStrength, RessourceSettingsPageTransferMarketProfessionalsImportTransfers,
  RessourceSettingsPageTransferMarketProfessionalsImportTransfersHeader,
  RessourceSettingsPageTransferMarketProfessionalsImportTransfersDescription,
  RessourceCommonSettingsAddColumnsTransferPricesIntroduction,
  RessourceSettingsPageTransferMarketProfessionalsWarningSlidersAreNotSupported
} from '../../Common/Ressource';
import { ITransferMarketSearchResultTableSettings, TransferMarketSearchResultTableSettings } from '../../Common/Settings/TransferMarketSearchResultTableSettings';
import { SettingNameTransferMarketProfessionalsSearchResultTable } from '../../Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable';
import { ISettingImportTransfers } from '../../Common/Settings/ISettingImportTransfers';
import { SettingNameImportTransfers } from '../../Common/Settings/SettingNameImports';
import { SettingImportTransfers } from '../../Common/Settings/SettingImportTransfers';

export class SettingsTransferMarketProfessionalTable {
  private log: IEasyLogger;
  private settings: ISetting<ITransferMarketSearchResultTableSettings>;
  private settingsImport: StorageLocal<ISettingImportTransfers>;

  public ressourceHeading: String;
  public ressourceExtendColumngStrength: String;
  public ressourceAddColumnAwp: String;
  public ressourceAddColumnAwpDiff: String;
  public ressourceAddColumnNextStrength: String;
  public ressourceAddColumnTransferPriceCurrentStrength: String;
  public ressourceAddColumnsTransferPricesIntroduction: String;
  public ressourceWarningSlidersAreNotSupported: String;
  public ressourceAddColumnTransferPriceNextStrength: String;
  public ressourceAddColumnTransferPriceNextAgeCurrentStrength: String;
  public ressourceAddColumnTransferPriceNextAgeNextStrength: String;

  public ressourceHeadingImportTransfers: String;
  public ressourceImportTransfersDescription: String;
  public ressourceImportTransfers: String;

  public ressourceButtonApply: String;

  public addColumngAwpActivated: Boolean;
  public addColumngAwpDiffActivated: Boolean;
  public extendColumngStrengthActivated: Boolean;
  public addColumnNextStrengthActivated: Boolean;
  public addColumnTransferPricesCurrentStrengthActivated: Boolean;
  public addColumnTransferPricesNextStrengthActivated: Boolean;
  public addColumnTransferPricesNextAgeCurrentStrengthActivated: Boolean;
  public addColumnTransferPricesNextAgeNextStrengthActivated: Boolean;

  public importTransfersActivated: Boolean;

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
      new TransferMarketSearchResultTableSettings(
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ));

    this.settingsImport = new StorageLocal<ISettingImportTransfers>(
      new SettingNameImportTransfers(),
      new SettingImportTransfers(
        false,
      )
    );

    this.ressourceHeading = new RessourceTransferMarketProfessionalsTableSettingsHeader().value();
    this.ressourceExtendColumngStrength = new RessourceCommonSettingsExtendColumnStrength().value();
    this.ressourceAddColumnAwp = new RessourceCommonSettingsAddColumnAwp().value();
    this.ressourceAddColumnAwpDiff = new RessourceCommonSettingsAddColumnAwpDiff().value();
    this.ressourceAddColumnNextStrength = new RessourceCommonSettingsAddColumnNextStrength().value();
    this.ressourceAddColumnsTransferPricesIntroduction = new RessourceCommonSettingsAddColumnsTransferPricesIntroduction().value();
    this.ressourceAddColumnTransferPriceCurrentStrength = new RessourceCommonSettingsAddColumnTransferPriceCurrentStrength().value();
    this.ressourceAddColumnTransferPriceNextStrength = new RessourceCommonSettingsAddColumnTransferPriceNextStrength().value();
    this.ressourceAddColumnTransferPriceNextAgeCurrentStrength = new RessourceCommonSettingsAddColumnTransferPriceNextAgeCurrentStrength().value();
    this.ressourceAddColumnTransferPriceNextAgeNextStrength = new RessourceCommonSettingsAddColumnTransferPriceNextAgeNextStrength().value();

    this.ressourceButtonApply = new RessourceCommonButtonApply().value();

    this.ressourceHeadingImportTransfers = new RessourceSettingsPageTransferMarketProfessionalsImportTransfersHeader().value();
    this.ressourceImportTransfersDescription = new RessourceSettingsPageTransferMarketProfessionalsImportTransfersDescription().value();
    this.ressourceImportTransfers = new RessourceSettingsPageTransferMarketProfessionalsImportTransfers().value();
    this.ressourceWarningSlidersAreNotSupported = new RessourceSettingsPageTransferMarketProfessionalsWarningSlidersAreNotSupported().value();

    this.settings.value().then(settings => {
      this.extendColumngStrengthActivated = settings.extendStrengthColumnActivated();
      this.addColumngAwpActivated = settings.addAwpColumnActivated();
      this.addColumngAwpDiffActivated = settings.addAwpDiffColumnActivated();
      this.addColumnNextStrengthActivated = settings.addNextStrengthColumnActivated();
      this.addColumnTransferPricesCurrentStrengthActivated = settings.addTransferPriceStrengthColumnActivated();
      this.addColumnTransferPricesNextStrengthActivated = settings.addTransferPriceNextStrengthColumnActivated();
      this.addColumnTransferPricesNextAgeCurrentStrengthActivated = settings.addTransferPriceNextAgeStrengthColumnActivated();
      this.addColumnTransferPricesNextAgeNextStrengthActivated = settings.addTransferPriceNextAgeNextStrengthColumnActivated();
    });

    this.settingsImport
      .value()
      .then(settings => {
        this.importTransfersActivated = settings.activated();
      });
  }

  submit() {
    this.settings
      .save(new TransferMarketSearchResultTableSettings(
        this.extendColumngStrengthActivated,
        this.addColumngAwpActivated,
        this.addColumngAwpDiffActivated,
        this.addColumnNextStrengthActivated,
        this.addColumnTransferPricesCurrentStrengthActivated,
        this.addColumnTransferPricesNextStrengthActivated,
        this.addColumnTransferPricesNextAgeCurrentStrengthActivated,
        this.addColumnTransferPricesNextAgeNextStrengthActivated,
      ));

    this.settingsImport
      .save(
        new SettingImportTransfers(
          this.importTransfersActivated,
        )
      );
  }
}
