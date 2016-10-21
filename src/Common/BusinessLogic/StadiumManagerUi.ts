import { LoggerInterface, LogLevel } from "../CrossCutting/Logger/LoggerInterface"
import { NumberHelper } from "../CrossCutting/Toolkit/NumberHelper"
import { XPathHelper } from "../CrossCutting/Toolkit/XPathHelper"
import { DOMHelper } from "../CrossCutting/Toolkit/DOMHelper"
import { IGameKind } from '../DataAccess/GameKind';
import { GameKindLeague, GameKindFriendly, GameKindCup } from '../DataAccess/GameKind';
import { IStadiumBlocks } from "../../Common/DataAccess/StadiumBlocks"
import { IStadiumBlocksSetting } from "../../Common/DataAccess/StadiumBlocksSetting"
import { StadiumBlocksSetting } from "../../Common/DataAccess/StadiumBlocksSetting"
import { IStadiumOverallEntryPrices } from "../../Common/DataAccess/StadiumOverallEntryPrices"
import { IStadiumOverallEntryPricesSetting } from "../../Common/DataAccess/StadiumOverallEntryPricesSetting"
import { StadiumOverallEntryPricesSetting } from "../../Common/DataAccess/StadiumOverallEntryPricesSetting"
import { StadiumEntryPrice } from "../../Common/DataAccess/StadiumEntryPrice"
import { IStadiumEntryPrices } from "../../Common/DataAccess/StadiumEntryPrices"

import { RessourceStadiumCurrencySign } from "../../Common/DataAccess/Ressource"
import { RessourceStadiumLeague } from "../../Common/DataAccess/Ressource"
import { RessourceStadiumFriendly } from "../../Common/DataAccess/Ressource"
import { RessourceStadiumCup } from "../../Common/DataAccess/Ressource"
import { RessourceStadiumOverallPriceLeague } from "../../Common/DataAccess/Ressource"
import { RessourceStadiumOverallPriceFriendly } from "../../Common/DataAccess/Ressource"
import { RessourceStadiumOverallPriceCup } from "../../Common/DataAccess/Ressource"
import { RessourceStadiumOffset } from "../../Common/DataAccess/Ressource"
import { RessourceStadiumOffsetPriceLeague } from "../../Common/DataAccess/Ressource"
import { RessourceStadiumOffsetPriceFriendly } from "../../Common/DataAccess/Ressource"
import { RessourceStadiumOffsetPriceCup } from "../../Common/DataAccess/Ressource"

export class StadiumManagerUi {
  private log: LoggerInterface;
  private numberHelper = new NumberHelper();
  private thisModule: string = "StadiumManagerUi";
  private ofmUrlStadium: string = "stadium/stadium.php";
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
    logger: LoggerInterface,
  ) {
    this.log = logger;
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

  public getLocalisedString(key: string): string {
    var value = chrome.i18n.getMessage(key);
    return value;
  }

  public addPricingControlElements(): void {
    try {
      this.info("started: " + window.document.location.href + ": " + window.document.location.href.match(this.ofmUrlStadium));
      if (window.document.location.href.match(this.ofmUrlStadium)) {
        this.stadiumOverallEntryPrices
          .overallEntryPrices()
          .then((overallEntryPrices) => {
            if (overallEntryPrices.activated()) {
              this.showOverallPricingControlElementsINTERN(overallEntryPrices);
              this.stadiumBlocks.blocks()
                .then((blocks: IStadiumBlocks) => {
                  this.addStadiumEntryPricesOffsetControls(blocks);
                })
                .catch((error) => {
                  this.error(`Could not add controls for stadium blocks offset prices: ${error}`);
                });
            }
          })
          .catch((error) => {
            this.error(`Could not add controls for stadium overall prices: ${error}`);
          });
      }
    } catch (error) {
      throw error;
    }
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
    var tableByXpath = '/html/body[1]/div[1]/div[1]/form[1]/table[1]/tbody[1]';
    var tblStadiumTribunes = XPathHelper.getTableByXpath(tableByXpath);
    if (tblStadiumTribunes) {
      // add a new row for overall price table
      var rowNewOverallPrices = <HTMLTableRowElement>tblStadiumTribunes.insertRow(1);
      rowNewOverallPrices.setAttribute('align', 'center');
      rowNewOverallPrices.insertCell(0).appendChild(overallPricingTable);
    } else {
      this.error('foxfm_stadium(): Could not get the table where to put the overall pricing table.');
    }
  }

  private addStadiumEntryPricesOffsetControls(blocks: IStadiumBlocks) {
    // add offset price table if activated
    if (blocks.blocksPricesOffsetActivated()) {
      var arrayTribuneXpath = new Array(
        '/html/body[1]/div[1]/div[1]/form[1]/table[1]/tbody[1]/tr[3]/td[1]/table[1]/tbody[1]/tr[1]/td[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr[1]/td[1]/div[1]/span[1]',
        '/html/body[1]/div[1]/div[1]/form[1]/table[1]/tbody[1]/tr[3]/td[1]/table[1]/tbody[1]/tr[1]/td[2]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr[1]/td[1]/div[1]/span[1]',
        '/html/body[1]/div[1]/div[1]/form[1]/table[1]/tbody[1]/tr[3]/td[1]/table[1]/tbody[1]/tr[2]/td[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr[1]/td[1]',
        '/html/body[1]/div[1]/div[1]/form[1]/table[1]/tbody[1]/tr[3]/td[1]/table[1]/tbody[1]/tr[2]/td[2]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr[1]/td[1]/div[1]/span[1]'
      );
      for (var i = 0; i < arrayTribuneXpath.length; i++) {
        // find table where to put the pricing table
        var tribuneXpath = arrayTribuneXpath[i];
        var tribuneTable = XPathHelper.getTableByXpath(tribuneXpath);
        var blockTableCol = XPathHelper.getColumnNumberByXPATH(document, tribuneXpath);
        var blockTableRow = XPathHelper.getRowNumberByXPATH(document, tribuneXpath);
        if (tribuneTable !== undefined && blockTableCol !== null && blockTableRow !== null) {
          var prices = blocks.blocks();
          var blockNumber = prices[i].name().name();
          var pricingTable = this.createPricingTable(
            blockNumber,
            prices[i].pricesOffset(),
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
          var header = DOMHelper.createElement('B', null, null, 'minitext dsR42', null, null, null);
          lastCell.appendChild(header);
          var headerText = document.createTextNode(this.ressourceStadiumOffset.valueOf());
          header.appendChild(headerText);
          lastCell.appendChild(pricingTable);
          // enlarge colspan of row containing name of tribune
          var cells = <HTMLTableRowElement>tribuneTable.rows[blockTableRow];
          var tableCell = <HTMLTableDataCellElement>cells.cells[blockTableCol];
          tableCell.colSpan = 6;
        } else {
          this.warn('Could not get tribune - will skip it: ' + tribuneXpath);
        }
      }
      // change width of table containing stadium - find by attribute 'bgcolor' using XPath
      var xpathToStadiumRenameHeader = "/html/body/div[1]/div/form/div[1]";
      var result = XPathHelper.getXpathResult(xpathToStadiumRenameHeader);
      if (result.snapshotLength == 1) {
        var element = <HTMLElement>result.snapshotItem(0);
        element.style.width = "758px";
      }
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
    ddLabelPriceLeague: String,
    ddTooltipPriceFriendly: String,
    ddLabelPriceFriendly: String,
    ddTooltipPriceCup: String,
    ddLabelPriceCup: String,
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
      this.changeStadiumPricesOnEvent(eventTargetId, eventTargetName, minPrice, maxPrice);
    }
  }

  private eventMouseStadiumPricing(event: Event, pref: string, minPrice: number, maxPrice: number): void {
    var eventTarget = event.srcElement ? event.srcElement : <HTMLElement>event.target;
    var eventTargetId = eventTarget.id;
    var eventTargetName = eventTarget.getAttribute("name");
    this.changeStadiumPricesOnEvent(eventTargetId, eventTargetName, minPrice, maxPrice);
  }

  private changeStadiumPricesOnEvent(eventTargetId: string, eventTargetName: string, minPrice: number, maxPrice: number) {
    var gameType = this.getTypeOfGame(eventTargetId);
    // get overall ticket price
    var overallPriceSelector = <HTMLSelectElement>document.getElementById('ddIdPrice' + gameType.name() + 'overall');
    var overallPrice = overallPriceSelector.selectedIndex;

    this.stadiumBlocks.stadiumBlockByName(eventTargetName).then((blockOfStadium) => {
      /* handle changes of the offset price */
      this.info(`Will handle price change of block '${blockOfStadium.name().name()}'.`);
      var offsetPrice = this.getStadiumOffsetStadiumPriceOfBlock(gameType, blockOfStadium.name().name());
      var newPrice = NumberHelper.coerce(minPrice, maxPrice, overallPrice + offsetPrice);
      this.setStadiumPriceOfBlock(gameType, blockOfStadium.name().name(), newPrice);
      this.stadiumBlocks.changeBlockEntryPricesOffset(blockOfStadium.name(), gameType, offsetPrice);
    }).catch(() => {
      /* if no block could be found, it is expected that the overall price had been changed --> handle changes of the overall price */
      /* TODO: make this case "nicer" */
      this.info(`Will handle overall price change of kind '${gameType.name()}'.`);
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
    try {
      var offsetPrice = 0;
      var idOfOffsetPrice = 'ddIdPrice' + gameType.name() + block;
      if (document.getElementById(idOfOffsetPrice)) {
        var offsetPrice1 = <HTMLSelectElement>(document.getElementById(idOfOffsetPrice));
        offsetPrice = offsetPrice1.selectedIndex;
      }
      return offsetPrice;
    } catch (e) {
      this.error(e);
    }
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
      }
      var blockPriceSelectElement = <HTMLSelectElement>document.getElementsByName(newBlockCore)[0];
      var priceOptionElement = <HTMLOptionElement>blockPriceSelectElement.options[price];
      priceOptionElement.selected = true;
    } catch (e) {
      this.error(e);
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
        newSelect.add(newOption, null);
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

  private createRowStadiumPrice(selectId: string, selectName: String, selectTooltip: String, selectDefault: Number, label: String, selectMinPrice: Number, selectMaxPrice: Number) {
    try {
      var newSelect = this.createDropDownPrice(selectId, selectName, selectTooltip, selectDefault, selectMinPrice, selectMaxPrice);
      var newCellDropdown = DOMHelper.createCell(null, null, null, null, null, null);
      newCellDropdown.appendChild(newSelect);
      var newRow = DOMHelper.createRow();
      if (label) {
        var cellLabel = `<font color="black">${label}:</font>`;
        var newCellLabel = DOMHelper.createCell(null, null, null, label.valueOf(), null, 'minitext');
        newRow.appendChild(newCellLabel);
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

  private info(msg: string): void {
    this.log.info(this.thisModule, msg);
  }

  private warn(msg: string): void {
    this.log.warn(this.thisModule, msg);
  }

  private error(msg: string): void {
    this.log.error(this.thisModule, msg);
  }

  private debug(msg: string): void {
    this.log.debug(this.thisModule, msg);
  }
}
