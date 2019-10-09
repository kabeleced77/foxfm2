import { ArrayInStorage } from '../../Common/ArrayInStorage';
import { EasyLogger, IEasyLogger } from '../../Common/Logger/EasyLogger';
import { Logger } from '../../Common/Logger/Logger';
import { LogLevelError } from '../../Common/Logger/LogLevel';
import { ILogLevel } from '../../Common/Logger/LogLevel';
import { IRegisteredLoggingModule, RegisteredLoggingModule } from '../../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from '../../Common/Logger/RegisteredLoggingModules';
import {
  IRessource,
  RessourceCommonButtonApply,
  RessourceCommonMatchday,
  RessourceCommonMatchdays,
  RessourceTransferMarketSellingSettingsChangeDuration,
  RessourceTransferMarketSellingSettingsHeader,
} from '../../Common/Ressource';
import { FocusElementSetting } from '../../Common/Settings/FocusElementSetting';
import { FocusElementsSetting, IFocusElementsSetting } from '../../Common/Settings/FocusElementsSetting';
import { SettingNameApplicationLogLevel } from '../../Common/Settings/SettingNameApplicationLogLevel';
import { SettingNameLoggingModules } from '../../Common/Settings/SettingNameLoggingModules';
import { SettingNameTransferMarketSellingDuration } from '../../Common/Settings/SettingNameTransferMarketDuration';
import {
  ITransferMarketSellingDurationSettings,
  TransferMarketSellingDurationSettings,
} from '../../Common/Settings/TransferMarketSellingDurationSettings';
import {
  TransferMarketSellingDurationSettingsDefaultValue,
} from '../../Common/SettingsDefaultValues/TransferMarketSellingDurationSettingsDefaultValue';
import { Mutex } from '../../Common/Toolkit/Mutex';
import { ISetting } from '../../Common/Toolkit/Setting';
import { StorageLocal } from '../../Common/Toolkit/StorageLocal';
import { StorageLocalSync } from '../../Common/Toolkit/StorageLocalSync';
import { CheckboxViewModel } from '../../Common/ViewModels/CheckboxViewModel';
import { CheckboxWithSelectViewModel, ICheckboxWithSelectViewModel } from '../../Common/ViewModels/CheckboxWithSelectViewModel';
import { IFocusElementViewModel } from '../../Common/ViewModels/FocusElementViewModel';
import { SelectViewModel } from '../../Common/ViewModels/SelectViewModel';

export class SettingsTransferMarketSelling {
  private log: IEasyLogger;

  public ressourceHeading: String;
  public ressourceButtonApply: String;

  public defaultSellingDurationViewModel: ICheckboxWithSelectViewModel<String, Number>;
  public defaultSellingDurationSettingModel: SettingsModelViewModel2;

  constructor() {
    this.log = new EasyLogger(
      new Logger(
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

    this.ressourceHeading = new RessourceTransferMarketSellingSettingsHeader().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();

    this.defaultSellingDurationSettingModel = new SettingsModelViewModel2(
      new StorageLocal<ITransferMarketSellingDurationSettings>(
        new SettingNameTransferMarketSellingDuration(),
        new TransferMarketSellingDurationSettingsDefaultValue()),
      new RessourceTransferMarketSellingSettingsChangeDuration()
    );
    this.initialiseSettings();
  }

  public async submit() {
    let viewModel = await this.defaultSellingDurationSettingModel.viewModel();
    this.defaultSellingDurationSettingModel.settingsModel().save(new TransferMarketSellingDurationSettings(
      viewModel.checkbox.state,
      viewModel.select.selectedOption));
  }

  private updateFocusElemensSetting(value: IFocusElementsSetting, viewModel: ICheckboxWithSelectViewModel<IFocusElementViewModel, IFocusElementViewModel>): IFocusElementsSetting {
    return new FocusElementsSetting(
      viewModel.checkbox.state,
      new ArrayInStorage(value.elements().array().map((element, index) =>
        index === viewModel.select.selectedOption.index()
          ? new FocusElementSetting(true, element.xPathToElement(), element.ressourceOfElement())
          : new FocusElementSetting(false, element.xPathToElement(), element.ressourceOfElement()))),
    );
  }

  private async initialiseSettings(): Promise<void> {
    this.defaultSellingDurationViewModel = await this.defaultSellingDurationSettingModel.viewModel();
  }
}

export interface ISettingsModelViewModel2 {
  settingsModel(): ISetting<ITransferMarketSellingDurationSettings>;
  viewModel(): Promise<ICheckboxWithSelectViewModel<String, Number>>;
}

export class SettingsModelViewModel2 implements ISettingsModelViewModel2 {
  private settings: ISetting<ITransferMarketSellingDurationSettings>;
  private settingsViewModel: Promise<ICheckboxWithSelectViewModel<String, Number>>;
  private ressourceCheckboxLabel: IRessource;
  private ressourceGameDay: IRessource;
  private ressourceGameDays: IRessource;

  constructor(settings: ISetting<ITransferMarketSellingDurationSettings>, checkboxLabel: IRessource) {
    this.settings = settings;
    this.settingsViewModel = this.initialiseViewModel(settings);
    this.ressourceCheckboxLabel = checkboxLabel;
    this.ressourceGameDay = new RessourceCommonMatchday();
    this.ressourceGameDays = new RessourceCommonMatchdays();
  }

  public settingsModel(): ISetting<ITransferMarketSellingDurationSettings> {
    return this.settings;
  }
  public async viewModel(): Promise<ICheckboxWithSelectViewModel<String, Number>> {
    return this.settingsViewModel;
  }

  private async initialiseViewModel(settings: ISetting<ITransferMarketSellingDurationSettings>): Promise<ICheckboxWithSelectViewModel<String, Number>> {
    let settingsSellingDuration = await settings.value();
    return new CheckboxWithSelectViewModel<String, Number>(
      new CheckboxViewModel(
        settingsSellingDuration.activated(),
        this.ressourceCheckboxLabel.value()),
      new SelectViewModel<String, Number>(
        this.initialiseListOfSellingDurations(8),
        settingsSellingDuration.defaultSellingDuration()));
  }

  private initialiseListOfSellingDurations(maxSellingDuration: Number): Array<String> {
    let sellingDurations: Array<String> = [];
    for (let index = 1; index <= maxSellingDuration.valueOf(); index++) {
      let sellingDuration: String;
      switch (index) {
        case 1:
          sellingDuration = `${index} ${this.ressourceGameDay.value()} 80 Kixx`;
          break;
        case 2:
          sellingDuration = `${index} ${this.ressourceGameDays.value()} 80 Kixx`;
          break;
        default:
          sellingDuration = `${index} ${this.ressourceGameDays.value()}`;
          break;
      }
      sellingDurations.push(sellingDuration);
    }
    return sellingDurations;
  }
}
