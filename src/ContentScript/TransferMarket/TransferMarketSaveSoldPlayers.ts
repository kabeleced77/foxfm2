import { IEasyLogger } from '../../Common/Logger/EasyLogger';
import { ITransferMarketSaveSoldPlayersSetting } from '../../Common/Settings/TransferMarketSaveSoldPlayersSetting';
import { DomFromStringAsync } from '../../Common/Toolkit/DomFromStringAsync';
import { HtmlTablesByTagName } from '../../Common/Toolkit/HtmlTablesByTagName';
import { ISetting } from '../../Common/Toolkit/Setting';
import { TextByXmlHttpRequest } from '../../Common/Toolkit/TextByXmlHttpRequest';
import { Url } from '../../Common/Toolkit/Url';

export interface ISaveSoldPlayers {
  save(): void;
}

export class SaveSoldPlayers implements ISaveSoldPlayers {
  constructor(
    private settings: ISetting<ITransferMarketSaveSoldPlayersSetting>,
    private log: IEasyLogger,
  ) {
    this.settings = settings;
    this.log = log;
  }

  public async save(): Promise<void> {
    let activated = await (await this.settings.value()).activated();
    this.log.info(`Started: activation status: ${activated}`);
    if (activated) {
      let dom = (await new DomFromStringAsync(
        new TextByXmlHttpRequest(
          new Url(
            "http://www.onlinefussballmanager.de/transfer/spielerwechsel_export.php?select_spieltag=3&seite=alle",
          ),
          "GET",
          true)).dom()).documentElement;

      let tables = new HtmlTablesByTagName(dom, "table").tables();

      this.log.debug(`number of tables: ${tables.length}`);
      this.log.debug(`number of rows of 2nd table: ${tables[1].table().rows.length}`);
    }
    this.log.info(`Finished`);
  }
}
