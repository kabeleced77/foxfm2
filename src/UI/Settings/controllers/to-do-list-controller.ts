/// <reference path="../../../allReferences.ts" />

module TypeScriptAndAngular.Controllers {
    
    export class ToDoListController {
        name: string;
        listItems: ListItem[];

        newItemName: string;

        settingsManager: SettingsManagerInterface;
        logger: LoggerInterface;

        settings: Object;
        categories: string[];

        static $inject = [
            "$scope"
        ];
        constructor(isolateScope: Directives.IToDoListScope) {
            this.name = isolateScope.name;
            this.listItems = [];

            this.logger = new Logger();
            this.logger.activateModuleForLogging("all");
            this.logger.setLogLevel(LogLevel.All);
            this.settingsManager = new SettingsManager(this.logger);
            
            this.getCategories(isolateScope);
            this.getSettingsByCategory();
        }

        save() {
            if (this.newItemName && this.newItemName.length > 0) {
                var newItem = new ListItem(this.newItemName);
                this.listItems.push(newItem);

                this.newItemName = null;
            }
        }

        toggle(listItem: ListItem): boolean {
            listItem.isComplete = !listItem.isComplete;
            return listItem.isComplete;
        }


        getCategories = (isolateScope:Directives.IToDoListScope) => {
            // this.settingsRepository.getCategoriesAsync()
            this.settingsManager.getCategoriesAsync()
                .then((cat: string[]) => {
                    this.categories = cat;
                    isolateScope.$apply();
                });
        }

        getSettingsByCategory = () => {
            this.settingsManager.getSettingsByCategoryAsync("stadium").then((settings: Object) => {
                this.logger.debug("TSDemoController", "Settings of stadium: " + JSON.stringify(settings));
            });
        }
    }
}