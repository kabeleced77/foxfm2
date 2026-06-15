import browser from "webextension-polyfill";
import { FoxfmIndexedDb } from "../Common/IndexedDb/FoxfmIndexedDb";
import { EasyLogger } from "../Common/Logger/EasyLogger";
import { ILogger, Logger } from "../Common/Logger/Logger";
import { ILogLevel, LogLevelError } from "../Common/Logger/LogLevel";
import { RegisteredLoggingModule } from "../Common/Logger/RegisteredLoggingModule";
import { MessagingBackgroundScript } from "../Common/Messaging/MessagingBackgroundScript";
import { IRessource, Ressource } from "../Common/Ressource";
import { IRegisteredLoggingModules, RegisteredLoggingModules } from "../Common/Logger/RegisteredLoggingModules";
import { SettingNameApplicationLogLevel } from "../Common/Settings/SettingNameApplicationLogLevel";
import { SettingNameLoggingModules } from "../Common/Settings/SettingNameLoggingModules";
import { Mutex } from "../Common/Toolkit/Mutex";
import { StorageLocal } from "../Common/Toolkit/StorageLocal";
import { StorageLocalSync } from "../Common/Toolkit/StorageLocalSync";

export class FoxfmBackground {
  private log: ILogger;
  private thisModule: string = "FoxfmBackground";
  private ressourceSettings: IRessource;

  constructor(
    private indexedDb: FoxfmIndexedDb,
  ) {
    /****************************************************
     * Create logger used within background script
     */
    this.log = new Logger(
      new StorageLocal<ILogLevel>(new SettingNameApplicationLogLevel(), new LogLevelError()),
      new StorageLocalSync<IRegisteredLoggingModules>(
        new Mutex<IRegisteredLoggingModules>(),
        new StorageLocal<IRegisteredLoggingModules>(
          new SettingNameLoggingModules(),
          new RegisteredLoggingModules([]),
        ),
      ),
    );
    this.log.registerModuleForLogging(
      new RegisteredLoggingModule(this.thisModule, new LogLevelError()),
    );
    this.ressourceSettings = new Ressource(
      "backgroundPageContextMenuAddonSettings",
    );
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
            new LogLevelError()
          ),
        ),
      ).connect();
      // TODO: remove task feature entirely
      //   await this.tasks.run();
    } catch (e: unknown) {
      this.log.error(this.thisModule, `Error in background script: ${(e as Error).message}`);
    }
  }

  private createContextMenu() {
    browser.contextMenus.create({
      id: "foxfm-settings",
      title: this.ressourceSettings.value().toString(),
      contexts: ["page", "frame"],
    });
    browser.contextMenus.onClicked.addListener(() => {
      browser.tabs.create({ url: "src/SettingsPage/settings.html" });
    });
  }
}
