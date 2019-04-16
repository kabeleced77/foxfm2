import { FoxfmIndexedDb } from '../Common/IndexedDb/FoxfmIndexedDb';
import { EasyLogger } from '../Common/Logger/EasyLogger';
import { ILogger } from '../Common/Logger/Logger';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { MessagingBackgroundScript } from '../Common/Messaging/MessagingBackgroundScript';
import { IRessource, Ressource } from '../Common/Ressource';
import { ITasks } from '../Common/Tasking/ITasks';

export class FoxfmBackground {
  private log: ILogger;
  private thisModule: string = "FoxfmBackground";
  private ressourceSettings: IRessource;

  constructor(
    private tasks: ITasks,
    private indexedDb: FoxfmIndexedDb,
    logger: ILogger,
  ) {

    this.log = logger;
    var loggingModule = new RegisteredLoggingModule(this.thisModule, new LogLevelError());
    this.log.registerModuleForLogging(loggingModule);
    this.ressourceSettings = new Ressource("backgroundPageContextMenuAddonSettings");
  }

  public async main(): Promise<void> {
    try {
      this.log.info(this.thisModule, "S t a r t e d");
      this.createContextMenu();
      new MessagingBackgroundScript(
        "",
        this.indexedDb,
        new EasyLogger(
          this.log,
          new RegisteredLoggingModule(
            "MessagingBackgroundScript",
            new LogLevelError())))
        .connect();
      // TODO: remove task feature entirely
      //   await this.tasks.run();
    }
    catch (e) {
      this.log.error(this.thisModule, `Error in background script: ${e.message}`);
    }
  }

  private createContextMenu() {
    chrome.contextMenus.create({ "title": this.ressourceSettings.value().toString(), "onclick": this.contextMenuSettingCallback });
  }

  private contextMenuSettingCallback() {
    chrome.tabs.create({ url: "settings.html" });
  }
}
