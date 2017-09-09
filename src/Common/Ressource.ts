export interface IRessource {
  key(): String;
  value(): String;
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
}

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

export class RessourceTeamTableSettingsHeader extends Ressource { constructor() { super("teamTableSettings_header"); } }
export class RessourceTeamTableSettingsExtendColumnStrength extends Ressource { constructor() { super("teamTableSettings_extendColumnStrength"); } }
export class RessourceTeamTableSettingsAddColumnAwpDiff extends Ressource { constructor() { super("teamTableSettings_addColumnAwpDiff"); } }
export class RessourceTeamTableSettingsAddColumnNextStrength extends Ressource { constructor() { super("teamTableSettings_addColumnNextStrength"); } }
