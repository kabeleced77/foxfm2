export interface IRessource {
  key(): String;
  value(): String;
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
  public value(): String {
    return chrome.i18n.getMessage(this.ressourceKey.valueOf());
  }
  public fromJson(jsonString: String): IRessource {
    return new Ressource(jsonString["ressourceKey"]);
  }
}

export class RessourceCommonButtonApply extends Ressource { constructor() { super("common_buttonApply"); } }
export class RessourceCommonButtonImport extends Ressource { constructor() { super("common_buttonImport"); } }
export class RessourceCommonMatchday extends Ressource { constructor() { super("common_matchday"); } }
export class RessourceCommonMatchdays extends Ressource { constructor() { super("common_matchdays"); } }

export class RessourceCommonTableExtensionsHeaderAwp extends Ressource { constructor() { super("commonTableExtensions_headerAwp"); } }
export class RessourceCommonTableExtensionsHeaderAwpDiff extends Ressource { constructor() { super("commonTableExtensions_headerAwpDiff"); } }
export class RessourceCommonTableExtensionsHeaderNextStrength extends Ressource { constructor() { super("commonTableExtensions_headerNextStrength"); } }

export class RessourceSettingsPageAddonName extends Ressource { constructor() { super("addonName"); } }
export class RessourceSettingsPageIntro extends Ressource { constructor() { super("settingsIntro"); } }

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
export class RessourceCommonSettingsAddColumnNextStrength extends Ressource { constructor() { super("commonSettings_addColumnNextStrength"); } }
export class RessourceCommonSettingsExtendColumnStrength extends Ressource { constructor() { super("commonSettings_extendColumnStrength"); } }

export class RessourceTeamTableSettingsMenu extends Ressource { constructor() { super("teamTableSettings_menu"); } }
export class RessourceTeamTableSettingsHeader extends Ressource { constructor() { super("teamTableSettings_header"); } }

export class RessourceTransferMarketOfferTableSettingsMenu extends Ressource { constructor() { super("transferMarketOfferTableSettings_menu"); } }
export class RessourceTransferMarketOfferTableSettingsHeader extends Ressource { constructor() { super("transferMarketOfferTableSettings_header"); } }

export class RessourceTransferMarketSellingSettingsMenu extends Ressource { constructor() { super("transferMarketSellingSettings_menu"); } }
export class RessourceTransferMarketSellingSettingsHeader extends Ressource { constructor() { super("transferMarketSellingSettings_header"); } }
export class RessourceTransferMarketSellingImproveSellingProcessSettingsHeader extends Ressource { constructor() { super("transferMarketSellingImproveSellingProcessSettings_header"); } }
export class RessourceTransferMarketSellingChangeDuration extends Ressource { constructor() { super("transferMarketSellingSettings_changeDuration"); } }
export class RessourceTransferMarketSellingPlayerInformationPageSetFocus extends Ressource { constructor() { super("transferMarketSellingPlayerInformationPage_setFocus"); } }

export class RessourceTransferMarketProfessionalsTableSettingsMenu extends Ressource { constructor() { super("transferMarketProfessionalsTableSettings_menu"); } }
export class RessourceTransferMarketProfessionalsTableSettingsHeader extends Ressource { constructor() { super("transferMarketProfessionalsTableSettings_header"); } }

export class RessourceTransferMarketAmateurTableSettingsMenu extends Ressource { constructor() { super("transferMarketAmateurTableSettings_menu"); } }
export class RessourceTransferMarketAmateurTableSettingsHeader extends Ressource { constructor() { super("transferMarketAmateurTableSettings_header"); } }

export class RessourceStrengthAwpLimitsSettingsMenu extends Ressource { constructor() { super("strengthAwpLimitsSettings_menu"); } }
export class RessourceStrengthAwpLimitsSettingsHeader extends Ressource { constructor() { super("strengthAwpLimitsSettings_header"); } }
export class RessourceStrengthAwpLimitsSettingsIntro extends Ressource { constructor() { super("strengthAwpLimitsSettings_intro"); } }
export class RessourceStrengthAwpLimitsSettingsImportLabel extends Ressource { constructor() { super("strengthAwpLimitsSettings_importLabel"); } }
export class RessourceStrengthAwpLimitsSettingsTableHeaderStrength extends Ressource { constructor() { super("strengthAwpLimitsSettings_tableHeaderStrength"); } }
export class RessourceStrengthAwpLimitsSettingsTableHeaderAwps extends Ressource { constructor() { super("strengthAwpLimitsSettings_tableHeaderAwps"); } }

export class RessourcePlayerInformationWebPageElementTransferMarket extends Ressource { constructor() { super("playerInformationWebPage_elementTransferMarket"); } }
