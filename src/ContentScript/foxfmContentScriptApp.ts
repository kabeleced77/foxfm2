import { EasyLogger } from '../Common/Logger/EasyLogger';
import { Logger } from '../Common/Logger/Logger';
import { ILogLevel, LogLevelError } from '../Common/Logger/LogLevel';
import { IRegisteredLoggingModule, RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { IRegisteredLoggingModules, RegisteredLoggingModules } from '../Common/Logger/RegisteredLoggingModules';
import { ClubsMessaging } from '../Common/Messaging/ClubsMessaging';
import { MatchdaysMessaging } from '../Common/Messaging/MatchdaysMessaging';
import { MessagingContentScript } from '../Common/Messaging/MessagingContentScript';
import { MessagingPortIndexedDb } from '../Common/Messaging/MessagingPortIndexedDb';
import { IFocusElementsSetting } from '../Common/Settings/FocusElementsSetting';
import { IFoxfmSetting } from '../Common/Settings/FoxfmSetting';
import { FoxfmSettingName } from '../Common/Settings/FoxfmSettingName';
import {
  PlayerTransferMarketPageFocusElementSettingName,
} from '../Common/Settings/PlayerTransferMarketPageFocusElementSettingName';
import {
  PlayerTransferMarketPlayerPageFocusElementSettingName,
} from '../Common/Settings/PlayerTransferMarketPlayerPageFocusElementSettingName';
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
import { FoxfmSettingDefaultValue } from '../Common/SettingsDefaultValues/FoxfmSettingDefaultValue';
import {
  PlayerInformationPageFocusElementSettingDefaultValue,
} from '../Common/SettingsDefaultValues/PlayerInformationPageFocusElementSettingDefaultValue';
import {
  PlayerTransferMarketPageFocusElementSettingDefaultValue,
} from '../Common/SettingsDefaultValues/PlayerTransferMarketPageFocusElementSettingDefaultValue';
import {
  PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue,
} from '../Common/SettingsDefaultValues/PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue';
import {
  TransferMarketSellingDurationSettingsDefaultValue,
} from '../Common/SettingsDefaultValues/TransferMarketSellingDurationSettingsDefaultValue';
import { StrengthLevels } from '../Common/StrengthLevels';
import { StrengthValues } from '../Common/StrengthValues';
import { AwpPoints, AwpPointsByEpTp, AwpPointsBySplittedString } from '../Common/Toolkit/AwpPoints';
import { Dom } from '../Common/Toolkit/Dom';
import { DomNodesByXpath } from '../Common/Toolkit/DomNodesByXpath';
import { IExtendWebElement } from '../Common/Toolkit/ExtendWebElement';
import { ExtendWebPage } from '../Common/Toolkit/ExtendWebPage';
import { FirstElementInXPathNodeOrParents } from '../Common/Toolkit/FirstElementInXPathNodeOrParents';
import { FocusElementByXPathConfigureable } from '../Common/Toolkit/FocusElementByXPathConfigureable';
import { FocusElementOnWebPage } from '../Common/Toolkit/FocusElementOnWebPage';
import { IFocusWebElement } from '../Common/Toolkit/FocusWebElement';
import { HrefTextFromAnchorElement } from '../Common/Toolkit/HrefTextFromAnchorElement';
import { HtmlSelect } from '../Common/Toolkit/HtmlSelect';
import { HtmlSelectById } from '../Common/Toolkit/HtmlSelectById';
import { HtmlTable } from '../Common/Toolkit/HtmlTable';
import { HtmlTableByXPath } from '../Common/Toolkit/HtmlTableByXPath';
import { HtmlTableColumnByXpath } from '../Common/Toolkit/HtmlTableColumnByXpath';
import { HtmlTableColumnNumberValues } from '../Common/Toolkit/HtmlTableColumnNumberValues';
import { HtmlTableColumnStringValues } from '../Common/Toolkit/HtmlTableColumnStringValues';
import { Mutex } from '../Common/Toolkit/Mutex';
import { NumberFromString } from '../Common/Toolkit/NumberFromString';
import { IScrapeWebElement } from '../Common/Toolkit/ScrapeWebElement';
import { ScrapeWebPage } from '../Common/Toolkit/ScrapeWebPage';
import { SplitStringsToNumbers } from '../Common/Toolkit/SplitStrings';
import { SplitStringToString } from '../Common/Toolkit/SplitStringToString';
import { StorageLocal } from '../Common/Toolkit/StorageLocal';
import { StorageLocalSync } from '../Common/Toolkit/StorageLocalSync';
import { TextContentFromNode } from '../Common/Toolkit/TextContentFromNode';
import { Url } from '../Common/Toolkit/Url';
import { XPathAllResults } from '../Common/Toolkit/XPathAllResults';
import { XPathHtmlTableCell } from '../Common/Toolkit/XPathHtmlTableCell';
import { XPathSingleResult } from '../Common/Toolkit/XPathSingleResult';
import { XPathString } from '../Common/Toolkit/XPathString';
import { HeaderWebPageUrl } from '../Common/Urls/HeaderWebPageUrl';
import { PlayerInformationWebPageUrl } from '../Common/Urls/PlayerInformationWebPageUrl';
import { PlayerTransferMarketPlayerWebPageUrl } from '../Common/Urls/PlayerTransferMarketPlayerWebPageUrl';
import { PlayerTransferMarketWebPageUrl } from '../Common/Urls/PlayerTransferMarketWebPageUrl';
import { StadiumWebPageUrl } from '../Common/Urls/StadiumWebPageUrl';
import { TeamWebPageUrl } from '../Common/Urls/TeamWebPageUrl';
import { TransferMarketAmateurWebPageUrl } from '../Common/Urls/TransferMarketAmateurWebPageUrl';
import { TransferMarketProfessionalsUiUrl } from '../Common/Urls/TransferMarketProfessionalsUiUrl';
import { TransferOfferWebPageUrl } from '../Common/Urls/TransferOfferWebPageUrl';
import { FoxfmContentScript } from './FoxfmContentScript';
import { ScrapeClub } from './Header/ScrapeClub';
import { ScrapeMatchday } from './Header/ScrapeMatchday';
import { PlayerTransferMarketDurationSelect } from './Player/PlayerTransferMarketDurationSelect';
import { StadiumManagerUi } from './Stadium/StadiumManagerUi';
import { TeamPlayerTable } from './Team/TeamPlayerTable';
import { TransferMarketAmateurPlayerTable } from './TransferMarket/TransferMarketAmateurPlayerTable';
import { TransferMarketOfferDurationSelect } from './TransferMarket/TransferMarketOfferDurationSelect';
import { TransferMarketOfferPlayerTable } from './TransferMarket/TransferMarketOfferPlayerTable';
import { TransferMarketProfessionalPlayerTable } from './TransferMarket/TransferMarketProfessionalPlayerTable';
import { PlayerCategories } from '../Common/PlayerCategories';
import { Players } from '../Common/Players';
import { PlayerTransfersMessaging } from './TransferMarket/PlayerTransfersMessaging';
import { LabelsOfCheckedCheckboxes } from "../Common/Toolkit/LabelsOfCheckedCheckboxes";
import { HtmlSelectValue } from '../Common/Toolkit/HtmlSelectValue';
import { XPathFirstResult } from '../Common/Toolkit/XPathFirstResult';

var doc = window.document;
var currentUrl = doc.location.href;
var currentHost = doc.location.host;

/****************************************************
 * Create logger used withing content script
*/
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

/****************************************************
 * Create messaging for content script side
*/
var messagingContentScript = new MessagingContentScript(
  new MessagingPortIndexedDb(),
  new EasyLogger(
    logger,
    new RegisteredLoggingModule(
      "MessagingContentScript",
      new LogLevelError()
    )));

/****************************************************
 * Create content script application entry poing
 */
new FoxfmContentScript(
  new StorageLocal<IFoxfmSetting>(
    new FoxfmSettingName(),
    new FoxfmSettingDefaultValue()),
  new EasyLogger(
    logger,
    new RegisteredLoggingModule(
      "foxfmApp",
      new LogLevelError())),
  new ExtendWebPage(
    new Url(currentUrl),
    new Array<IExtendWebElement>(
      // Extend player transfer market player - selling duration
      new PlayerTransferMarketDurationSelect(
        new PlayerTransferMarketPlayerWebPageUrl(),
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
      // Extend transfer market - search result table
      new TransferMarketProfessionalPlayerTable(
        new TransferMarketProfessionalsUiUrl(),
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
        // all players presented in the table 'Professional Transfer Market'
        new Players(
          // all categories
          new PlayerCategories(
            // player position values
            new HtmlTableColumnStringValues(
              new HtmlTableColumnByXpath(
                new XPathHtmlTableCell(
                  new XPathSingleResult<HTMLTableCellElement>(
                    new XPathAllResults(
                      window.document,
                      new XPathString('//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[2]'))))),
            ),
            // player age values
            new HtmlTableColumnNumberValues(
              new HtmlTableColumnByXpath(
                new XPathHtmlTableCell(
                  new XPathSingleResult<HTMLTableCellElement>(
                    new XPathAllResults(
                      window.document,
                      new XPathString('//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[4]'))))),
            ),
            // player strength values
            new StrengthValues(
              new HtmlTableColumnByXpath(
                new XPathHtmlTableCell(
                  new XPathSingleResult<HTMLTableCellElement>(
                    new XPathAllResults(
                      window.document,
                      new XPathString('//*[@id="transfermarkt"]/div[1]/div/table/tbody/tr/td/table[2]/tbody/tr[1]/td[5]')))))),
          ),
          // all AWP values
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
        ),
        // all transfer prices
        new PlayerTransfersMessaging(
          messagingContentScript,
          currentHost,
          new LabelsOfCheckedCheckboxes(
            new XPathAllResults(
              doc,
              new XPathString(
                '//*[@id="transfermarkt"]/div[1]/form/div/table/tbody/tr[1]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table//input[@type="checkbox"]',
              )
            )),
          new NumberFromString(
            new HtmlSelectValue(
              new XPathFirstResult(
                doc,
                '//*[@id="alt_von"]',
              ),
            ),
            ""),
          new NumberFromString(
            new HtmlSelectValue(
              new XPathFirstResult(
                doc,
                '//*[@id="alt_bis"]',
              ),
            ),
            ""),
          new NumberFromString(
            new HtmlSelectValue(
              new XPathFirstResult(
                doc,
                '//*[@id="staerke_von"]',
              ),
            ),
            ""),
          new NumberFromString(
            new HtmlSelectValue(
              new XPathFirstResult(
                doc,
                '//*[@id="staerke_bis"]',
              ),
            ),
            ""),
        ),
        // settings
        new StorageLocal<ITransferMarketSearchResultTableSettings>(
          new SettingNameTransferMarketProfessionalsSearchResultTable(),
          new TransferMarketSearchResultTableSettings(
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          )),
        // logger
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            nameof(TransferMarketProfessionalPlayerTable),
            new LogLevelError(),
          )
        )),
      // Extend transfer market - possible offer table
      new TransferMarketOfferPlayerTable(
        new TransferOfferWebPageUrl(),
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
      // Extend transfer market - set default duration
      new TransferMarketOfferDurationSelect(
        new TransferOfferWebPageUrl(),
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
            new LogLevelError()))),
      // Extend team table
      new TeamPlayerTable(
        new TeamWebPageUrl(),
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
            new LogLevelError()))),
      // Extend amateur transfer market
      new TransferMarketAmateurPlayerTable(
        new TransferMarketAmateurWebPageUrl(),
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
            false))),
      // Extend stadium
      new StadiumManagerUi(
        new Dom(doc),
        new StadiumWebPageUrl(),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "StadiumManagerUi",
            new LogLevelError()))))),
  new FocusElementOnWebPage(
    new Url(currentUrl),
    new Array<IFocusWebElement>(
      // Extend player information - set focus
      new FocusElementByXPathConfigureable(
        new PlayerInformationWebPageUrl(),
        new StorageLocal<IFocusElementsSetting>(
          new SettingNamePlayerInformationWebPageFocusElement(),
          new PlayerInformationPageFocusElementSettingDefaultValue()),
        new Dom(doc),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "FocusElementByXPathConfigureable",
            new LogLevelError()))),
      // Extend player transfer market - focus elements
      new FocusElementByXPathConfigureable(
        new PlayerTransferMarketWebPageUrl(),
        new StorageLocal<IFocusElementsSetting>(
          new PlayerTransferMarketPageFocusElementSettingName(),
          new PlayerTransferMarketPageFocusElementSettingDefaultValue()),
        new Dom(doc),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "FocusElementByXPathConfigureable",
            new LogLevelError()))),
      // Extend player transfer market player - focus element
      new FocusElementByXPathConfigureable(
        new PlayerTransferMarketPlayerWebPageUrl(),
        new StorageLocal<IFocusElementsSetting>(
          new PlayerTransferMarketPlayerPageFocusElementSettingName(),
          new PlayerTransferMarketPlayerPageFocusElementSettingDefaultValue()),
        new Dom(doc),
        new EasyLogger(
          logger,
          new RegisteredLoggingModule(
            "FocusElementByXPathConfigureable",
            new LogLevelError()))))),
  new ScrapeWebPage(
    new Url(currentUrl),
    new Array<IScrapeWebElement>(
      // Scrape office/header - get club
      new ScrapeClub(
        new HeaderWebPageUrl(),
        window.location.hostname,
        new SplitStringToString(
          new SplitStringToString(
            new HrefTextFromAnchorElement(
              new DomNodesByXpath<HTMLAnchorElement>(
                new XPathAllResults(
                  window.document,
                  new XPathString('/html/body/div[2]/div[1]/div[2]/div[1]/a')))),
            "/",
            5),
          /^(\d+)-(.*)$/, // splits the url to the club in 5 parts -> last one is name of club
          3),
        new NumberFromString(
          new SplitStringToString(
            new SplitStringToString(
              new HrefTextFromAnchorElement(
                new DomNodesByXpath<HTMLAnchorElement>(
                  new XPathAllResults(
                    window.document,
                    new XPathString('/html/body/div[2]/div[1]/div[2]/div[1]/a')))),
              "/",
              5),
            "-",
            1),
          ","
        ),
        new ClubsMessaging(
          messagingContentScript),
      ),
      // Scrape office/header - get matchday
      new ScrapeMatchday(
        new HeaderWebPageUrl(),
        window.location.hostname,
        new NumberFromString(
          new TextContentFromNode(
            new DomNodesByXpath<HTMLSpanElement>(
              new XPathAllResults(
                window.document,
                new XPathString('/html/body/div[2]/div[1]/div[2]/p/span[1]')))), ","),
        new NumberFromString(
          new TextContentFromNode(
            new DomNodesByXpath<HTMLSpanElement>(
              new XPathAllResults(
                window.document,
                new XPathString('/html/body/div[2]/div[1]/div[2]/p/span[2]')))), ","),
        new MatchdaysMessaging(
          messagingContentScript),
      ))),
).main().catch(e => logger.error("Content script", `error: ${e}`));
