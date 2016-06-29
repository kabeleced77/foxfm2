module TypeScriptAndAngular.Directives {
    export interface ISettingsScope extends ng.IScope {
        name: string
    }

    export function settings(): ng.IDirective {
        return {
            restrict: "E",
            scope: {
                name: "@"
            },
            controller: Controllers.SettingsController,
            controllerAs: "settings",
            templateUrl: "./views/settings.html",
            replace: true
        }
    }
}