import { EasyLogger, IEasyLogger } from '../Common/Logger/EasyLogger';
import { Logger } from '../Common/Logger/Logger';
import { ILogLevel, LogLevelError } from '../Common/Logger/LogLevel';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import { IFocusElementsSetting } from '../Common/Settings/FocusElementsSetting';
import {
  PlayerTransferMarketPageFocusElementSettingName,
} from '../Common/Settings/PlayerTransferMarketPageFocusElementSettingName';
import { SettingNameApplicationLogLevel } from '../Common/Settings/SettingNameApplicationLogLevel';
import { SettingNameLoggingModules } from '../Common/Settings/SettingNameLoggingModules';
import {
  SettingNamePlayerInformationWebPageFocusElement,
} from '../Common/Settings/SettingNamePlayerInformationWebPageFocusElement';
import { SettingNameTeamTable } from '../Common/Settings/SettingNameTeamTable';
import { SettingNameTransferMarketAmateurTable } from '../Common/Settings/SettingNameTransferMarketAmateurTable';
import { SettingNameTransferMarketSellingDuration } from '../Common/Settings/SettingNameTransferMarketDuration';
import {
  SettingNameTransferMarketProfessionalsSearchResultTable,
} from '../Common/Settings/SettingNameTransferMarketProfessionalsSearchResultTable';
import { SettingNameTransferTablePossibleOffers } from '../Common/Settings/SettingNameTransferTablePossibleOffers';
import { StrengthsLimitsSetting } from '../Common/Settings/StrengthsLimitsSetting';
import { ITeamTableSetting, TeamTableSetting } from '../Common/Settings/TeamTableSetting';
import {
  ITransferMarketAmateurPlayerTableSettings,
  TransferMarketAmateurPlayerTableSettings,
} from '../Common/Settings/TransferMarketAmateurPlayerTableSettings';
import {
  ITransferMarketSearchResultTableSettings,
  TransferMarketSearchResultTableSettings,
} from '../Common/Settings/TransferMarketSearchResultTableSettings';
import { ITransferMarketSellingDurationSettings } from '../Common/Settings/TransferMarketSellingDurationSettings';
import { ITransferOfferTableSettings, TransferOfferTableSettings } from '../Common/Settings/TransferOfferTableSettings';
import {
  PlayerInformationPageFocusElementSettingDefaultValue,
} from '../Common/SettingsDefaultValues/PlayerInformationPageFocusElementSettingDefaultValue';
import {
  PlayerTransferMarketPageFocusElementSettingDefaultValue,
} from '../Common/SettingsDefaultValues/PlayerTransferMarketPageFocusElementSettingDefaultValue';
import {
  TransferMarketSellingDurationSettingsDefaultValue,
} from '../Common/SettingsDefaultValues/TransferMarketSellingDurationSettingsDefaultValue';
import { StrengthLevels } from '../Common/StrengthLevels';
import { StrengthValues } from '../Common/StrengthValues';
import { AwpPoints, AwpPointsByEpTp, AwpPointsBySplittedString } from '../Common/Toolkit/AwpPoints';
import { Dom } from '../Common/Toolkit/Dom';
import { ExtendWebPage, IExtendWebPage } from '../Common/Toolkit/ExtendWebPage';
import { ExtendWebPages, IExtendWebPages } from '../Common/Toolkit/ExtendWebPages';
import { FirstElementInXPathNodeOrParents } from '../Common/Toolkit/FirstElementInXPathNodeOrParents';
import { FocusElementByXPathConfigureable } from '../Common/Toolkit/FocusElementByXPathConfigureable';
import { HtmlSelect } from '../Common/Toolkit/HtmlSelect';
import { HtmlSelectById } from '../Common/Toolkit/HtmlSelectById';
import { HtmlTable } from '../Common/Toolkit/HtmlTable';
import { HtmlTableByXPath } from '../Common/Toolkit/HtmlTableByXPath';
import { HtmlTableColumnByXpath } from '../Common/Toolkit/HtmlTableColumnByXpath';
import { HtmlTableColumnNumberValues } from '../Common/Toolkit/HtmlTableColumnNumberValues';
import { HtmlTableColumnStringValues } from '../Common/Toolkit/HtmlTableColumnStringValues';
import { Mutex } from '../Common/Toolkit/Mutex';
import { SplitStringsToNumbers } from '../Common/Toolkit/SplitStrings';
import { StorageLocal } from '../Common/Toolkit/StorageLocal';
import { StorageLocalSync } from '../Common/Toolkit/StorageLocalSync';
import { Url, IUrl } from '../Common/Toolkit/Url';
import { XPathAllResults } from '../Common/Toolkit/XPathAllResults';
import { XPathHtmlTableCell } from '../Common/Toolkit/XPathHtmlTableCell';
import { XPathSingleResult } from '../Common/Toolkit/XPathSingleResult';
import { XPathString } from '../Common/Toolkit/XPathString';
import { PlayerInformationWebPageUrl } from '../Common/Urls/PlayerInformationWebPageUrl';
import { PlayerTransferMarketWebPageUrl } from '../Common/Urls/PlayerTransferMarketWebPageUrl';
import { StadiumWebPageUrl } from '../Common/Urls/StadiumWebPageUrl';
import { TeamWebPageUrl } from '../Common/Urls/TeamWebPageUrl';
import { TransferMarketAmateurWebPageUrl } from '../Common/Urls/TransferMarketAmateurWebPageUrl';
import { TransferMarketProfessionalsUiUrl } from '../Common/Urls/TransferMarketProfessionalsUiUrl';
import { TransferOfferWebPageUrl } from '../Common/Urls/TransferOfferWebPageUrl';
import { PlayerInformationWebPage } from './Player/PlayerInformationWebPage';
import { PlayerTransferMarketDurationSelect } from './Player/PlayerTransferMarketDurationSelect';
import { PlayerTransferMarketWebPage } from './Player/PlayerTransferMarketWebPage';
import { StadiumManagerUi } from './Stadium/StadiumManagerUi';
import { TeamPlayerTable } from './Team/TeamPlayerTable';
import { TeamWebPage } from './Team/TeamWebPage';
import { TransferMarketAmateurPlayerTable } from './TransferMarket/TransferMarketAmateurPlayerTable';
import { TransferMarketAmateurWebPage } from './TransferMarket/TransferMarketAmateurWebPage';
import { TransferMarketOfferDurationSelect } from './TransferMarket/TransferMarketOfferDurationSelect';
import { TransferMarketOfferPlayerTable } from './TransferMarket/TransferMarketOfferPlayerTable';
import { TransferMarketOfferWebPage } from './TransferMarket/TransferMarketOfferWebPage';
import { TransferMarketProfessionalPlayerTable } from './TransferMarket/TransferMarketProfessionalPlayerTable';
import { TransferMarketProfessionalWebPage } from './TransferMarket/TransferMarketProfessionalWebPage';
import { PlayerTransferMarketPlayerWebPageUrl } from '../Common/Urls/PlayerTransferMarketPlayerWebPageUrl';
import { PlayerTransferMarketPlayerWebPage } from './Player/PlayerTransferMarketPlayerWebPage';
import { PlayerTransferMarketPlayerPageFocusElementSettingName } from '../Common/Settings/PlayerTransferMarketPlayerPageFocusElementSettingName';
import { PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue } from '../Common/SettingsDefaultValues/PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue';

import Dexie from "dexie";

export interface IMatchdays {
  matchdays(): Promise<IMatchday[]>;
  add(server: String, day: Number, season: Number, date: Date): Promise<void | IMatchday>;
}

export interface IMatchdayDataModel {
  id?: Number;
  serverValue: String;
  dayValue: Number;
  seasonValue: Number;
  dateValue: Date;
}

export class MatchdayDataModel implements IMatchdayDataModel {
  public id: Number;
  public serverValue: String;
  public dayValue: Number;
  public seasonValue: Number;
  public dateValue: Date;

  constructor(
    server: String,
    season: Number,
    day: Number,
    date: Date,
  ) {
    this.serverValue = server;
    this.seasonValue = season;
    this.dayValue = day;
    this.dateValue = date;
  }
}

export interface IMatchday {
  id(): Number;
  server(): Promise<String>;
  day(): Promise<Number>;
  season(): Number;
  date(): Date;
}

export class Matchdays implements IMatchdays {
  private dataBase: FoxfmIndexedDb;

  constructor(source: FoxfmIndexedDb) {
    this.dataBase = source;
  }

  public matchdays(): Promise<IMatchday[]> {
    let mds: IMatchday[] = [];
    return this.dataBase
      .matchdays
      .toCollection()
      .eachPrimaryKey((pk: Number) => mds.push(new Matchday(this.dataBase, pk)))
      .then(() => mds);
  }
  public add(server: String, season: Number, day: Number, date: Date): Promise<void | IMatchday> {
    return this.dataBase
      .matchdays
      .add(new MatchdayDataModel(
        server,
        season,
        day,
        date,
      ))
      .then(id => {
        return new Matchday(
          this.dataBase,
          id,
        );
      })
      .catch('ConstraintError',
        e => { /* accepted, no handling necessary */ })
      .catch(
        e => { throw `Could not add new matchday: ${e}` }
      );
  }
}

export class Matchday implements IMatchday {
  private source: FoxfmIndexedDb;
  private idValue: Number;

  constructor(db: FoxfmIndexedDb, id: Number) {
    this.source = db;
    this.idValue = id;
  }

  public id(): Number {
    return this.idValue;
  }
  public server(): Promise<String> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IMatchdayDataModel) => result.serverValue);
  }
  public day(): Promise<Number> {
    return this.source
      .matchdays
      .get(this.idValue)
      .then((result: IMatchdayDataModel) => result.dayValue);
  }
  public season(): Number {
    throw new Error("Method not implemented.");
  }
  public date(): Date {
    throw new Error("Method not implemented.");
  }
}

class FoxfmIndexedDb extends Dexie {
  public matchdays: Dexie.Table<IMatchdayDataModel, Number>;

  constructor() {
    super("foxfm");
    this.version(1).stores({
      matchdays: "++id, &[serverValue+seasonValue+dayValue], serverValue, seasonValue, dayValue"
    });
  }
}

class foxfmApp {
  private logger: IEasyLogger;
  private extendWebPages: IExtendWebPages;

  constructor(logger: IEasyLogger, extendWebPages: IExtendWebPages) {
    this.logger = logger;
    this.extendWebPages = extendWebPages;
  }

  public async main(): Promise<void> {
    var doc = window.document;
    var location = doc.location.href;
    this.logger.info(`S t a r t e d on ${location}`);
    this.extendWebPages.extend();

    let db = new FoxfmIndexedDb();
    let matchdays = new Matchdays(db);
    for (let i = 0; i < 10; i++) {
      await matchdays
        .add("server", 157, i, new Date())
        .catch(e => this.logger.error(e.stack || e));
    }
    await matchdays
      .matchdays()
      .then(mds => mds
        .forEach(async md =>
          this.logger.info(`Server (id: ${JSON.stringify(md.id())}: ${await md.server()}, day: ${await md.day()}`)))
      .catch(e => this.logger.error(e.stack || e));
  }
}

var doc = window.document;
var currentUrl = doc.location.href;

// use Singleton to prevent race condition saving registered logging modules from different instances
// --> Nevertheless, if loaded several times in parallel (mainly more than one fram on a web site), 
//     race condition still happens
// ==> 
var logger = new Logger(
  new StorageLocal<ILogLevel>(
    new SettingNameApplicationLogLevel(),
    new LogLevelError()),
  new StorageLocalSync<IRegisteredLoggingModules>(
    new Mutex<IRegisteredLoggingModules>(),
    new StorageLocal<IRegisteredLoggingModules>(
      new SettingNameLoggingModules(),
      new RegisteredLoggingModules(
        new Array<IRegisteredLoggingModule>()))));

var app = new foxfmApp(
  new EasyLogger(
    logger,
    new RegisteredLoggingModule(
      "foxfmApp",
      new LogLevelError())
  ),
  new ExtendWebPages(
    new Array<IExtendWebPage>(
      // Extend player information - set focus
      new ExtendWebPage(
        new Url(currentUrl),
        new PlayerInformationWebPage(
          new PlayerInformationWebPageUrl(),
          new FocusElementByXPathConfigureable(
            new StorageLocal<IFocusElementsSetting>(
              new SettingNamePlayerInformationWebPageFocusElement(),
              new PlayerInformationPageFocusElementSettingDefaultValue()),
            new Dom(doc),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "FocusElementByXPathConfigureable",
                new LogLevelError())))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "PlayerInformationWebPage",
            new LogLevelError()))),
      // Extend player transfer market - focus elements
      new ExtendWebPage(
        new Url(currentUrl),
        new PlayerTransferMarketWebPage(
          new PlayerTransferMarketWebPageUrl(),
          new FocusElementByXPathConfigureable(
            new StorageLocal<IFocusElementsSetting>(
              new PlayerTransferMarketPageFocusElementSettingName(),
              new PlayerTransferMarketPageFocusElementSettingDefaultValue()),
            new Dom(doc),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "FocusElementByXPathConfigureable",
                new LogLevelError())))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "PlayerTransferMarketWebPage",
            new LogLevelError()))),
      // Extend player transfer market player - selling duration & focus element
      new ExtendWebPage(
        new Url(currentUrl),
        new PlayerTransferMarketPlayerWebPage(
          new PlayerTransferMarketPlayerWebPageUrl(),
          new PlayerTransferMarketDurationSelect(
            new HtmlSelect(
              new HtmlSelectById(
                new Dom(doc),
                "startwoche")),
            new StorageLocal<ITransferMarketSellingDurationSettings>(
              new SettingNameTransferMarketSellingDuration(),
              new TransferMarketSellingDurationSettingsDefaultValue()),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "PlayerTransferMarketPlayerDurationSelect",
                new LogLevelError()))),
          new FocusElementByXPathConfigureable(
            new StorageLocal<IFocusElementsSetting>(
              new PlayerTransferMarketPlayerPageFocusElementSettingName(),
              new PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue()),
            new Dom(doc),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "FocusElementByXPathConfigureable",
                new LogLevelError())))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "PlayerTransferMarketPlayerWebPage",
            new LogLevelError()))),
      // Extend transfer market - search result table
      new ExtendWebPage(
        new Url(currentUrl),
        new TransferMarketProfessionalWebPage(
          new TransferMarketProfessionalsUiUrl(),
          new TransferMarketProfessionalPlayerTable(
            new HtmlTable(
              new HtmlTableByXPath<HTMLTableCellElement>(
                new FirstElementInXPathNodeOrParents<HTMLTableCellElement, HTMLTableElement>(
                  new XPathSingleResult<HTMLTableCellElement>(
                    new XPathAllResults(
                      window.document,
                      new XPathString('//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[2]'))),
                  "table"))),
            new HtmlTableColumnByXpath(
              new XPathHtmlTableCell(
                new XPathSingleResult<HTMLTableCellElement>(
                  new XPathAllResults(
                    window.document,
                    new XPathString('//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[5]'))))),
            new StrengthLevels(
              new StrengthsLimitsSetting(),
              new StrengthValues(
                new HtmlTableColumnByXpath(
                  new XPathHtmlTableCell(
                    new XPathSingleResult<HTMLTableCellElement>(
                      new XPathAllResults(
                        window.document,
                        new XPathString('//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[5]')))))),
              new AwpPointsBySplittedString(
                new SplitStringsToNumbers(
                  new HtmlTableColumnStringValues(
                    new HtmlTableColumnByXpath(
                      new XPathHtmlTableCell(
                        new XPathSingleResult<HTMLTableCellElement>(
                          new XPathAllResults(
                            window.document,
                            new XPathString('//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[6]')))))),
                  "/",
                  ","))),
            new StorageLocal<ITransferMarketSearchResultTableSettings>(
              new SettingNameTransferMarketProfessionalsSearchResultTable(),
              new TransferMarketSearchResultTableSettings(
                false,
                false,
                false,
                false)))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "ExtendWebPage",
            new LogLevelError())
        )
      ),
      // Extend transfer market - possible offer table
      new ExtendWebPage(
        new Url(currentUrl),
        new TransferMarketOfferWebPage(
          new TransferOfferWebPageUrl(),
          new TransferMarketOfferPlayerTable(
            new HtmlTable(
              new HtmlTableByXPath<HTMLTableCellElement>(
                new FirstElementInXPathNodeOrParents<HTMLTableCellElement, HTMLTableElement>(
                  new XPathSingleResult<HTMLTableCellElement>(
                    new XPathAllResults(
                      window.document,
                      new XPathString('//*[@id="players_to_market"]'))),
                  "table"))),
            new HtmlTableColumnByXpath(
              new XPathHtmlTableCell(
                new XPathSingleResult<HTMLTableCellElement>(
                  new XPathAllResults(
                    window.document,
                    new XPathString('//*[@id="staerke"]'))))),
            new StrengthLevels(
              new StrengthsLimitsSetting(),
              new StrengthValues(
                new HtmlTableColumnByXpath(
                  new XPathHtmlTableCell(
                    new XPathSingleResult<HTMLTableCellElement>(
                      new XPathAllResults(
                        window.document,
                        new XPathString('//*[@id="staerke"]')))))),
              new AwpPoints(
                new HtmlTableColumnNumberValues(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="punkte"]')))))))),
            new StorageLocal<ITransferOfferTableSettings>(
              new SettingNameTransferTablePossibleOffers(),
              new TransferOfferTableSettings(
                true,
                true,
                true))),
          new TransferMarketOfferDurationSelect(
            new HtmlSelect(
              new HtmlSelectById(
                new Dom(doc),
                "startwoche")),
            new StorageLocal<ITransferMarketSellingDurationSettings>(
              new SettingNameTransferMarketSellingDuration(),
              new TransferMarketSellingDurationSettingsDefaultValue()),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "TransferMarketOfferDurationSelect",
                new LogLevelError()))
          )),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "ExtendWebPage",
            new LogLevelError()))),
      // Extend team table
      new ExtendWebPage(
        new Url(currentUrl),
        new TeamWebPage(
          new TeamWebPageUrl(),
          new TeamPlayerTable(
            new HtmlTable(
              new HtmlTableByXPath<HTMLTableCellElement>(
                new FirstElementInXPathNodeOrParents<HTMLTableCellElement, HTMLTableElement>(
                  new XPathSingleResult<HTMLTableCellElement>(
                    new XPathAllResults(
                      window.document,
                      new XPathString('//*[@id="playerTable"]'))),
                  "table"))),
            new HtmlTableColumnByXpath(
              new XPathHtmlTableCell(
                new XPathSingleResult<HTMLTableCellElement>(
                  new XPathAllResults(
                    window.document,
                    new XPathString('//*[@id="playerTable"]/thead/tr/th[10]'))))),
            new StrengthLevels(
              new StrengthsLimitsSetting(),
              new StrengthValues(
                new HtmlTableColumnByXpath(
                  new XPathHtmlTableCell(
                    new XPathSingleResult<HTMLTableCellElement>(
                      new XPathAllResults(
                        window.document,
                        new XPathString('//*[@id="playerTable"]/thead/tr/th[10]')))))),
              new AwpPointsByEpTp(
                new HtmlTableColumnNumberValues(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="playerTable"]/thead/tr/th[13]')))))),
                new HtmlTableColumnNumberValues(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="playerTable"]/thead/tr/th[14]')))))))),
            new StorageLocal<ITeamTableSetting>(
              new SettingNameTeamTable(),
              new TeamTableSetting(
                false,
                false,
                false)),
            new EasyLogger(
              logger,
              new RegisteredLoggingModule(
                "TeamUi",
                new LogLevelError())))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "ExtendWebPage",
            new LogLevelError()))),
      // Extend amateur transfer market
      new ExtendWebPage(
        new Url(currentUrl),
        new TransferMarketAmateurWebPage(
          new TransferMarketAmateurWebPageUrl(),
          new TransferMarketAmateurPlayerTable(
            new HtmlTable(
              new HtmlTableByXPath<HTMLTableCellElement>(
                new FirstElementInXPathNodeOrParents<HTMLTableCellElement, HTMLTableElement>(
                  new XPathSingleResult<HTMLTableCellElement>(
                    new XPathAllResults(
                      window.document,
                      new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[7]')
                    )
                  ),
                  "table"
                )
              )),
            new HtmlTableColumnByXpath(
              new XPathHtmlTableCell(
                new XPathSingleResult<HTMLTableCellElement>(
                  new XPathAllResults(
                    window.document,
                    new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[5]'))))),
            new StrengthLevels(
              new StrengthsLimitsSetting(),
              new StrengthValues(
                new HtmlTableColumnByXpath(
                  new XPathHtmlTableCell(
                    new XPathSingleResult<HTMLTableCellElement>(
                      new XPathAllResults(
                        window.document,
                        new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[5]')))))),
              new AwpPointsByEpTp(
                new HtmlTableColumnNumberValues(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[6]')))))),
                new HtmlTableColumnNumberValues(
                  new HtmlTableColumnByXpath(
                    new XPathHtmlTableCell(
                      new XPathSingleResult<HTMLTableCellElement>(
                        new XPathAllResults(
                          window.document,
                          new XPathString('//*[@id="amateurmarkt"]/table/tbody/tr/td[1]/div/table[1]/tbody/tr/td/table[2]/tbody/tr/td/table/thead/tr/td[7]')))))))),
            new StorageLocal<ITransferMarketAmateurPlayerTableSettings>(
              new SettingNameTransferMarketAmateurTable(),
              new TransferMarketAmateurPlayerTableSettings(
                false,
                false,
                false,
                false)))),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "ExtendWebPage",
            new LogLevelError()))),
      // Extend stadium
      new ExtendWebPage(
        new Url(currentUrl),
        new StadiumManagerUi(
          new Dom(doc),
          new StadiumWebPageUrl(),
          new EasyLogger(
            logger,
            new RegisteredLoggingModule(
              "StadiumManagerUi",
              new LogLevelError())
          )
        ),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "ExtendWebPage",
            new LogLevelError())
        )
      ),
    )
  )
);
app.main();
