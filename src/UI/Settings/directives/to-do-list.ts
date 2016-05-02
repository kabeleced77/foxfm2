module TypeScriptAndAngular.Directives {
    export interface IToDoListScope extends ng.IScope {
        name: string
    }
 
    export function toDoList(): ng.IDirective {
         return {
            restrict: "E",
            scope: {
                name: "@"
            },
            controller: Controllers.ToDoListController,
            controllerAs: "vm",
            templateUrl: "./views/to-do-list.html",
            replace: true
        }
     }
}