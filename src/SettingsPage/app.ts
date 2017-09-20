import { Router, RouterConfiguration } from 'aurelia-router'
import { RessourceStadium } from "../Common/Ressource"
import { RessourceSettingsPageAddonName, RessourceTeamTableSettingsMenu, RessourceTransferMarketOfferTableSettingsMenu } from "../Common/Ressource"

export class App {
  router: Router;
  ressourceSettingsPageAddonName: string;
  ressourceStadium: string;
  ressourceTeamTable: string;
  ressourceTMOffers: string;
  ressourceTMPros: string;
  ressourceTMAmateur: string;

  constructor() {
    this.ressourceSettingsPageAddonName = new RessourceSettingsPageAddonName().value().valueOf();
    this.ressourceStadium = new RessourceStadium().value().valueOf();
    this.ressourceTeamTable = new RessourceTeamTableSettingsMenu().value().valueOf();
    this.ressourceTMOffers = new RessourceTransferMarketOfferTableSettingsMenu().value().valueOf();
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = this.ressourceSettingsPageAddonName;
    config.map([
      { route: ['', 'SettingsPage/welcome'], name: 'welcome', moduleId: 'SettingsPage/welcome', nav: false, title: 'Welcome' },
      { route: 'SettingsPage/settings-stadium', name: 'settings-stadium', moduleId: 'SettingsPage/settings-stadium', nav: true, title: this.ressourceStadium },
      { route: 'SettingsPage/settings-logging', name: 'settings-logging', moduleId: 'SettingsPage/settings-logging', nav: true, title: "Logging" },
      { route: 'SettingsPage/settings-teamtable', name: 'settings-teamtable', moduleId: 'SettingsPage/settings-teamtable', nav: true, title: this.ressourceTeamTable },
      { route: 'SettingsPage/settings-tm-offer-table', name: 'settings-tm-offer-table', moduleId: 'SettingsPage/settings-tm-offer-table', nav: true, title: this.ressourceTMOffers },
      { route: 'SettingsPage/settings-tm-amateur-table', name: 'settings-tm-amateur-table', moduleId: 'SettingsPage/settings-tm-amateur-table', nav: true, title: "TM Amateurs" },
      { route: 'SettingsPage/settings-tm-pro-table', name: 'settings-tm-pro-table', moduleId: 'SettingsPage/settings-tm-pro-table', nav: true, title: "TM Professionals" }
    ]);

    this.router = router;
  }
}
