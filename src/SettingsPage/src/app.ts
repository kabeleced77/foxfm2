import {Router, RouterConfiguration} from 'aurelia-router'
import {autoinject} from 'aurelia-framework';
import {LogLevel, LoggerInterface} from '../../Common/CrossCutting/Logger/LoggerInterface';
import {Logger} from '../../Common/CrossCutting/Logger/Logger';

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
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' },
      { route: 'settings-stadium',  name: 'settings-stadium', moduleId: 'settings-stadium', nav: true, title: 'Stadium' }
    ]);

    this.router = router;
  }
}
