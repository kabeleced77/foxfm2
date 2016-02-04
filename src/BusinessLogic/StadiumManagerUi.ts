/// <reference path="../CrossCutting/Logger/LoggerInterface.ts" />
/// <reference path="SettingsManager.ts" />

class StadiumManagerUi {
	private log: LoggerInterface;
	private settingsManager: SettingsManager;
	private thisModule: string;

	constructor(logger: LoggerInterface, settingsManager: SettingsManager) {
        this.thisModule = "StadiumManagerUi()";
		this.log = logger;
		this.settingsManager = settingsManager;
	}

	showOverallPricingControlElements(): void {
        this.log.info(this.thisModule, "started" + " adf");
    }

	test(): void {
		this.log.info(this.thisModule, "foxmApp.js loaded from: ");
		this.settingsManager.test();
	}
}