/// <reference path="../../allReferences.ts" />
import {LoggerInterface, LogLevel} from "../CrossCutting/Logger/LoggerInterface"

export class StadiumManagerUi {
    private log: LoggerInterface;
    private numberHelper = new NumberHelper();
    private settingsManager: SettingsManagerInterface;
    private thisModule: string = "StadiumManagerUi";
    private ofmUrlStadium: string = "stadium/stadium.php";
    private ofmStadiumMinPrice = 1;
    private ofmStadiumMaxPrice = 69;

    constructor(logger: LoggerInterface, settingsManager: SettingsManagerInterface) {
        this.log = logger;
        this.settingsManager = settingsManager;
    }

    public getLocalisedString(key: string): string {
        var value = chrome.i18n.getMessage(key);
        return value;
    }

    public showOverallPricingControlElements(): void {
        this.info("started");
        var addOverallPrices = true; //prefBranchOFMFunctionSettings.get('stadium.addOverallPrices');
        var addOffsetPrices = true; //prefBranchOFMFunctionSettings.get('stadium.addOffsetPrices');
        try {
            if (window.document.location.href.match(this.ofmUrlStadium) && this.settingsManager.appSettings.stadium.addOverallPrices) {
                // get localisation strings
                var localeLeague = this.getLocalisedString("league");
                var localeFriendly = this.getLocalisedString("friendly");
                var localeCup = this.getLocalisedString("cup");

                var tooltipGeneralPriceLeague = this.getLocalisedString("generalpriceleague");
                var tooltipGeneralPriceFriendly = this.getLocalisedString("generalpricefriendly");
                var tooltipGeneralPriceCup = this.getLocalisedString("generalpricecup");

                var overallPricingTable = this.createPricingTable('overall', tooltipGeneralPriceLeague, localeLeague, tooltipGeneralPriceFriendly, localeFriendly, tooltipGeneralPriceCup, localeCup);
       
                // find table where to put the overall pricing table
                // IMPORTANT: the last item of the XPATH must be 'table' or if included 'tbody'!
                var tableByXpath = '/html/body[1]/div[1]/div[1]/form[1]/table[1]/tbody[1]';
                var tblStadiumTribunes = XPathHelper.getTableByXpath(tableByXpath);
                if (tblStadiumTribunes) {
                    // add a new row for overall price table
                    var rowNewOverallPrices = <HTMLTableRowElement>tblStadiumTribunes.insertRow(1);
                    rowNewOverallPrices.setAttribute('align', 'center');
                    rowNewOverallPrices.insertCell(0).appendChild(overallPricingTable);
                    // add offset price table if activated
                    if (addOffsetPrices) {
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
                                // get localisation strings
                                var localeOffset = "Aufschlag";
                                var localeOffsetLeague = "A L";
                                var localeOffsetFriendly = "A F";
                                var localeOffsetCup = "A C";
                                var blockNumber = i + 1;
                                var pricingTable = this.createPricingTable('block' + blockNumber + 'Offset', localeOffsetLeague, null, localeOffsetFriendly, null, localeOffsetCup, null);
                                var lastRow = <HTMLTableRowElement>tribuneTable.rows[tribuneTable.rows.length - 1];
                                var lastCell = lastRow.insertCell(-1);
                                var header = DOMHelper.createElement('B', null, null, 'minitext dsR42', null, null, null);
                                lastCell.appendChild(header);
                                var headerText = document.createTextNode(localeOffset);
                                header.appendChild(headerText);
                                lastCell.appendChild(pricingTable);
                                // enlarge colspan of row containing name of tribune
                                var cells = <HTMLTableRowElement>tribuneTable.rows[blockTableRow];
                                var tableCell = <HTMLTableDataCellElement>cells.cells[blockTableCol];
                                tableCell.colSpan = 6;
                            } else {
                                this.warn(': Could not get tribune - will skip it: ' + tribuneXpath);
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
                } else {
                    this.error('foxfm_stadium(): Could not get the table where to put the overall pricing table.');
                }
            }
        } catch (e) {
            this.error(e)
        }
    }

    /*******************************************************************************
     * Name of function:		createPricingTable()
     * Arguments of function:	document
     * Description of function:	This function creates a new table with three rows
     *							containing each a dropdown. An event handler is 
     *							attached to each dropdown.
     */
    private createPricingTable(block: string, ddTooltipPriceLeague: string, ddLabelPriceLeague: string, ddTooltipPriceFriendly: string, ddLabelPriceFriendly: string, ddTooltipPriceCup: string, ddLabelPriceCup: string) {
        try {
            // get default price preferences
            var strPrefPriceLeague = 'stadium.' + block + 'PriceLeague';
            var strPrefPriceFriendly = 'stadium.' + block + 'PriceFriendly';
            var strPrefPriceCup = 'stadium.' + block + 'PriceCup';
            var ddPrefPriceLeague = 1; //prefBranchOFMFunctionSettings.get(strPrefPriceLeague);
            var ddPrefPriceFriendly = 1; //prefBranchOFMFunctionSettings.get(strPrefPriceFriendly);
            var ddPrefPriceCup = 1; //prefBranchOFMFunctionSettings.get(strPrefPriceCup);
            var newRowPriceLeague = this.createRowStadiumPrice('ddIdPriceLeague' + block, ddTooltipPriceLeague, ddPrefPriceLeague, ddLabelPriceLeague);
            var newRowPriceFriendly = this.createRowStadiumPrice('ddIdPriceFriendly' + block, ddTooltipPriceFriendly, ddPrefPriceFriendly, ddLabelPriceFriendly);
            var newRowPriceCup = this.createRowStadiumPrice('ddIdPriceCup' + block, ddTooltipPriceCup, ddPrefPriceCup, ddLabelPriceCup);
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
            this.error(e);
        }
    }

    private eventKeyStadiumPricing(event: KeyboardEvent, pref: string, minPrice: number, maxPrice: number): void {
        var eventTarget = event.srcElement ? event.srcElement : <HTMLElement>event.target;
        var eventTargetId = eventTarget.id;
        var eventKeycode = event.keyCode;
        if (eventKeycode >= 37 && eventKeycode <= 40) {
            this.changeStadiumPricesOnEvent(eventTargetId, minPrice, maxPrice);
        }
    }

    private eventMouseStadiumPricing(event: Event, pref: string, minPrice: number, maxPrice: number): void {
        var eventTarget = event.srcElement ? event.srcElement : <HTMLElement>event.target;
        var eventTargetId = eventTarget.id;
        this.changeStadiumPricesOnEvent(eventTargetId, minPrice, maxPrice);
    }

    private changeStadiumPricesOnEvent(eventTargetId: string, minPrice: number, maxPrice: number) {
        var gameType = this.getTypeOfGame(eventTargetId);
        var blockOfStadium = this.getStadiumBlock(eventTargetId);
        // get overall ticket price
        var overallPriceSelector = <HTMLSelectElement>document.getElementById('ddIdPrice' + gameType + 'overall');
        var overallPrice = overallPriceSelector.selectedIndex;

        if (blockOfStadium) {
            /* handle changes of the offset price */
            var offsetPrice = this.getStadiumOffsetStadiumPriceOfBlock(gameType, blockOfStadium);
            var newPrice = NumberHelper.coerce(minPrice, maxPrice, overallPrice + offsetPrice);
            this.setStadiumPriceOfBlock(gameType, blockOfStadium, newPrice);
            // TODO: set setting                    
            // prefBranchOFMFunctionSettings.set(pref, offsetPrice.toString());
        } else {
            /* handle changes of the overall price */
            for (var i = 1; i < 5; i++) {
                var offsetPrice = this.getStadiumOffsetStadiumPriceOfBlock(gameType, i);
                var newPrice = NumberHelper.coerce(minPrice, maxPrice, overallPrice + offsetPrice);
                this.setStadiumPriceOfBlock(gameType, i, newPrice);
                // TODO: set setting
                // prefBranchOFMFunctionSettings.set(pref, overallPrice.toString());
            }
        }
    }

    private getStadiumOffsetStadiumPriceOfBlock(gameType: string, block: number): number {
        try {
            var offsetPrice = 0;
            var idOfOffsetPrice = 'ddIdPrice' + gameType + 'block' + block + 'Offset';
            if (document.getElementById(idOfOffsetPrice)) {
                var offsetPrice1 = <HTMLSelectElement>(document.getElementById(idOfOffsetPrice));
                offsetPrice = offsetPrice1.selectedIndex + 1;
            }
            return offsetPrice;
        } catch (e) {
            this.error(e);
        }
    }

    private setStadiumPriceOfBlock(gameType: string, block: number, price: number): void {
        try {
            var newBlockCore: string;
            switch (gameType) {
                case 'League':
                    newBlockCore = 'block_price[' + block + '][epreis]';
                    break;
                case 'Friendly':
                    newBlockCore = 'block_price[' + block + '][epreisfr]';
                    break;
                case 'Cup':
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

    private createDropDownPrice(dropdownId: string, dropdownTooltip: string, dropdownDefault: number) {
        try {
            var newSelect = DOMHelper.createDropdown(dropdownId, null, 'forminput_60px', 'width:50px;', dropdownTooltip);
            for (var i = this.ofmStadiumMinPrice; i <= this.ofmStadiumMaxPrice; i++) {
                var localeCurrencySign = this.getLocalisedString("currencysign");
                var newOption = document.createElement('option');
                newOption.text = `${i} ${localeCurrencySign}`;
                newOption.id = dropdownId + '_' + i;
                newSelect.add(newOption, null);
            }
            if (dropdownDefault < this.ofmStadiumMaxPrice) {
                var priceOptionElement = <HTMLOptionElement>newSelect.options[dropdownDefault];
                priceOptionElement.selected = true;
            }
            return newSelect;
        } catch (e) {
            this.error(e);
        }
    }

    private createRowStadiumPrice(selectId: string, selectTooltip: string, selectDefault: number, label: string) {
        var newSelect = this.createDropDownPrice(selectId, selectTooltip, selectDefault);
        var newCellDropdown = DOMHelper.createCell(null, null, null, null, null, null);
        newCellDropdown.appendChild(newSelect);
        var newRow = DOMHelper.createRow();
        if (label) {
            var cellLabel = `<font color="black">${label}:</font>`;
            var newCellLabel = DOMHelper.createCell(null, null, null, label, null, 'minitext');
            newRow.appendChild(newCellLabel);
        }
        newRow.appendChild(newCellDropdown);
        return newRow;
    }

    private getTypeOfGame(type: string): string {
        var typeOfGame: string;
        if (type.match(/\wleague\w/i)) {
            typeOfGame = 'League';
        } else if (type.match(/\wfriendly\w/i)) {
            typeOfGame = 'Friendly';
        } else if (type.match(/\wcup\w/i)) {
            typeOfGame = 'Cup';
        }
        return typeOfGame;
    }

    private getStadiumBlock(block: string): number {
        var blockOfStadium: number;
        if (block.match(/\wblock1\w*/i)) {
            blockOfStadium = 1;
        } else if (block.match(/\wblock2\w/i)) {
            blockOfStadium = 2;
        } else if (block.match(/\wblock3\w/i)) {
            blockOfStadium = 3;
        } else if (block.match(/\wblock4\w/i)) {
            blockOfStadium = 4;
        } else {
            this.info('getStadiumBlock(' + block + '): no block could be identfied');
        }
        return blockOfStadium;
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
