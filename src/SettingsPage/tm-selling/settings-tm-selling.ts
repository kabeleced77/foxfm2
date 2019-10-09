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
  RessourceCommonSelectElement,
  RessourceTransferMarketSellingSettingsChangeDuration,
  RessourceTransferMarketSellingSettingsHeader,
  RessourceTransferMarketSellingSettingsImproveSellingProcessSettingsHeader,
  RessourceTransferMarketSellingSettingsPlayerInformationPageSetFocus,
  RessourceTransferMarketSellingSettingsPlayerTransferMarketPageSetFocus,
  RessourceTransferMarketSellingSettingsPlayerTransferMarketPlayerPageSetFocus,
} from '../../Common/Ressource';
import { FocusElementSetting, IFocusElementSetting } from '../../Common/Settings/FocusElementSetting';
import { FocusElementsSetting, IFocusElementsSetting } from '../../Common/Settings/FocusElementsSetting';
import {
  PlayerTransferMarketPageFocusElementSettingName,
} from '../../Common/Settings/PlayerTransferMarketPageFocusElementSettingName';
import { SettingNameApplicationLogLevel } from '../../Common/Settings/SettingNameApplicationLogLevel';
import { SettingNameLoggingModules } from '../../Common/Settings/SettingNameLoggingModules';
import {
  SettingNamePlayerInformationWebPageFocusElement,
} from '../../Common/Settings/SettingNamePlayerInformationWebPageFocusElement';
import { SettingNameTransferMarketSellingDuration } from '../../Common/Settings/SettingNameTransferMarketDuration';
import {
  ITransferMarketSellingDurationSettings,
  TransferMarketSellingDurationSettings,
} from '../../Common/Settings/TransferMarketSellingDurationSettings';
import {
  PlayerInformationPageFocusElementSettingDefaultValue,
} from '../../Common/SettingsDefaultValues/PlayerInformationPageFocusElementSettingDefaultValue';
import {
  PlayerTransferMarketPageFocusElementSettingDefaultValue,
} from '../../Common/SettingsDefaultValues/PlayerTransferMarketPageFocusElementSettingDefaultValue';
import {
  TransferMarketSellingDurationSettingsDefaultValue,
} from '../../Common/SettingsDefaultValues/TransferMarketSellingDurationSettingsDefaultValue';
import { Mutex } from '../../Common/Toolkit/Mutex';
import { ISetting } from '../../Common/Toolkit/Setting';
import { StorageLocal } from '../../Common/Toolkit/StorageLocal';
import { StorageLocalSync } from '../../Common/Toolkit/StorageLocalSync';
import { CheckboxViewModel } from '../../Common/ViewModels/CheckboxViewModel';
import { CheckboxWithSelectViewModel, ICheckboxWithSelectViewModel } from '../../Common/ViewModels/CheckboxWithSelectViewModel';
import { FocusElementViewModel, IFocusElementViewModel } from '../../Common/ViewModels/FocusElementViewModel';
import { ISelectViewModel, SelectViewModel } from '../../Common/ViewModels/SelectViewModel';
import { PlayerTransferMarketPlayerPageFocusElementSettingName } from '../../Common/Settings/PlayerTransferMarketPlayerPageFocusElementSettingName';
import { PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue } from '../../Common/SettingsDefaultValues/PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue';

export class SettingsTransferMarketSelling {
  private log: IEasyLogger;

  public ressourceHeading: String;
  public ressourceHeadingImproveSellingProcess: String;
  public ressourceButtonApply: String;

  public defaultSellingDurationViewModel: ICheckboxWithSelectViewModel<String, Number>;
  public defaultSellingDurationSettingModel: SettingsModelViewModel2;
  public playerPageFocusElementsSettingModels: Array<SettingsModelViewModel>;
  public playerPageFocusElementsViewModels: Array<ICheckboxWithSelectViewModel<IFocusElementViewModel, IFocusElementViewModel>> = [];

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
    this.ressourceHeadingImproveSellingProcess = new RessourceTransferMarketSellingSettingsImproveSellingProcessSettingsHeader().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();

    this.defaultSellingDurationSettingModel = new SettingsModelViewModel2(
      new StorageLocal<ITransferMarketSellingDurationSettings>(
        new SettingNameTransferMarketSellingDuration(),
        new TransferMarketSellingDurationSettingsDefaultValue()),
      new RessourceTransferMarketSellingSettingsChangeDuration()
    );
    this.playerPageFocusElementsSettingModels = [
      new SettingsModelViewModel(
        new StorageLocal<IFocusElementsSetting>(
          new SettingNamePlayerInformationWebPageFocusElement(),
          new PlayerInformationPageFocusElementSettingDefaultValue()),
        new RessourceTransferMarketSellingSettingsPlayerInformationPageSetFocus()),
      new SettingsModelViewModel(
        new StorageLocal<IFocusElementsSetting>(
          new PlayerTransferMarketPlayerPageFocusElementSettingName(),
          new PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue()),
        new RessourceTransferMarketSellingSettingsPlayerTransferMarketPlayerPageSetFocus()),
      new SettingsModelViewModel(
        new StorageLocal<IFocusElementsSetting>(
          new PlayerTransferMarketPageFocusElementSettingName(),
          new PlayerTransferMarketPageFocusElementSettingDefaultValue()),
        new RessourceTransferMarketSellingSettingsPlayerTransferMarketPageSetFocus()),
    ];
    this.initialiseSettings();
  }

  public async submit() {
    let viewModel = await this.defaultSellingDurationSettingModel.viewModel();
    this.defaultSellingDurationSettingModel.settingsModel().save(new TransferMarketSellingDurationSettings(
      viewModel.checkbox.state,
      viewModel.select.selectedOption));

    this.playerPageFocusElementsSettingModels.forEach(async settingsModelViewModel => {
      let viewModel = await settingsModelViewModel.viewModel();
      settingsModelViewModel.settingsModel().update(value => {
        return this.updateFocusElemensSetting(value, viewModel);
      });
    });
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
    this.playerPageFocusElementsSettingModels.forEach(async e => this.playerPageFocusElementsViewModels.push(await e.viewModel()));
  }
}

export interface ISettingsModelViewModel {
  settingsModel(): ISetting<IFocusElementsSetting>;
  viewModel(): Promise<ICheckboxWithSelectViewModel<IFocusElementViewModel, IFocusElementViewModel>>;
}

export interface ISettingsModelViewModel2 {
  settingsModel(): ISetting<ITransferMarketSellingDurationSettings>;
  viewModel(): Promise<ICheckboxWithSelectViewModel<String, Number>>;
}

export class SettingsModelViewModel implements ISettingsModelViewModel {
  private settings: ISetting<IFocusElementsSetting>;
  private settingsViewModel: Promise<ICheckboxWithSelectViewModel<IFocusElementViewModel, IFocusElementViewModel>>;
  private ressourceCheckboxLabel: IRessource;
  private ressourceSelectElement: IRessource;

  constructor(settings: ISetting<IFocusElementsSetting>, checkboxLabel: IRessource) {
    this.settings = settings;
    this.settingsViewModel = this.initialiseViewModel(settings);
    this.ressourceCheckboxLabel = checkboxLabel;
    this.ressourceSelectElement = new RessourceCommonSelectElement();
  }

  public settingsModel(): ISetting<IFocusElementsSetting> {
    return this.settings;
  }
  public async viewModel(): Promise<ICheckboxWithSelectViewModel<IFocusElementViewModel, IFocusElementViewModel>> {
    return this.settingsViewModel;
  }

  private async initialiseViewModel(focusElementSettings: ISetting<IFocusElementsSetting>): Promise<ICheckboxWithSelectViewModel<IFocusElementViewModel, IFocusElementViewModel>> {
    let settings = await focusElementSettings.value();
    return new CheckboxWithSelectViewModel<IFocusElementViewModel, IFocusElementViewModel>(
      new CheckboxViewModel(
        settings.activated(),
        this.ressourceCheckboxLabel.value()),
      this.initialiseSelectViewModel(settings.elements().array()));
  }
  private initialiseSelectViewModel(elementsToFocus: Array<IFocusElementSetting>): ISelectViewModel<IFocusElementViewModel, IFocusElementViewModel> {
    let elementsToFocusViewModels = elementsToFocus.map((element, i) => new FocusElementViewModel(i, element.ressourceOfElement().value()));
    let selectElementViewModel = new FocusElementViewModel(elementsToFocusViewModels.length, this.ressourceSelectElement.value());
    elementsToFocusViewModels.push(selectElementViewModel);

    let selectedElementIndex = elementsToFocus.findIndex(element => element.activated() === true);
    let selectedElementViewModel = selectedElementIndex >= 0 ? elementsToFocusViewModels[selectedElementIndex] : selectElementViewModel;

    return new SelectViewModel<IFocusElementViewModel, IFocusElementViewModel>(
      elementsToFocusViewModels,
      selectedElementViewModel
    )
  }
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
