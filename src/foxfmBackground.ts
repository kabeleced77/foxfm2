/// <reference path="_all.ts" />

class foxfmBackground {
    private log: LoggerInterface;
    private settingsRepository: SettingsRepositoryInterface;
    private thisModule: string = "foxfmBackground";

    constructor() {
        this.log = new Logger();
        this.log.setLogLevel(LogLevel.All);
        this.log.activateModuleForLogging("all");
        this.settingsRepository = new SettingsRepository(this.log);
    }

    main(): void {
        this.log.debug(this.thisModule, "S t a r t e d");
        this.createContextMenu();
    }

    private createContextMenu() {
        chrome.contextMenus.create({ "title": "foxfm - Options", "onclick": this.contextMenuSettingCallback });
    }

    private contextMenuSettingCallback(info: any, tab: any) {
        chrome.tabs.create({ url: "UI/Settings/index.html" });
    }
}

var foxfmBckgrnd = new foxfmBackground();
foxfmBckgrnd.main();