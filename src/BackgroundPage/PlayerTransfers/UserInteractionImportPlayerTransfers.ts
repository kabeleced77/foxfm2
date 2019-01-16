import { FoxfmIndexedDb } from '../../Common/IndexedDb/FoxfmIndexedDb';
import { IEasyLogger } from '../../Common/Logger/EasyLogger';
import { IMatchday } from '../../Common/IMatchday';
import { ImportedPlayerTransfers } from './ImportedPlayerTransfers';
import { IUserInteractionImportPlayerTransfers } from './IUserInteractionImportPlayerTransfers';

export class UserInteractionImportPlayerTransfers implements IUserInteractionImportPlayerTransfers {
  constructor(
    private database: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) { }

  public import(matchday: IMatchday): void {
    const options = {
      "icon": chrome.extension.getURL("foxfm64.png"),
      "body": "",
      "tag": "notify-player-transfer-download"
      //      "image": chrome.extension.getURL("foxfm16.png"),
    };
    options.body = "Import player transfers of current season (click here)";
    const notification = new Notification("foxfm", options);
    notification.onclick = async () => {
      const season = await matchday.season();
      const day = await matchday.day();
      options.body = `Importing player transfers of ${season}-${day}...starting`;
      new Notification("foxfm", options);
      await new ImportedPlayerTransfers(this.database, this.logger).import(matchday);
      options.body = `Importing player transfers of ${season}-${day}...finished`;
      new Notification("foxfm", options);
    };
  }
}
