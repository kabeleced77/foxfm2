"use strict";

interface SettingsManagerInterface {
    //	getSetting(key: string): any;
    saveAppSettingsMessaging(appSettings: AppSettings): void;
    loadAppSettingsMessaging(callback: (appSettings: AppSettings) => void): void;

    getAppSettingsAsync(): PromiseLike<AppSettings>;
    getCategoriesAsync(): PromiseLike<string[]>;
}
