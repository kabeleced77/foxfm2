import 'bootstrap';
import {Aurelia} from 'aurelia-framework';
import {SettingsManager} from '../../Common/BusinessLogic/SettingsManager';
import {LogLevel, LoggerInterface} from '../../Common/CrossCutting/Logger/LoggerInterface';
import {Logger} from '../../Common/CrossCutting/Logger/Logger';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  // aurelia.container.registerTransient("SettingsManagerInterface", SettingsManager);
  // aurelia.container.registerSingleton("Logger", Logger);

  //Uncomment the line below to enable animation.
  //aurelia.use.plugin('aurelia-animator-css');

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());
}
