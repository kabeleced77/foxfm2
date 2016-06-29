/// <reference path="../../../allReferences.ts" />
/// <reference path="../models/list-item.ts" />
/// <reference path="../directives/settingsDirective.ts" />

module TypeScriptAndAngular.Controllers {

    export class SettingsController {
        name: string;
        stadiumSettings: StadiumSettingsUi;
        categories: string[];

        settingsManager: SettingsManagerInterface;
        logger: LoggerInterface;
        
        tabs = [
            { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
            { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
        ];
        static $inject = [
            "$scope"
        ];
        constructor(isolateScope: Directives.ISettingsScope) {
            this.name = isolateScope.name;
            this.stadiumSettings = new StadiumSettingsUi();

            this.logger = new Logger();
            this.logger.activateModuleForLogging("all");
            this.logger.setLogLevel(LogLevel.All);
            this.settingsManager = new SettingsManager(this.logger);

            this.getCategories(isolateScope);
            this.getSettingsByCategory(isolateScope);
        }

        getCategories = (isolateScope: Directives.ISettingsScope) => {
            this.settingsManager.getCategoriesAsync()
                .then((cat: string[]) => {
                    this.categories = cat;
                    isolateScope.$apply();
                });
        }

        getSettingsByCategory = (isolateScope: Directives.ISettingsScope) => {
            this.settingsManager.getSettingsByCategoryAsync("stadium").then((settings: StadiumSettings) => {
                this.logger.debug("TSDemoController", "Settings of stadium: " + JSON.stringify(settings));
                // Object.keys(settings).forEach(element => {
                // this.logger.debug("TSDemoController", "Setting of stadium: " + element + ":: type: " + typeof(settings[element]) + ":: " + chrome.i18n.getMessage(element));
                this.stadiumSettings.addOverallPrices = settings.active;
                this.stadiumSettings.addOverallPrices = true;
                isolateScope.$apply();
                // });
            });
        }
    }
}