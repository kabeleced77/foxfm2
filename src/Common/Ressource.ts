export interface IRessource {
  key(): String;
  value(substituion?: String): String;
  fromJson(jsonString: String): IRessource;
}

export class Ressource implements IRessource {
  private ressourceKey: String;

  constructor(key: String) {
    this.ressourceKey = key;
  }

  public key(): String {
    return this.ressourceKey;
  }
  public value(substitution?: String): String {
    return chrome.i18n.getMessage(this.ressourceKey.valueOf(), substitution);
  }
  public fromJson(jsonString: String): IRessource {
    return new Ressource(jsonString["ressourceKey"]);
  }
}

export class RessourcePlayerTransferImportFieldNumber implements IRessource {
  private readonly ressource: IRessource;
  constructor() { this.ressource = new Ressource("playerTransfer_import_field_number"); }
  public key(): String { return this.ressource.key() };
  public value(): String { return this.ressource.value(); };
  public fromJson(jsonString: String): IRessource { return this.ressource.fromJson(jsonString); };
}
export class RessourcePlayerTransferImportFieldPosition implements IRessource {
  private readonly ressource: IRessource;
  constructor() { this.ressource = new Ressource("playerTransfer_import_field_position"); }
  public key(): String { return this.ressource.key() };
  public value(): String { return this.ressource.value(); };
  public fromJson(jsonString: String): IRessource { return this.ressource.fromJson(jsonString); };
}
export class RessourcePlayerTransferImportFieldAge implements IRessource {
  private readonly ressource: IRessource;
  constructor() { this.ressource = new Ressource("playerTransfer_import_field_age"); }
  public key(): String { return this.ressource.key() };
  public value(): String { return this.ressource.value(); };
  public fromJson(jsonString: String): IRessource { return this.ressource.fromJson(jsonString); };
}
export class RessourcePlayerTransferImportFieldStrength implements IRessource {
  private readonly ressource: IRessource;
  constructor() { this.ressource = new Ressource("playerTransfer_import_field_strength"); }
  public key(): String { return this.ressource.key() };
  public value(): String { return this.ressource.value(); };
  public fromJson(jsonString: String): IRessource { return this.ressource.fromJson(jsonString); };
}
export class RessourcePlayerTransferImportFieldPrice implements IRessource {
  private readonly ressource: IRessource;
  constructor() { this.ressource = new Ressource("playerTransfer_import_field_price"); }
  public key(): String { return this.ressource.key() };
  public value(): String { return this.ressource.value(); };
  public fromJson(jsonString: String): IRessource { return this.ressource.fromJson(jsonString); };
}

export class RessourceCommonAppName extends Ressource { constructor() { super("common_appName"); } }
export class RessourceCommonButtonApply extends Ressource { constructor() { super("common_buttonApply"); } }
export class RessourceCommonButtonImport extends Ressource { constructor() { super("common_buttonImport"); } }
export class RessourceCommonSelectElement extends Ressource { constructor() { super("common_selectElement"); } }
export class RessourceCommonMatchday extends Ressource { constructor() { super("common_matchday"); } }
export class RessourceCommonMatchdays extends Ressource { constructor() { super("common_matchdays"); } }

export class RessourceCommonTableExtensionsHeaderAwp extends Ressource { constructor() { super("commonTableExtensions_headerAwp"); } }
export class RessourceCommonTableExtensionsHeaderAwpDiff extends Ressource { constructor() { super("commonTableExtensions_headerAwpDiff"); } }
export class RessourceCommonTableExtensionsHeaderNextStrength extends Ressource { constructor() { super("commonTableExtensions_headerNextStrength"); } }
export class RessourceCommonTableExtensionsHeaderTransferPriceCurrentStrength extends Ressource { constructor() { super("commonTableExtensions_header_transferPrice_currentStrength"); } }
export class RessourceCommonTableExtensionsHeaderTransferPriceNextStrength extends Ressource { constructor() { super("commonTableExtensions_header_transferPrice_nextStrength"); } }
export class RessourceCommonTableExtensionsHeaderTransferPriceNextAgeCurrentStrength extends Ressource { constructor() { super("commonTableExtensions_header_transferPrice_nextAge_currentStrength"); } }
export class RessourceCommonTableExtensionsHeaderTransferPriceNextAgeNextStrength extends Ressource { constructor() { super("commonTableExtensions_header_transferPrice_nextAge_nextStrength"); } }

export class RessourceSettingsPageApplicationHeader extends Ressource { constructor() { super("settings_application_header"); } }

export class RessourceSettingsPageLoggerHeading extends Ressource { constructor() { super("loggerSettingHeading"); } }
export class RessourceSettingsPageLoggerIntro extends Ressource { constructor() { super("loggerSettingIntro"); } }

export class RessourceStadium extends Ressource { constructor() { super("stadium"); } }
export class RessourceStadiumHeading extends Ressource { constructor() { super("stadiumSettings"); } }
export class RessourceStadiumLeague extends Ressource { constructor() { super("league"); } }
export class RessourceStadiumFriendly extends Ressource { constructor() { super("friendly"); } }
export class RessourceStadiumCup extends Ressource { constructor() { super("cup"); } }
export class RessourceStadiumCurrencySign extends Ressource { constructor() { super("currencySign"); } }
export class RessourceStadiumAddOverallPrices extends Ressource { constructor() { super("addOverallPrices"); } }
export class RessourceStadiumOverallPriceLeague extends Ressource { constructor() { super("generalPriceLeague"); } }
export class RessourceStadiumOverallPriceFriendly extends Ressource { constructor() { super("generalPriceFriendly"); } }
export class RessourceStadiumOverallPriceCup extends Ressource { constructor() { super("generalPriceCup"); } }
export class RessourceStadiumAddOffsetPrices extends Ressource { constructor() { super("addOffsetPrices"); } }
export class RessourceStadiumOffset extends Ressource { constructor() { super("offset"); } }
export class RessourceStadiumOffsetPriceLeague extends Ressource { constructor() { super("offsetPriceLeague"); } }
export class RessourceStadiumOffsetPriceFriendly extends Ressource { constructor() { super("offsetPriceFriendly"); } }
export class RessourceStadiumOffsetPriceCup extends Ressource { constructor() { super("offsetPriceCup"); } }

export class RessourceCommonSettingsAddColumnAwp extends Ressource { constructor() { super("commonSettings_addColumnAwp"); } }
export class RessourceCommonSettingsAddColumnAwpDiff extends Ressource { constructor() { super("commonSettings_addColumnAwpDiff"); } }
export class RessourceCommonSettingsAddColumnsTransferPricesIntroduction extends Ressource { constructor() { super("commonSettings_addColumns_transferPrices_introduction") } }
export class RessourceCommonSettingsAddColumnNextStrength extends Ressource { constructor() { super("commonSettings_addColumnNextStrength"); } }
export class RessourceCommonSettingsExtendColumnStrength extends Ressource { constructor() { super("commonSettings_extendColumnStrength"); } }
export class RessourceCommonSettingsAddColumnTransferPriceCurrentStrength extends Ressource { constructor() { super("commonSettings_extendColumn_transferPrice_currentStrength"); } }
export class RessourceCommonSettingsAddColumnTransferPriceNextStrength extends Ressource { constructor() { super("commonSettings_extendColumn_transferPrice_nextStrength"); } }
export class RessourceCommonSettingsAddColumnTransferPriceNextAgeCurrentStrength extends Ressource { constructor() { super("commonSettings_extendColumn_transferPrice_nextAge_currentStrength"); } }
export class RessourceCommonSettingsAddColumnTransferPriceNextAgeNextStrength extends Ressource { constructor() { super("commonSettings_extendColumn_transferPrice_nextAge_nextStrength"); } }

export class RessourceTeamTableSettingsMenu extends Ressource { constructor() { super("teamTableSettings_menu"); } }
export class RessourceTeamTableSettingsHeader extends Ressource { constructor() { super("teamTableSettings_header"); } }

export class RessourceTransferMarketOfferTableSettingsMenu extends Ressource { constructor() { super("transferMarketOfferTableSettings_menu"); } }
export class RessourceTransferMarketOfferTableSettingsHeader extends Ressource { constructor() { super("transferMarketOfferTableSettings_header"); } }

export class RessourceTransferMarketSellingSettingsMenu extends Ressource { constructor() { super("transferMarketSellingSettings_menu"); } }
export class RessourceTransferMarketSellingSettingsHeader extends Ressource { constructor() { super("transferMarketSellingSettings_header"); } }
export class RessourceTransferMarketSellingSettingsChangeDuration extends Ressource { constructor() { super("transferMarketSellingSettings_changeDuration"); } }

export class RessourceTransferMarketProfessionalsTableSettingsMenu extends Ressource { constructor() { super("transferMarketProfessionalsTableSettings_menu"); } }
export class RessourceTransferMarketProfessionalsTableSettingsHeader extends Ressource { constructor() { super("transferMarketProfessionalsTableSettings_header"); } }
export class RessourceSettingsPageTransferMarketProfessionalsImportTransfersHeader extends Ressource { constructor() { super("setting_page_transfer_market_professionals_importTransfers_header"); } }
export class RessourceSettingsPageTransferMarketProfessionalsImportTransfersDescription extends Ressource { constructor() { super("setting_page_transfer_market_professionals_importTransfers_description"); } }
export class RessourceSettingsPageTransferMarketProfessionalsImportTransfers extends Ressource { constructor() { super("setting_page_transfer_market_professionals_importTransfers"); } }
export class RessourceSettingsPageTransferMarketProfessionalsWarningSlidersAreNotSupported extends Ressource { constructor() { super("setting_page_transfer_market_professionals_warning_slidersAreNotSupported"); } }

export class RessourceTransferMarketAmateurTableSettingsMenu extends Ressource { constructor() { super("transferMarketAmateurTableSettings_menu"); } }
export class RessourceTransferMarketAmateurTableSettingsHeader extends Ressource { constructor() { super("transferMarketAmateurTableSettings_header"); } }

export class RessourceStrengthAwpLimitsSettingsMenu extends Ressource { constructor() { super("strengthAwpLimitsSettings_menu"); } }
export class RessourceStrengthAwpLimitsSettingsHeader extends Ressource { constructor() { super("strengthAwpLimitsSettings_header"); } }
export class RessourceStrengthAwpLimitsSettingsIntro extends Ressource { constructor() { super("strengthAwpLimitsSettings_intro"); } }
export class RessourceStrengthAwpLimitsSettingsImportLabel extends Ressource { constructor() { super("strengthAwpLimitsSettings_importLabel"); } }
export class RessourceStrengthAwpLimitsSettingsTableHeaderStrength extends Ressource { constructor() { super("strengthAwpLimitsSettings_tableHeaderStrength"); } }
export class RessourceStrengthAwpLimitsSettingsTableHeaderAwps extends Ressource { constructor() { super("strengthAwpLimitsSettings_tableHeaderAwps"); } }

export class RessourcePlayerInformationWebPageElementExtendContract extends Ressource { constructor() { super("playerInformationWebPage_elementExtendContract"); } }

export class RessourcePlayerTransferMarketPageElementCloseWindow extends Ressource { constructor() { super("playerTransferMarketPage_elementCloseWindow"); } }
export class RessourcePlayerTransferMarketPageElementBack extends Ressource { constructor() { super("playerTransferMarketPage_elementBack"); } }

export class RessourcePlayerTransferMarketPlayerPageElementCloseWindow extends Ressource { constructor() { super("playerTransferMarketPlayerPage_elementCloseWindow"); } }
export class RessourcePlayerTransferMarketPlayerPageElementBack extends Ressource { constructor() { super("playerTransferMarketPlayerPage_elementBack"); } }

export class RessourceUserInteractionImportPlayerTransfersQuestionStartImport extends Ressource { constructor() { super("userInteractionImportPlayerTransfers_questionStartImport"); } }
export class RessourceUserInteractionImportPlayerTransfersImportingStarted extends Ressource { constructor() { super("userInteractionImportPlayerTransfers_importingStarted"); } }
export class RessourceUserInteractionImportPlayerTransfersImportingFinished extends Ressource { constructor() { super("userInteractionImportPlayerTransfers_importingFinished"); } }
