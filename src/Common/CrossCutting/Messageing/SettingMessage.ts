import {AppSettings} from "../Settings/AppSettings"

export class SettingMessage {
	public settingKey: string;
	public settingAction: SettingAction;
	public appSettings: AppSettings;
}	

export enum SettingAction { Load, Save };
