module TypeScriptAndAngular {
    export class ListItem {
        constructor(
            public name: string,
            public isComplete: boolean = false) {
        }
    }
    
    export class StadiumSettingsUi {
        public addOverallPrices: boolean;
    }
} 