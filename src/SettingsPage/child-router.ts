import {Router, RouterConfiguration} from 'aurelia-router'

export class ChildRouter {
  heading = 'Child Router';
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: ['', 'SettingsPage/welcome'], name: 'welcome',       moduleId: 'SettingsPage/welcome',       nav: true, title: 'Welcome' },
      { route: 'SettingsPage/users',         name: 'users',         moduleId: 'SettingsPage/users',         nav: true, title: 'Github Users' },
      { route: 'SettingsPage/child-router',  name: 'child-router',  moduleId: 'SettingsPage/child-router',  nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
