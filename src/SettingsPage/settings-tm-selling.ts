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
import { RessourceTransferMarketOfferTableSettingsHeader, RessourceCommonButtonApply, RessourceCommonSettingsExtendColumnStrength, RessourceCommonSettingsAddColumnAwpDiff, RessourceCommonSettingsAddColumnNextStrength, RessourceTransferMarketSellingSettingsHeader, RessourceTransferMarketSellingChangeDuration, RessourceCommonMatchday, RessourceCommonMatchdays, RessourceTransferMarketSellingImproveSellingProcessSettingsHeader, RessourceTransferMarketSellingPlayerInformationPageSetFocus, Ressource } from '../Common/Ressource';
import { ITransferMarketSellingDurationSettings, TransferMarketSellingDurationSettings } from '../Common/Settings/TransferMarketSellingDurationSettings';
import { SettingNameTransferMarketSellingDuration } from '../Common/Settings/SettingNameTransferMarketDuration';
import { IFocusElementSetting, FocusElementSetting } from '../Common/Settings/FocusElementSetting';
import { SettingNamePlayerInformationWebPageFocusElement } from '../Common/Settings/SettingNamePlayerInformationWebPageFocusElement';

export class SettingsTransferMarketSelling {
  private log: IEasyLogger;
  private settingsTransferMarketSellingDuration: ISetting<ITransferMarketSellingDurationSettings>;
  private settingsPlayerInformationWebPageFocus: ISetting<IFocusElementSetting>;

  public ressourceHeading: String;
  public ressourceHeadingImproveSellingProcess: String;
  public ressourceButtonApply: String;
  public ressourceGameDay: String;
  public ressourceGameDays: String;
  public ressourceChangeSellingDuration: String;
  public ressourcePlayerInformationPageSetFocus: String;

  public changeDefaultSellingDuration: Boolean;
  public defaultSellingDuration: Number;

  public playerInformationPageSetFocus: Boolean;
  public playerInformationPageFocusElementName: String;

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

    this.settingsTransferMarketSellingDuration = new StorageLocal<ITransferMarketSellingDurationSettings>(
      new SettingNameTransferMarketSellingDuration(),
      new TransferMarketSellingDurationSettings(false, 4));
    this.settingsPlayerInformationWebPageFocus = new StorageLocal<IFocusElementSetting>(
      new SettingNamePlayerInformationWebPageFocusElement(),
      new FocusElementSetting(false, "", new Ressource("")));

    this.ressourceHeading = new RessourceTransferMarketSellingSettingsHeader().value();
    this.ressourceHeadingImproveSellingProcess = new RessourceTransferMarketSellingImproveSellingProcessSettingsHeader().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();
    this.ressourceGameDay = new RessourceCommonMatchday().value();
    this.ressourceGameDays = new RessourceCommonMatchdays().value();
    this.ressourceChangeSellingDuration = new RessourceTransferMarketSellingChangeDuration().value();
    this.ressourcePlayerInformationPageSetFocus = new RessourceTransferMarketSellingPlayerInformationPageSetFocus().value();

    this.initialiseSettings();
  }

  submit() {
    this.settingsTransferMarketSellingDuration
      .save(new TransferMarketSellingDurationSettings(
        this.changeDefaultSellingDuration,
        this.defaultSellingDuration));
    this.settingsPlayerInformationWebPageFocus
      .update(value => {
        value.changeFocusElementStatus(this.playerInformationPageSetFocus);
        return value;
      });
  }

  private async initialiseSettings() {
    let settingsSellingDuration = await this.settingsTransferMarketSellingDuration.value();
    this.changeDefaultSellingDuration = settingsSellingDuration.changeDefaultSellingDuration();
    this.defaultSellingDuration = settingsSellingDuration.defaultSellingDuration();
    let settingsPlayerInformationPageFocus = await this.settingsPlayerInformationWebPageFocus.value();
    this.playerInformationPageSetFocus = settingsPlayerInformationPageFocus.focusElement();
    this.playerInformationPageFocusElementName = settingsPlayerInformationPageFocus.ressourceOfElement().value();
    /*
    this.settingsTransferMarketSellingDuration
      .value()
      .then(settings => {
        this.changeDefaultSellingDuration = settings.changeDefaultSellingDuration();
        this.defaultSellingDuration = settings.defaultSellingDuration();
      })
    this.settingsPlayerInformationWebPageFocus
      .value()
      .then(settings => {
        this.playerInformationPageSetFocus = settings.focusElement();
        this.playerInformationPageFocusElementName = settings.ressourceOfElement().value();
      })
      */
  }
}
