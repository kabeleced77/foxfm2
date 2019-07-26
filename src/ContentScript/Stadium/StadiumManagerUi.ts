import { GameKindCup, GameKindFriendly, GameKindLeague, IGameKind } from '../../Common/GameKind';
import { IEasyLogger } from '../../Common/Logger/EasyLogger';
import {
  RessourceStadiumCup,
  RessourceStadiumCurrencySign,
  RessourceStadiumFriendly,
  RessourceStadiumLeague,
  RessourceStadiumOffset,
  RessourceStadiumOffsetPriceCup,
  RessourceStadiumOffsetPriceFriendly,
  RessourceStadiumOffsetPriceLeague,
  RessourceStadiumOverallPriceCup,
  RessourceStadiumOverallPriceFriendly,
  RessourceStadiumOverallPriceLeague,
} from '../../Common/Ressource';
import { IStadiumBlocksSetting, StadiumBlocksSetting } from '../../Common/Settings/StadiumBlocksSetting';
import {
  IStadiumOverallEntryPricesSetting,
  StadiumOverallEntryPricesSetting,
} from '../../Common/Settings/StadiumOverallEntryPricesSetting';
import { IStadiumBlocks } from '../../Common/StadiumBlocks';
import { IStadiumEntryPrices } from '../../Common/StadiumEntryPrices';
import { IStadiumOverallEntryPrices } from '../../Common/StadiumOverallEntryPrices';
import { IDom } from '../../Common/Toolkit/Dom';
import { DOMHelper } from '../../Common/Toolkit/DOMHelper';
import { IExtendWebElement } from '../../Common/Toolkit/IExtendWebElement';
import { NumberHelper } from '../../Common/Toolkit/NumberHelper';
import { IUrl } from '../../Common/Toolkit/Url';
import { XPathAllResults } from '../../Common/Toolkit/XPathAllResults';
import { IXPathHtmlTableCell, XPathHtmlTableCell } from '../../Common/Toolkit/XPathHtmlTableCell';
import { XPathSingleResult } from '../../Common/Toolkit/XPathSingleResult';
import { XPathString } from '../../Common/Toolkit/XPathString';

export class StadiumManagerUi implements IExtendWebElement {
  private dom: IDom;
  private logger: IEasyLogger;
  private numberHelper = new NumberHelper();
  private webPageUrl: IUrl;
  private ofmStadiumMinPrice = 1;
  private ofmStadiumMaxPrice = 69;
  private ofmStadiumOffsetMinPrice = 0;
  private ofmStadiumOffsetMaxPrice = 68;
  private stadiumOverallEntryPrices: IStadiumOverallEntryPricesSetting;
  private stadiumBlocks: IStadiumBlocksSetting;
  /* ressources */
  private ressourceStadiumCurrencySign: String;
  private ressourceStadiumLeague: String;
  private ressourceStadiumFriendly: String;
  private ressourceStadiumCup: String;
  private ressourceStadiumOverallPriceLeague: String;
  private ressourceStadiumOverallPriceFriendly: String;
  private ressourceStadiumOverallPriceCup: String;
  private ressourceStadiumOffset: String;
  private ressourceStadiumOffsetPriceLeague: String;
  private ressourceStadiumOffsetPriceFriendly: String;
  private ressourceStadiumOffsetPriceCup: String;

  constructor(
    dom: IDom,
    webPageUrl: IUrl,
    logger: IEasyLogger
  ) {
    this.dom = dom;
    this.webPageUrl = webPageUrl;
    this.logger = logger;
    this.stadiumBlocks = new StadiumBlocksSetting();
    this.stadiumOverallEntryPrices = new StadiumOverallEntryPricesSetting();

    this.ressourceStadiumCurrencySign = new RessourceStadiumCurrencySign().value();
    this.ressourceStadiumLeague = new RessourceStadiumLeague().value();
    this.ressourceStadiumFriendly = new RessourceStadiumFriendly().value();
    this.ressourceStadiumCup = new RessourceStadiumCup().value();
    this.ressourceStadiumOverallPriceLeague = new RessourceStadiumOverallPriceLeague().value();
    this.ressourceStadiumOverallPriceFriendly = new RessourceStadiumOverallPriceFriendly().value();
    this.ressourceStadiumOverallPriceCup = new RessourceStadiumOverallPriceCup().value();
    this.ressourceStadiumOffset = new RessourceStadiumOffset().value();
    this.ressourceStadiumOffsetPriceLeague = new RessourceStadiumOffsetPriceLeague().value();
    this.ressourceStadiumOffsetPriceFriendly = new RessourceStadiumOffsetPriceFriendly().value();
    this.ressourceStadiumOffsetPriceCup = new RessourceStadiumOffsetPriceCup().value();
  }

  public targetUrl(): IUrl {
    return this.webPageUrl;
  }
  public getLocalisedString(key: string): string {
    var value = chrome.i18n.getMessage(key);
    return value;
  }
  public extend(): void {
    this.addPricingControlElements();
  }
  public addPricingControlElements(): void {
    this.logger.info("will extend stadium according to activated settings")
    this.stadiumOverallEntryPrices
      .overallEntryPrices()
      .then((overallEntryPrices) => {
        if (overallEntryPrices.activated()) {
          this.showOverallPricingControlElementsINTERN(overallEntryPrices);
          this.stadiumBlocks.blocks()
            .then((blocks: IStadiumBlocks) => {
              if (blocks.blocksPricesOffsetActivated()) {
                blocks.blocks().forEach(block => {
                  var tribuneTableCell = new XPathHtmlTableCell(
                    new XPathSingleResult<HTMLTableCellElement>(
                      new XPathAllResults(document,
                        new XPathString(block.xPathToTribune()))));
                  this.addStadiumEntryPricesOffsetControls(block.name().name(), block.pricesOffset(), tribuneTableCell);
                });
              }
            })
            .catch(e => { throw new Error(`Could not add controls for stadium blocks offset prices: ${e}`); });
        }
      })
      .catch(e => { this.logger.error(`Could not add controls for stadium overall prices: ${e}`); });
  }
  private showOverallPricingControlElementsINTERN(overallEntryPrices: IStadiumOverallEntryPrices): void {
    var overallPricingTable = this.createPricingTable(
      'overall',
      overallEntryPrices.prices(),
      this.ressourceStadiumOverallPriceLeague,
      this.ressourceStadiumLeague,
      this.ressourceStadiumOverallPriceFriendly,
      this.ressourceStadiumFriendly,
      this.ressourceStadiumOverallPriceCup,
      this.ressourceStadiumCup,
      this.ofmStadiumMinPrice,
      this.ofmStadiumMaxPrice
    );
    // find table where to put the overall pricing table
    // IMPORTANT: the last item of the XPATH must be 'table' or if included 'tbody'!
    var tblStadiumTribunes = new XPathSingleResult<HTMLTableElement>(
      new XPathAllResults(document,
        new XPathString("/html/body/div[1]/div/form/table")))
      .element();

    if (tblStadiumTribunes) {
      // add a new row for overall price table
      var rowNewOverallPrices = <HTMLTableRowElement>tblStadiumTribunes.insertRow(1);
      rowNewOverallPrices.setAttribute('align', 'center');
      rowNewOverallPrices.insertCell(0).appendChild(overallPricingTable);
    } else {
      this.logger.error('foxfm_stadium(): Could not get the table where to put the overall pricing table.');
    }
  }

  private addStadiumEntryPricesOffsetControls(blockNumber: String, prices: IStadiumEntryPrices, tribuneTableCell: IXPathHtmlTableCell) {
    var tribuneTable = tribuneTableCell.table();
    var blockTableCol = tribuneTableCell.columnIndex().valueOf();
    var blockTableRow = tribuneTableCell.rowIndex().valueOf();

    if (tribuneTable !== undefined && blockTableCol !== null && blockTableRow !== null) {
      var pricingTable = this.createPricingTable(
        blockNumber,
        prices,
        this.ressourceStadiumOffsetPriceLeague,
        null,
        this.ressourceStadiumOffsetPriceFriendly,
        null,
        this.ressourceStadiumOffsetPriceCup,
        null,
        this.ofmStadiumOffsetMinPrice,
        this.ofmStadiumOffsetMaxPrice
      );
      var lastRow = <HTMLTableRowElement>tribuneTable.rows[tribuneTable.rows.length - 1];
      var lastCell = lastRow.insertCell(-1);
      var header = document.createElement('B');
      header.setAttribute("class", "minitext dsR42");
      lastCell.appendChild(header);
      var headerText = document.createTextNode(this.ressourceStadiumOffset.valueOf());
      header.appendChild(headerText);
      lastCell.appendChild(pricingTable);
      // enlarge colspan of row containing name of tribune
      var cells = <HTMLTableRowElement>tribuneTable.rows[blockTableRow];
      var tableCell = <HTMLTableDataCellElement>cells.cells[blockTableCol];
      tableCell.colSpan = 6;
    } else {
      this.logger.warn(`Could not get tribune - will skip it block number: ${blockNumber}`);
    }
  }

  /*******************************************************************************
   * Name of function:		createPricingTable()
   * Arguments of function:	document
   * Description of function:	This function creates a new table with three rows
   *							containing each a dropdown. An event handler is 
   *							attached to each dropdown.
   */
  private createPricingTable(
    block: String,
    entryPrices: IStadiumEntryPrices,
    ddTooltipPriceLeague: String,
    ddLabelPriceLeague: String | null,
    ddTooltipPriceFriendly: String,
    ddLabelPriceFriendly: String | null,
    ddTooltipPriceCup: String,
    ddLabelPriceCup: String | null,
    ddMinPrice: Number,
    ddMaxPrice: Number
  ) {
    try {
      // get default price preferences
      var strPrefPriceLeague = 'stadium.' + block + 'PriceLeague';
      var strPrefPriceFriendly = 'stadium.' + block + 'PriceFriendly';
      var strPrefPriceCup = 'stadium.' + block + 'PriceCup';
      var ddPrefPriceLeague = entryPrices.league().price();
      var ddPrefPriceFriendly = entryPrices.friendly().price();
      var ddPrefPriceCup = entryPrices.cup().price();
      var newRowPriceLeague = this.createRowStadiumPrice('ddIdPriceLeague' + block, block, ddTooltipPriceLeague, ddPrefPriceLeague, ddLabelPriceLeague, ddMinPrice, ddMaxPrice);
      var newRowPriceFriendly = this.createRowStadiumPrice('ddIdPriceFriendly' + block, block, ddTooltipPriceFriendly, ddPrefPriceFriendly, ddLabelPriceFriendly, ddMinPrice, ddMaxPrice);
      var newRowPriceCup = this.createRowStadiumPrice('ddIdPriceCup' + block, block, ddTooltipPriceCup, ddPrefPriceCup, ddLabelPriceCup, ddMinPrice, ddMaxPrice);
      // attache event handler
      var ofmStadiumMinPrice = 0;
      var ofmStadiumMaxPrice = 68;
      newRowPriceLeague.addEventListener('change', (event: Event) => {
        this.eventMouseStadiumPricing(event, strPrefPriceLeague, ofmStadiumMinPrice, ofmStadiumMaxPrice);
      }, false);
      newRowPriceFriendly.addEventListener('change', (event: Event) => {
        this.eventMouseStadiumPricing(event, strPrefPriceFriendly, ofmStadiumMinPrice, ofmStadiumMaxPrice);
      }, false);
      newRowPriceCup.addEventListener('change', (event: Event) => {
        this.eventMouseStadiumPricing(event, strPrefPriceCup, ofmStadiumMinPrice, ofmStadiumMaxPrice);
      }, false);
      newRowPriceLeague.addEventListener('keyup', (event: KeyboardEvent) => {
        this.eventKeyStadiumPricing(event, strPrefPriceLeague, ofmStadiumMinPrice, ofmStadiumMaxPrice);
      }, false);
      newRowPriceFriendly.addEventListener('keyup', (event: KeyboardEvent) => {
        this.eventKeyStadiumPricing(event, strPrefPriceFriendly, ofmStadiumMinPrice, ofmStadiumMaxPrice);
      }, false);
      newRowPriceCup.addEventListener('keyup', (event: KeyboardEvent) => {
        this.eventKeyStadiumPricing(event, strPrefPriceCup, ofmStadiumMinPrice, ofmStadiumMaxPrice);
      }, false);
      // create pricing table
      var pricingTable = DOMHelper.createTable("0", "1");
      pricingTable.appendChild(newRowPriceLeague);
      pricingTable.appendChild(newRowPriceFriendly);
      pricingTable.appendChild(newRowPriceCup);
      return pricingTable;
    } catch (e) {
      throw e;
    }
  }

  private eventKeyStadiumPricing(event: KeyboardEvent, pref: string, minPrice: number, maxPrice: number): void {
    var eventTarget = event.srcElement ? event.srcElement : <HTMLElement>event.target;
    var eventTargetId = eventTarget.id;
    var eventKeycode = event.keyCode;
    var eventTargetName = eventTarget.getAttribute("name");
    if (eventKeycode >= 37 && eventKeycode <= 40) {
      this.changeStadiumPricesOnEvent(eventTargetId, new String(eventTargetName), minPrice, maxPrice);
    }
  }

  private eventMouseStadiumPricing(event: Event, pref: string, minPrice: number, maxPrice: number): void {
    var eventTarget = event.srcElement ? event.srcElement : <HTMLElement>event.target;
    var eventTargetId = eventTarget.id;
    var eventTargetName = eventTarget.getAttribute("name");
    this.changeStadiumPricesOnEvent(eventTargetId, new String(eventTargetName), minPrice, maxPrice);
  }

  private changeStadiumPricesOnEvent(eventTargetId: string, eventTargetName: String, minPrice: number, maxPrice: number) {
    var gameType = this.getTypeOfGame(eventTargetId);
    // get overall ticket price
    var overallPriceSelector = <HTMLSelectElement>document.getElementById('ddIdPrice' + gameType.name() + 'overall');
    var overallPrice = overallPriceSelector.selectedIndex;

    this.stadiumBlocks.stadiumBlockByName(eventTargetName)
      .then((blockOfStadium) => {
        /* handle changes of the offset price */
        this.logger.info(`Will handle price change of block '${blockOfStadium.name().name()}'.`);
        var offsetPrice = this.getStadiumOffsetStadiumPriceOfBlock(gameType, blockOfStadium.name().name());
        var newPrice = NumberHelper.coerce(minPrice, maxPrice, overallPrice + offsetPrice);
        this.setStadiumPriceOfBlock(gameType, blockOfStadium.name().name(), newPrice);
        this.stadiumBlocks.changeBlockEntryPricesOffset(blockOfStadium.name(), gameType, offsetPrice);
      }).catch(() => {
        /* if no block could be found, it is expected that the overall price had been changed --> handle changes of the overall price */
        /* TODO: make this case "nicer" */
        this.logger.info(`Will handle overall price change of kind '${gameType.name()}'.`);
        this.stadiumBlocks.blocks().then((blocks) => {
          for (var i = 0; i < blocks.blocks().length; i++) {
            var offsetPrice = this.getStadiumOffsetStadiumPriceOfBlock(gameType, blocks.blocks()[i].name().name());
            var newPrice = NumberHelper.coerce(minPrice, maxPrice, overallPrice + offsetPrice);
            this.setStadiumPriceOfBlock(gameType, blocks.blocks()[i].name().name(), newPrice);
          }
          this.stadiumOverallEntryPrices.changeOverallEntryPrice(gameType, overallPrice);
        });
      });
  }

  private getStadiumOffsetStadiumPriceOfBlock(gameType: IGameKind, block: String): number {
    var offsetPrice = 0;
    var idOfOffsetPrice = 'ddIdPrice' + gameType.name() + block;
    if (document.getElementById(idOfOffsetPrice)) {
      var offsetPrice1 = <HTMLSelectElement>(document.getElementById(idOfOffsetPrice));
      offsetPrice = offsetPrice1.selectedIndex;
    }
    return offsetPrice;
  }

  private setStadiumPriceOfBlock(gameType: IGameKind, block: String, price: number): void {
    try {
      var newBlockCore: string;
      switch (gameType.name()) {
        case new GameKindLeague().name():
          newBlockCore = 'block_price[' + block + '][epreis]';
          break;
        case new GameKindFriendly().name():
          newBlockCore = 'block_price[' + block + '][epreisfr]';
          break;
        case new GameKindCup().name():
          newBlockCore = 'block_price[' + block + '][epreispok]';
          break;
        default:
          throw new Error(`Error determining the type of game ${gameType} to set the correspondent price ${price} in the block ${block}`); 
      }
      var blockPriceSelectElement = <HTMLSelectElement>document.getElementsByName(newBlockCore)[0];
      var priceOptionElement = <HTMLOptionElement>blockPriceSelectElement.options[price];
      priceOptionElement.selected = true;
    } catch (e) {
      this.logger.error(e);
    }
  }
  private createDropDownPrice(dropdownId: string, ddName: String, dropdownTooltip: String, dropdownDefault: Number, ddMinPrice: Number, ddMaxPrice: Number) {
    try {
      var newSelect = DOMHelper.createDropdown(dropdownId, ddName.valueOf(), 'forminput_60px', 'width:50px;', dropdownTooltip.valueOf());
      for (var i = ddMinPrice.valueOf(); i <= ddMaxPrice.valueOf(); i++) {
        var localeCurrencySign = this.getLocalisedString("currencysign");
        var newOption = document.createElement('option');
        newOption.text = `${i} ${localeCurrencySign}`;
        newOption.id = dropdownId + '_' + i;
        newSelect.add(newOption, undefined);
      }
      if (dropdownDefault < this.ofmStadiumMaxPrice) {
        var priceOptionElement = <HTMLOptionElement>newSelect.options[dropdownDefault.valueOf()];
        priceOptionElement.selected = true;
      }
      return newSelect;
    } catch (e) {
      throw `createDropDownPrice(): ${e}`;
    }
  }

  private createRowStadiumPrice(selectId: string, selectName: String, selectTooltip: String, selectDefault: Number, label: String | null, selectMinPrice: Number, selectMaxPrice: Number) {
    try {
      var newSelect = this.createDropDownPrice(selectId, selectName, selectTooltip, selectDefault, selectMinPrice, selectMaxPrice);
      var newCellDropdown = document.createElement("td");
      newCellDropdown.appendChild(newSelect);
      var newRow = DOMHelper.createRow();
      if (label) {
        let labelCell = document.createElement("td");
        labelCell.textContent = label.valueOf();
        labelCell.setAttribute("class", "minitext")
        newRow.appendChild(labelCell);
      }
      newRow.appendChild(newCellDropdown);
      return newRow;
    } catch (error) {
      throw `${this.createRowStadiumPrice.name}: ${error}`;
    }
  }

  private getTypeOfGame(type: string): IGameKind {
    if (type.match(/\wleague\w/i)) {
      return new GameKindLeague();
    } else if (type.match(/\wfriendly\w/i)) {
      return new GameKindFriendly();
    } else if (type.match(/\wcup\w/i)) {
      return new GameKindCup();
    }
    throw `${this.getTypeOfGame.name}: Could not determine kind of game!`;
  }
}
