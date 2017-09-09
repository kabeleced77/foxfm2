import { Router, RouterConfiguration } from 'aurelia-router'
import { RessourceStadium } from "../Common/Ressource"
import { RessourceSettingsPageAddonName } from "../Common/Ressource"

export class App {
  router: Router;
  ressourceStadium: string;
  ressourceSettingsPageAddonName: string;

  constructor() {
    this.ressourceStadium = new RessourceStadium().value().valueOf();
    this.ressourceSettingsPageAddonName = new RessourceSettingsPageAddonName().value().valueOf();
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = this.ressourceSettingsPageAddonName;
    config.map([
      { route: ['', 'SettingsPage/welcome'], name: 'welcome', moduleId: 'SettingsPage/welcome', nav: false, title: 'Welcome' },
      { route: 'SettingsPage/settings-stadium', name: 'settings-stadium', moduleId: 'SettingsPage/settings-stadium', nav: true, title: this.ressourceStadium },
      { route: 'SettingsPage/settings-logging', name: 'settings-logging', moduleId: 'SettingsPage/settings-logging', nav: true, title: "Logging" },
      { route: 'SettingsPage/settings-teamtable', name: 'settings-teamtable', moduleId: 'SettingsPage/settings-teamtable', nav: true, title: "Team" }
    ]);

    this.router = router;
  }
}
