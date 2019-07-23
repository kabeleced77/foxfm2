import { Router, RouterConfiguration } from 'aurelia-router'
import { RessourceStadium, RessourceCommonAppName, RessourceTeamTableSettingsMenu, RessourceTransferMarketSellingSettingsMenu, RessourceTransferMarketAmateurTableSettingsMenu, RessourceTransferMarketProfessionalsTableSettingsMenu, RessourceTransferMarketOfferTableSettingsMenu, RessourceStrengthAwpLimitsSettingsMenu } from "../Common/Ressource"

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
    this.ressourceSettingsPageAddonName = new RessourceCommonAppName().value().valueOf();
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
      { route: ['', 'SettingsPage/application/application'], name: 'application', moduleId: 'SettingsPage/application/application', nav: false, title: 'Welcome' },
      { route: 'SettingsPage/stadium/settings-stadium', name: 'settings-stadium', moduleId: 'SettingsPage/stadium/settings-stadium', nav: true, title: this.ressourceStadium },
      { route: 'SettingsPage/logging/settings-logging', name: 'settings-logging', moduleId: 'SettingsPage/logging/settings-logging', nav: false, title: "Logging" },
      { route: 'SettingsPage/team-table/settings-teamtable', name: 'settings-teamtable', moduleId: 'SettingsPage/team-table/settings-teamtable', nav: true, title: this.ressourceTeamTable },
      { route: 'SettingsPage/tm-selling/settings-selling', name: 'settings-tm-selling', moduleId: 'SettingsPage/tm-selling/settings-tm-selling', nav: true, title: this.ressourceTmSelling },
      { route: 'SettingsPage/tm-offer-table/settings-tm-offer-table', name: 'settings-tm-offer-table', moduleId: 'SettingsPage/tm-offer-table/settings-tm-offer-table', nav: true, title: this.ressourceTmOffers },
      { route: 'SettingsPage/tm-amateur-table/settings-tm-amateur-table', name: 'settings-tm-amateur-table', moduleId: 'SettingsPage/tm-amateur-table/settings-tm-amateur-table', nav: true, title: this.ressourceTmAmateurs },
      { route: 'SettingsPage/tm-pro-table/settings-tm-pro-table', name: 'settings-tm-pro-table', moduleId: 'SettingsPage/tm-pro-table/settings-tm-pro-table', nav: true, title: this.ressourceTmProfessionals },
      { route: 'SettingsPage/strength-awp-limits/settings-strength-awp-limits', name: 'settings-strength-awp-limits', moduleId: 'SettingsPage/strength-awp-limits/settings-strength-awp-limits', nav: true, title: this.ressourceStrengthAwpLimits },
    ]);

    this.router = router;
  }
}
