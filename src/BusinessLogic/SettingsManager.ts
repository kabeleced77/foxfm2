/// <reference path="../CrossCutting/Logger/LoggerInterface.ts" />
/// <reference path="../Typings/tsd.d.ts" />

class SettingsManager {
	private log: LoggerInterface;
	private thisModule: string;
	private value: any;

	constructor(logger: LoggerInterface) {
		this.log = logger;
        this.thisModule = "SettingsManager()";
	}

	test(): void {
		this.log.info(this.thisModule, "TEST...1");
		chrome.storage.local.get({
			favoriteColor: 'red',
			likesColor: true
		}, function(items: any) {
			this.log.info(this.thisModule, "TEST...fav colour: " + items.favoriteColor);
			this.log.info(this.thisModule, "TEST...likes colour: " + items.likesColor);
			this.callbackGetValue(items);
		});		
	}

	callbackGetValue(value:any): void {
		this.value = value;
	}
}