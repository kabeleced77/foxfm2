import { FoxfmIndexedDb } from '../../Common/IndexedDb/FoxfmIndexedDb';
import { IEasyLogger } from '../../Common/Logger/EasyLogger';
import { IMatchday } from '../../Common/IMatchday';
import { ImportedPlayerTransfers } from './ImportedPlayerTransfers';
import { IUserInteractionImportPlayerTransfers } from './IUserInteractionImportPlayerTransfers';
import { RessourceUserInteractionImportPlayerTransfersQuestionStartImport, RessourceCommonAppName, RessourceUserInteractionImportPlayerTransfersImportingStarted, RessourceUserInteractionImportPlayerTransfersImportingFinished, IRessource } from '../../Common/Ressource';
import { ImportedTransfersOfMatchdaysIDb } from '../../Common/IndexedDb/ImportedTransfersOfMatchdaysIDb';
import { IMatchdays } from '../../Common/IMatchdays';
import { IImportedTransfersOfMatchdays } from '../../Common/IImportedTransfersOfMatchdays';
import { MatchdaysIDb } from '../../Common/IndexedDb/MatchdaysIDb';

/**
 * Import all player transfers of a matchday and previous ones of current season:
 * 1. import player transfers of matchday (start with current one)
 * 2. check if matchday actually exists in database -> add  if not (can happen when transfers shall be imported of a day where no login has happened)
 * 3. check if transfers have not been imported yet -> proceed if not imported yet
 * 4. show notification to user asking to start (click on notification) import of next matchday in list 
 * 5. if user clicked on notification, then start import of transfers
 * 6. start at 1.) for previous matchday until beginning of season (i.e. matchday 0)
 */
export class UserInteractionImportPlayerTransfers implements IUserInteractionImportPlayerTransfers {
  private matchdaysIDb: IMatchdays;
  private importedTransfersOfMatchdaysIDb: IImportedTransfersOfMatchdays;

  private resourceAppName: string;
  private resourceQuestionStartImport: IRessource;
  private resourceImportingStarted: IRessource;
  private resourceImportingFinished: IRessource;

  constructor(
    private database: FoxfmIndexedDb,
    private logger: IEasyLogger,
  ) {
    this.matchdaysIDb = new MatchdaysIDb(this.database, this.logger);
    this.importedTransfersOfMatchdaysIDb = new ImportedTransfersOfMatchdaysIDb(this.database, this.logger);

    this.resourceAppName = new RessourceCommonAppName().value().toString();
    this.resourceQuestionStartImport = new RessourceUserInteractionImportPlayerTransfersQuestionStartImport();
    this.resourceImportingStarted = new RessourceUserInteractionImportPlayerTransfersImportingStarted();
    this.resourceImportingFinished = new RessourceUserInteractionImportPlayerTransfersImportingFinished();
  }

  public async import(
    matchday: IMatchday,
  ): Promise<void> {
    this.logger.info(`matchday ${await matchday.season()}-${await matchday.day()}@${await (await matchday.gameServer()).uri()}: base matchday for player transfer import`);

    await this.importTransfers(matchday);
  }

  private async importTransfers(
    matchday: IMatchday,
  ): Promise<void> {

    const season = await matchday.season();
    const day = await matchday.day();
    const gameServerUri = await (await matchday.gameServer()).uri();

    matchday = await this.addMatchday(matchday, season, day, gameServerUri);

    const notImportedYet = !(await this.importedTransfersOfMatchdaysIDb.imported(matchday));

    if (notImportedYet) {
      this.logger.info(`matchday ${season}-${day}@${gameServerUri}: start player transfer import`);

      const options = {
        "title": this.resourceAppName,
        "icon": chrome.extension.getURL("foxfm64.png"),
        "body": "",
        "tag": `notify-player-transfer-download-${season}-${day}`
        //      "image": chrome.extension.getURL("foxfm16.png"),
      };

      options.body = this.resourceQuestionStartImport.value(`${season}-${day}`).toString();
      const notification = new Notification(this.resourceAppName, options);
      notification.onclick = async () => {
        this.logger.info(`user started download of transfers (clicked on notification) of ${season}-${day}`);
        await this.importOnNotificationClick(options, season, day, matchday);
        await this.importNextMatchday(day, gameServerUri, season);
      };
    } else {
      this.logger.info(`matchday ${season}-${day}@${gameServerUri}: player transfers already imported - nothing will be done here`);
      await this.importNextMatchday(day, gameServerUri, season);
    }
  }

  private async importNextMatchday(day: Number, gameServerUri: String, season: Number) {
    const nextMatchdayDay = day.valueOf() - 1;
    if (nextMatchdayDay >= 0) {
      const nextMatchday = await this.matchdaysIDb.add(gameServerUri, season, nextMatchdayDay, new Date());
      await this.importTransfers(nextMatchday);
    }
  }

  private async addMatchday(matchday: IMatchday, season: Number, day: Number, gameServerUri: String) {
    if (matchday.id() < 0) {
      this.logger.info(`matchday ${season}-${day}@${gameServerUri}: not in database yet - will be added now`);
      matchday = await this.matchdaysIDb.add(gameServerUri, season, day, new Date());
    }
    return matchday;
  }

  private async importOnNotificationClick(
    options: { "title": string; "icon": string; "body": string; "tag": string; },
    season: Number,
    day: Number,
    matchday: IMatchday)
    : Promise<void> {

    options.body = this.resourceImportingStarted.value(`${season}-${day}`).toString();
    new Notification("foxfm", options);
    await new ImportedPlayerTransfers(this.database, this.logger).import(matchday);
    options.body = this.resourceImportingFinished.value(`${season}-${day}`).toString();
    new Notification("foxfm", options);
    // safe last successful import
    this.importedTransfersOfMatchdaysIDb.add(matchday, new Date());
  }
}
