import { Router, RouterConfiguration } from 'aurelia-router'
import { RessourceStadium } from "../Common/Ressource"
import { RessourceSettingsPageAddonName, RessourceTeamTableSettingsMenu, RessourceTransferMarketOfferTableSettingsMenu, RessourceTransferMarketProfessionalsTableSettingsMenu, RessourceTransferMarketAmateurTableSettingsMenu, RessourceStrengthAwpLimitsSettingsMenu, RessourceTransferMarketSellingSettingsMenu } from "../Common/Ressource"

export class App {
  router: Router;
  ressourceSettingsPageAddonName: string;
  ressourceStadium: string;
  ressourceTeamTable: string;
  ressourceTmSelling: string;
  ressourceTmAmateurs: string;
  ressourceTmProfessionals: string;
  ressourceTmOffers: string;
  ressourceTmAmateur: string;
  ressourceStrengthAwpLimits: string;

  constructor() {
    this.ressourceSettingsPageAddonName = new RessourceSettingsPageAddonName().value().valueOf();
    this.ressourceStadium = new RessourceStadium().value().valueOf();
    this.ressourceTeamTable = new RessourceTeamTableSettingsMenu().value().valueOf();
    this.ressourceTmSelling = new RessourceTransferMarketSellingSettingsMenu().value().valueOf();
    this.ressourceTmAmateurs = new RessourceTransferMarketAmateurTableSettingsMenu().value().valueOf();
    this.ressourceTmProfessionals = new RessourceTransferMarketProfessionalsTableSettingsMenu().value().valueOf();
    this.ressourceTmOffers = new RessourceTransferMarketOfferTableSettingsMenu().value().valueOf();
    this.ressourceStrengthAwpLimits = new RessourceStrengthAwpLimitsSettingsMenu().value().valueOf();
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = this.ressourceSettingsPageAddonName;
    config.map([
      { route: ['', 'SettingsPage/welcome'], name: 'welcome', moduleId: 'SettingsPage/welcome', nav: false, title: 'Welcome' },
      { route: 'SettingsPage/settings-stadium', name: 'settings-stadium', moduleId: 'SettingsPage/settings-stadium', nav: true, title: this.ressourceStadium },
      { route: 'SettingsPage/settings-logging', name: 'settings-logging', moduleId: 'SettingsPage/settings-logging', nav: false, title: "Logging" },
      { route: 'SettingsPage/settings-teamtable', name: 'settings-teamtable', moduleId: 'SettingsPage/settings-teamtable', nav: true, title: this.ressourceTeamTable },
      { route: 'SettingsPage/settings-selling', name: 'settings-tm-selling', moduleId: 'SettingsPage/settings-tm-selling', nav: true, title: this.ressourceTmSelling },
      { route: 'SettingsPage/settings-tm-offer-table', name: 'settings-tm-offer-table', moduleId: 'SettingsPage/settings-tm-offer-table', nav: true, title: this.ressourceTmOffers },
      { route: 'SettingsPage/settings-tm-amateur-table', name: 'settings-tm-amateur-table', moduleId: 'SettingsPage/settings-tm-amateur-table', nav: true, title: this.ressourceTmAmateurs },
      { route: 'SettingsPage/settings-tm-pro-table', name: 'settings-tm-pro-table', moduleId: 'SettingsPage/settings-tm-pro-table', nav: true, title: this.ressourceTmProfessionals },
      { route: 'SettingsPage/settings-strength-awp-limits', name: 'settings-strength-awp-limits', moduleId: 'SettingsPage/settings-strength-awp-limits', nav: true, title: this.ressourceStrengthAwpLimits },
    ]);

    this.router = router;
  }
}
