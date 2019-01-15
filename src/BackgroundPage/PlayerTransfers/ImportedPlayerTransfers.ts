import { IMatchday } from '../../Common/IMatchday';
import { FoxfmIndexedDb } from '../../Common/IndexedDb/FoxfmIndexedDb';
import { PlayerTransfersIDb } from '../../Common/IndexedDb/PlayerTransfersIDb';
import { IEasyLogger } from '../../Common/Logger/EasyLogger';
import {
  IRessource,
  RessourcePlayerTransferImportFieldAge,
  RessourcePlayerTransferImportFieldNumber,
  RessourcePlayerTransferImportFieldPosition,
  RessourcePlayerTransferImportFieldPrice,
  RessourcePlayerTransferImportFieldStrength,
} from '../../Common/Ressource';
import { DomFromStringAsync } from '../../Common/Toolkit/DomFromStringAsync';
import { FetchedText } from '../../Common/Toolkit/FetchedText';
import { HtmlTablesByTagName } from '../../Common/Toolkit/HtmlTablesByTagName';
import { NumberFromString } from '../../Common/Toolkit/NumberFromString';
import { ITable } from '../../Common/Toolkit/Table';
import { Url } from '../../Common/Toolkit/Url';
import { Value } from '../../Common/Toolkit/Value';
import { IImportedPlayerTransfers } from './IImportedPlayerTransfers';

export class ImportedPlayerTransfers implements IImportedPlayerTransfers {
  private ressourcePlayerTransferImportNumber: IRessource;
  private ressourcePlayerTransferImportPosition: IRessource;
  private ressourcePlayerTransferImportAge: IRessource;
  private ressourcePlayerTransferImportStrength: IRessource;
  private ressourcePlayerTransferImportPrice: IRessource;

  constructor(
    private dataBase: FoxfmIndexedDb,
    private log: IEasyLogger,
  ) {
    this.ressourcePlayerTransferImportNumber = new RessourcePlayerTransferImportFieldNumber();
    this.ressourcePlayerTransferImportPosition = new RessourcePlayerTransferImportFieldPosition();
    this.ressourcePlayerTransferImportAge = new RessourcePlayerTransferImportFieldAge();
    this.ressourcePlayerTransferImportStrength = new RessourcePlayerTransferImportFieldStrength();
    this.ressourcePlayerTransferImportPrice = new RessourcePlayerTransferImportFieldPrice();
  }

  public async import(matchday: IMatchday): Promise<void> {
    try {
      const matchdayId = matchday.id();
      const matchdaySeason = await matchday.season();
      const matchdayDay = await matchday.day();
      const serverId = await (await matchday.gameServer()).id();
      const serverUri = await (await matchday.gameServer()).uri();
      this.log.debug(`starting import from server '${serverUri}' of season ${matchdaySeason}-${matchdayDay}`);
      await this.save(
        matchdayId,
        serverId,
        serverUri,
        matchdayDay);
    } catch (e) {
      throw new Error(`Running task: ${e}`);
    }
  }

  private async save(
    matchdayId: Number,
    serverId: Number,
    serverUri: String,
    day: Number,
  ): Promise<void> {

    let transferTable = (await this.playerTransferTable(serverUri, day)).table();
    let transferTableFirstRow = transferTable.rows.item(0);

    let columnValues = "";
    for (let i = 0; i < transferTableFirstRow.cells.length; i++) {
      columnValues += `${transferTableFirstRow.cells.item(i).innerHTML};`;
    }
    this.log.debug(`first row: ${columnValues}`);
    this.log.debug(`number of rows of 2nd table: ${transferTable.rows.length}`);

    let colIdxNumber = this.columnIndex(transferTableFirstRow, this.ressourcePlayerTransferImportNumber.value());
    let colIdxPosition = this.columnIndex(transferTableFirstRow, this.ressourcePlayerTransferImportPosition.value());
    let colIdxAge = this.columnIndex(transferTableFirstRow, this.ressourcePlayerTransferImportAge.value());
    let colIdxStrength = this.columnIndex(transferTableFirstRow, this.ressourcePlayerTransferImportStrength.value());
    let colIdxPrice = this.columnIndex(transferTableFirstRow, this.ressourcePlayerTransferImportPrice.value());

    let playerTransfersIDb = new PlayerTransfersIDb(this.dataBase);

    // start from second row
    for (let i = 1; i < transferTable.rows.length; i++) {
      let cells = transferTable.rows.item(i).cells;

      await playerTransfersIDb.add(
        serverId,
        matchdayId,
        this.stringToNumberArray(cells.item(colIdxNumber).innerHTML),
        cells.item(colIdxPosition).innerHTML,
        this.stringToNumberArray(cells.item(colIdxAge).innerHTML),
        this.stringToNumberArray(cells.item(colIdxStrength).innerHTML),
        this.stringToNumberArray(cells.item(colIdxPrice).innerHTML),
      );
    }
  }

  private stringToNumberArray(value: String): Number {
    return new NumberFromString(
      new Value<String>(
        value,
      ),
      ""
    ).value();
  }

  private columnIndex(row: HTMLTableRowElement, name: String): any {
    let index = -1;
    for (let i = 0; i < row.cells.length; i++) {
      if (row.cells.item(i).innerHTML === name) {
        index = i;
        break;
      }
    }
    this.log.debug(`index of column '${name}' in column ${JSON.stringify(row)}: ${index}`);
    return index;
  }

  private async playerTransferTable(
    serverUri: String,
    day: Number,
  ): Promise<ITable<HTMLTableElement>> {
    try {
      //      let serverUri = await (await matchday.gameServer()).uri();
      //      let day = await matchday.day();
      let downloadUrl = `transfer/spielerwechsel_export.php`;
      let uri = `http://${serverUri}/${downloadUrl}?select_spieltag=${day}&seite=alle`;
      this.log.debug(`about to download player transfers from: ${uri}`);
      let dom = (await new DomFromStringAsync(
        new FetchedText(
          new Url(uri),
        ))
        .dom())
        .documentElement;
      this.log.debug(`downloaded player transfers from: ${uri}`);

      let tables = new HtmlTablesByTagName(dom).tables();
      this.log.debug(`number of tables: ${tables.length}`);

      return tables[1];
    } catch (e) {
      throw new Error(`Could not get tables from player transfer downloaded file: ${e}`);
    }
  }
}
