/// <reference path="allReferences.ts" />

class foxfmApp {
	public appSettings: AppSettings;
    
	private log: LoggerInterface;
	private thisModule: string = "foxfmApp";
	private stadiumManagerUi: StadiumManagerUi;
	private settingsManager: SettingsManagerInterface;

	constructor() {
		this.log = new Logger();
		this.log.setLogLevel(LogLevel.All);
		this.log.activateModuleForLogging("all");
		this.settingsManager = new SettingsManager(this.log);
		this.stadiumManagerUi = new StadiumManagerUi(this.log, this.settingsManager);
	}

	public main(): void {
		this.info("S t a r t e d");
		this.settingsManager.loadAppSettingsMessaging((as: AppSettings) => {
			this.debug("App settings loaded: " + JSON.stringify(this.settingsManager.appSettings));
			this.run();
		});
	}

	private run(): void {
		this.stadiumManagerUi.showOverallPricingControlElements();
	}

	private info(msg: string): void {
		this.log.info(this.thisModule, msg);
	}
	private debug(msg: string): void {
		this.log.debug(this.thisModule, msg);
	}
}

var app = new foxfmApp();
app.main();