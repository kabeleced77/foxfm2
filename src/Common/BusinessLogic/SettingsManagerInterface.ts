import {AppSettings} from "../CrossCutting/Settings/AppSettings"

"use strict";

export interface SettingsManagerInterface {
    appSettings: AppSettings;
    //	getSetting(key: string): any;
    saveAppSettingsMessaging(appSettings: AppSettings): void;
    loadAppSettingsMessaging(callback: (appSettings: AppSettings) => void): void;
    setAppSettingsAsync(): PromiseLike<AppSettings>;
    getOrSetAppSettingsAsync(): PromiseLike<AppSettings>;
    getCategoriesAsync(): PromiseLike<string[]>;
    getSettingsByCategoryAsync(category: string): PromiseLike<Object>;
}
