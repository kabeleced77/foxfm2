import {Router, RouterConfiguration} from 'aurelia-router'
import {autoinject} from 'aurelia-framework';
import {LogLevel, LoggerInterface} from '../Common/CrossCutting/Logger/LoggerInterface';
import {Logger} from '../Common/CrossCutting/Logger/Logger';

@autoinject
export class App {
  router: Router;

  constructor(logger: Logger) {
    logger.activateModuleForLogging("all");
    logger.setLogLevel(LogLevel.All);
  }
  
  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Foxfm';
    config.map([
      { route: ['', 'SettingsPage/welcome'], name: 'welcome',      moduleId: 'SettingsPage/welcome',      nav: true, title: 'Welcome' },
      { route: 'SettingsPage/users',         name: 'users',        moduleId: 'SettingsPage/users',        nav: true, title: 'Github Users' },
      { route: 'SettingsPage/child-router',  name: 'child-router', moduleId: 'SettingsPage/child-router', nav: true, title: 'Child Router' },
      { route: 'SettingsPage/settings-stadium',  name: 'settings-stadium', moduleId: 'SettingsPage/settings-stadium', nav: true, title: 'Stadium' }
    ]);

    this.router = router;
  }
}