/// <reference path="CrossCutting/Logger/LoggerInterface.ts" />
/// <reference path="CrossCutting/Logger/Logger.ts" />
/// <reference path="BusinessLogic/StadiumManagerUi.ts" />
/// <reference path="BusinessLogic/SettingsManager.ts" />

class foxfmApp {
	private log: LoggerInterface;
	private stadiumManagerUi: StadiumManagerUi;
	private settingsManager: SettingsManager;

	constructor() {
		this.log = new Logger();
		this.log.setLogLevel(LogLevel.All);
		this.log.activateModuleForLogging("all");
		this.settingsManager = new SettingsManager(this.log);
		this.stadiumManagerUi = new StadiumManagerUi(this.log, this.settingsManager);
	}

	main(): void {
		this.stadiumManagerUi.test();
	}

}
var foxfm = new foxfmApp();
foxfm.main();