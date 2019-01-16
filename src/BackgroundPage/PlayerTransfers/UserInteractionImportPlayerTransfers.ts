import { FoxfmIndexedDb } from '../../Common/IndexedDb/FoxfmIndexedDb';
import { IEasyLogger } from '../../Common/Logger/EasyLogger';
import { IMatchday } from '../../Common/IMatchday';
import { ImportedPlayerTransfers } from './ImportedPlayerTransfers';
import { IUserInteractionImportPlayerTransfers } from './IUserInteractionImportPlayerTransfers';
import { RessourceUserInteractionImportPlayerTransfersQuestionStartImport, RessourceCommonAppName, RessourceUserInteractionImportPlayerTransfersImportingStarted, RessourceUserInteractionImportPlayerTransfersImportingFinished, IRessource } from '../../Common/Ressource';

export class UserInteractionImportPlayerTransfers implements IUserInteractionImportPlayerTransfers {
  private resourceAppName: string;
  private resourceQuestionStartImport: IRessource;
  private resourceImportingStarted: IRessource;
  private resourceImportingFinished: IRessource;

  constructor(
    private database: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) {
    this.resourceAppName = new RessourceCommonAppName().value().toString();
    this.resourceQuestionStartImport = new RessourceUserInteractionImportPlayerTransfersQuestionStartImport();
    this.resourceImportingStarted = new RessourceUserInteractionImportPlayerTransfersImportingStarted();
    this.resourceImportingFinished = new RessourceUserInteractionImportPlayerTransfersImportingFinished();
  }

  public async import(matchday: IMatchday): Promise<void> {
    const options = {
      "title": this.resourceAppName,
      "icon": chrome.extension.getURL("foxfm64.png"),
      "body": "",
      "tag": "notify-player-transfer-download"
      //      "image": chrome.extension.getURL("foxfm16.png"),
    };
    const season = await matchday.season();
    const day = await matchday.day();
    options.body = this.resourceQuestionStartImport.value(`${season}-${day}`).toString();
    const notification = new Notification(this.resourceAppName, options);
    notification.onclick = async () => {
      options.body = this.resourceImportingStarted.value(`${season}-${day}`).toString();
      new Notification("foxfm", options);
      await new ImportedPlayerTransfers(this.database, this.logger).import(matchday);
      options.body = this.resourceImportingFinished.value(`${season}-${day}`).toString();
      new Notification("foxfm", options);
    };
  }
}
