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
import { RessourceTransferMarketOfferTableSettingsHeader, RessourceCommonButtonApply, RessourceCommonSettingsExtendColumnStrength, RessourceCommonSettingsAddColumnAwpDiff, RessourceCommonSettingsAddColumnNextStrength, RessourceTransferMarketSellingSettingsHeader, RessourceTransferMarketSellingSettingsChangeDuration, RessourceCommonMatchday, RessourceCommonMatchdays, RessourceTransferMarketSellingSettingsImproveSellingProcessSettingsHeader, RessourceTransferMarketSellingSettingsPlayerInformationPageSetFocus, Ressource, RessourcePlayerInformationWebPageElementTransferMarket, RessourceCommonSelectElement, RessourceTransferMarketSellingSettingsPlayerTransferMarketPageSetFocus, IRessource } from '../Common/Ressource';
import { ITransferMarketSellingDurationSettings, TransferMarketSellingDurationSettings } from '../Common/Settings/TransferMarketSellingDurationSettings';
import { SettingNameTransferMarketSellingDuration } from '../Common/Settings/SettingNameTransferMarketDuration';
import { IFocusElementSetting, FocusElementSetting } from '../Common/Settings/FocusElementSetting';
import { SettingNamePlayerInformationWebPageFocusElement } from '../Common/Settings/SettingNamePlayerInformationWebPageFocusElement';
import { ArrayInStorage, IArrayInStorage } from '../Common/ArrayInStorage';
import { IHtmlAttribute } from '../Common/Toolkit/HtmlAttribute';
import { IFocusElementsSetting, FocusElementsSetting } from '../Common/Settings/FocusElementsSetting';
import { PlayerInformationPageFocusElementSettingDefaultValue } from '../Common/SettingsDefaultValues/PlayerInformationPageFocusElementSettingDefaultValue';
import { PlayerTransferMarketPageFocusElementSettingName } from '../Common/Settings/PlayerTransferMarketPageFocusElementSettingName';
import { PlayerTransferMarketPageFocusElementSettingDefaultValue } from '../Common/SettingsDefaultValues/PlayerTransferMarketPageFocusElementSettingDefaultValue';
import { ICheckboxViewModel, CheckboxViewModel } from '../Common/ViewModels/CheckboxViewModel';
import { ISelectViewModel, SelectViewModel } from '../Common/ViewModels/SelectViewModel';
import { ICheckboxWithSelectViewModel, CheckboxWithSelectViewModel } from '../Common/ViewModels/CheckboxWithSelectViewModel';
import { FocusElementViewModel, IFocusElementViewModel } from '../Common/ViewModels/FocusElementViewModel';

export class SettingsTransferMarketSelling {
  private log: IEasyLogger;
  private settingsTransferMarketSellingDuration: ISetting<ITransferMarketSellingDurationSettings>;
  private settingsPlayerInformationWebPageFocus: ISetting<IFocusElementsSetting>;
  private settingsPlayerTransferMarketWebPageFocus: ISetting<IFocusElementsSetting>;

  public ressourceHeading: String;
  public ressourceHeadingImproveSellingProcess: String;
  public ressourceButtonApply: String;
  public ressourceSelectElement: String;
  public ressourceGameDay: String;
  public ressourceGameDays: String;
  public ressourceChangeSellingDuration: String;
  public ressourcePlayerInformationPageSetFocus: IRessource;
  public ressourcePlayerTransferMarketPageSetFocus: IRessource;

  public defaultSellingDurationViewModel: ICheckboxWithSelectViewModel<String, Number>;

  public playerInformationPageFocusElementsViewModel: ICheckboxWithSelectViewModel<IFocusElementViewModel, IFocusElementViewModel>;
  public playerTransferMarketPageFocusElementsViewModel: ICheckboxWithSelectViewModel<IFocusElementViewModel, IFocusElementViewModel>;

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

    this.settingsTransferMarketSellingDuration = new StorageLocal<ITransferMarketSellingDurationSettings>(
      new SettingNameTransferMarketSellingDuration(),
      new TransferMarketSellingDurationSettings(false, 4));
    this.settingsPlayerInformationWebPageFocus = new StorageLocal<IFocusElementsSetting>(
      new SettingNamePlayerInformationWebPageFocusElement(),
      new PlayerInformationPageFocusElementSettingDefaultValue());
    this.settingsPlayerTransferMarketWebPageFocus = new StorageLocal<IFocusElementsSetting>(
      new PlayerTransferMarketPageFocusElementSettingName(),
      new PlayerTransferMarketPageFocusElementSettingDefaultValue());

    this.ressourceHeading = new RessourceTransferMarketSellingSettingsHeader().value();
    this.ressourceHeadingImproveSellingProcess = new RessourceTransferMarketSellingSettingsImproveSellingProcessSettingsHeader().value();
    this.ressourceButtonApply = new RessourceCommonButtonApply().value();
    this.ressourceSelectElement = new RessourceCommonSelectElement().value();
    this.ressourceGameDay = new RessourceCommonMatchday().value();
    this.ressourceGameDays = new RessourceCommonMatchdays().value();
    this.ressourceChangeSellingDuration = new RessourceTransferMarketSellingSettingsChangeDuration().value();
    this.ressourcePlayerInformationPageSetFocus = new RessourceTransferMarketSellingSettingsPlayerInformationPageSetFocus();
    this.ressourcePlayerTransferMarketPageSetFocus = new RessourceTransferMarketSellingSettingsPlayerTransferMarketPageSetFocus();

    this.initialiseSettings();
  }

  submit() {
    this.settingsTransferMarketSellingDuration.save(new TransferMarketSellingDurationSettings(
      this.defaultSellingDurationViewModel.checkbox.state,
      this.defaultSellingDurationViewModel.select.selectedOption));

    this.settingsPlayerInformationWebPageFocus.update(value => { return this.updateFocusElemensSetting(value, this.playerInformationPageFocusElementsViewModel); });
    this.settingsPlayerTransferMarketWebPageFocus.update(value => { return this.updateFocusElemensSetting(value, this.playerTransferMarketPageFocusElementsViewModel); });
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

  private async initialiseSettings() {
    let settingsSellingDuration = await this.settingsTransferMarketSellingDuration.value();
    this.defaultSellingDurationViewModel =
      new CheckboxWithSelectViewModel<String, Number>(
        new CheckboxViewModel(
          settingsSellingDuration.changeDefaultSellingDuration(),
          this.ressourceChangeSellingDuration),
        new SelectViewModel<String, Number>(
          this.initialiseListOfSellingDurations(7),
          settingsSellingDuration.defaultSellingDuration()));

    let settingsPlayerInformationPageFocusElements = await this.settingsPlayerInformationWebPageFocus.value();
    this.playerInformationPageFocusElementsViewModel = this.initialiseFocusElementsViewModel(settingsPlayerInformationPageFocusElements, this.ressourcePlayerInformationPageSetFocus.value());

    let settingsPlayerTransferMarketPageFocus = await this.settingsPlayerTransferMarketWebPageFocus.value();
    this.playerTransferMarketPageFocusElementsViewModel = this.initialiseFocusElementsViewModel(settingsPlayerTransferMarketPageFocus, this.ressourcePlayerTransferMarketPageSetFocus.value());
  }

  private initialiseFocusElementsViewModel(settings: IFocusElementsSetting, labelText: String): ICheckboxWithSelectViewModel<IFocusElementViewModel, IFocusElementViewModel> {
    return new CheckboxWithSelectViewModel<IFocusElementViewModel, IFocusElementViewModel>(
      new CheckboxViewModel(
        settings.activated(),
        labelText),
      this.initialiseSelectViewModel(settings.elements().array()));
  }

  private initialiseListOfSellingDurations(maxSellingDuration: Number): Array<String> {
    let sellingDurations: Array<String> = [];
    for (let index = maxSellingDuration.valueOf(); index > 0; index--) {
      let sellingDuration: String;
      switch (index) {
        case 1:
          sellingDuration = `${index} ${this.ressourceGameDay} 80 Kixx`;
          break;
        case 2:
          sellingDuration = `${index} ${this.ressourceGameDays} 80 Kixx`;
          break;
        default:
          sellingDuration = `${index} ${this.ressourceGameDays}`;
          break;
      }
      sellingDurations.push(sellingDuration);
    }
    return sellingDurations;
  }

  private initialiseSelectViewModel(elementsToFocus: Array<IFocusElementSetting>): ISelectViewModel<IFocusElementViewModel, IFocusElementViewModel> {
    let elementsToFocusViewModels = elementsToFocus.map((element, i) => new FocusElementViewModel(i, element.ressourceOfElement().value()));
    let selectElementViewModel = new FocusElementViewModel(elementsToFocusViewModels.length, this.ressourceSelectElement);
    elementsToFocusViewModels.push(selectElementViewModel);

    let selectedElementIndex = elementsToFocus.findIndex(element => element.focusElement() === true);
    let selectedElementViewModel = selectedElementIndex >= 0 ? elementsToFocusViewModels[selectedElementIndex] : selectElementViewModel;

    return new SelectViewModel<IFocusElementViewModel, IFocusElementViewModel>(
      elementsToFocusViewModels,
      selectedElementViewModel
    )
  }
}
