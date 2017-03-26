import { LoggerInterface } from "../Common/Logger/LoggerInterface"
import { Logger } from "../Common/Logger/Logger"
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModulesSetting } from '../Common/Logger/RegisteredLoggingModulesSetting';
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { IRessource } from '../Common/Ressource';
import { Ressource } from '../Common/Ressource';
import { NumberHelper } from "../Common/Toolkit/NumberHelper"
import { IStrengthLevels } from "../Common/StrengthLevels"
import { IStrengthLevelsSetting } from "../Common/StrengthLevelsSetting"

import { XPathAllResults } from "../Common/Toolkit/XPathAllResults"
import { XPathSingleResult } from "../Common/Toolkit/XPathSingleResult"
import { XPathHtmlTableCell } from "../Common/Toolkit/XPathHtmlTableCell"

export class TeamUi {
  private log: LoggerInterface;
  private loggingModule: IRegisteredLoggingModule;
  private ofmUrlTeam: string = "team/players.php";
  private strengthLevelsSetting: IStrengthLevelsSetting;

  private ressourceCurrentStrength: IRessource;
  private ressourceAwpsToNextStrength: IRessource;
  private ressourceNextStrength: IRessource;

  constructor(logger: LoggerInterface, strengthLevelsSetting: IStrengthLevelsSetting) {
    this.log = logger;
    this.loggingModule = new RegisteredLoggingModule("TeamUi", new LogLevelError());
    this.log.registerModuleForLogging(this.loggingModule);
    this.strengthLevelsSetting = strengthLevelsSetting;

    this.ressourceCurrentStrength = new Ressource("ofmTeamPageCurrentStrength");
    this.ressourceAwpsToNextStrength = new Ressource("ofmTeamPageAwpsToNextStrength");
    this.ressourceNextStrength = new Ressource("ofmTeamPageNextStrength");
  }

  public addAdditionalInformation(doc: Document) {
    try {
      var aColGroup;
      var lvlCol, awpCol;

      this.info("called from: " + doc.location.href + ": " + doc.location.href.match(this.ofmUrlTeam));
      if (doc.location.href.match(this.ofmUrlTeam)) {
        this.info('started');
        // get table of the team
        var teamTable = this.foxfm_team_getTeamTable(doc);
        if (teamTable) {
          var awpHeaderCell = new XPathHtmlTableCell(
            new XPathSingleResult<HTMLTableCellElement>(
              new XPathAllResults(doc, "//./table[1]/thead[1]/tr[1]/th[15]")));
          var strengthHeaderCell = new XPathHtmlTableCell(
            new XPathSingleResult<HTMLTableCellElement>(
              new XPathAllResults(doc, "//./table[1]/thead[1]/tr[1]/th[10]")));
          lvlCol = strengthHeaderCell.columnIndex();
          awpCol = awpHeaderCell.columnIndex();
          if (awpCol >= 0 && lvlCol >= 0) {
            this.info("strength: " + lvlCol + ", AWPs: " + awpCol);
            var newColCurrStrength = awpCol + 2;
            var newColAWPDiff = awpCol + 3;
            var newColNextStrength = awpCol + 4;
            // extend the HTML element 'colgroup'
            aColGroup = teamTable.getElementsByTagName('colgroup');
            var col1 = doc.createElement('col');
            var col2 = doc.createElement('col');
            var col3 = doc.createElement('col');
            col1.id = 'foxfm_idTblColgroupTeam_CurrStrength';
            col2.id = 'foxfm_idTblColgroupTeam_AWPDiff';
            col3.id = 'foxfm_idTblColgrouppTeam_NextStrength';
            aColGroup[0].insertBefore(col1, aColGroup[0].children[newColCurrStrength]);
            aColGroup[0].insertBefore(col2, aColGroup[0].children[newColAWPDiff]);
            aColGroup[0].insertBefore(col3, aColGroup[0].children[newColNextStrength]);
            if (awpCol >= 0) {
              var headerRow = awpHeaderCell.rowIndex();
              this.debug("calling: addCurrLvlAwpsDiffNextLvl(" + headerRow + ", " + awpCol + ", " + (awpCol + 1) + ", " + (awpCol + 2) + ", " + (awpCol + 3) + ")");
              this.strengthLevelsSetting
                .strengthLevels()
                .then(strengthLevels =>
                  this.addCurrLvlAwpsDiffNextLvl(doc, teamTable, headerRow, null, lvlCol, null, null, awpCol, newColCurrStrength, newColAWPDiff, newColNextStrength, strengthLevels));
            }
            // extend 'colspan' in footer by the 3 added columns
            var teamTable_tFoot = teamTable.getElementsByTagName('tfoot')[0];
            var teamTable_tFoot_3rdCol_colspan = teamTable_tFoot.rows[0].cells[2].getAttribute('colspan');
            var teamTable_tFoot_3rdCol_colspan_new = teamTable_tFoot_3rdCol_colspan + 3;
            teamTable_tFoot.rows[0].cells[2].setAttribute('colspan', teamTable_tFoot_3rdCol_colspan_new);
            this.foxfm_team_changeTeamTableStyleWidth(doc, 178);
          } else {
            this.error('Could not determine AWP/Up or Strength column.');
          }
        }
        /*
        foxfm_team_addContractCosts(doc);
        foxfm_team_contractDurationWarning(doc);
        foxfm_team_contractDurationRenewAdvice(doc);
        foxfm_team_warningOnPlayerAge(doc);
        */
      }
    } catch (e) {
      throw `Error while adding additional information to team table: ${e}`;
    }
  }

  private foxfm_team_getTeamTable(document: Document) {
    var tblTeam = null;
    try {
      this.info('foxfm_team_getTeamTable(): started');
      tblTeam = document.getElementById('playerTable');
      if (!tblTeam) {
        throw 'foxfm_team_getTeamTable(): could not find OFM Team table';
      }
    } catch (e) {
      this.error(e);
    }
    return tblTeam;
  }


  private addCurrLvlAwpsDiffNextLvl(doc, playerTable, headerRow, ignoreRow, lvlCol, epCol, tpCol, awpCol, newColCurrLvl, newColAwpDiff, newColNextLvl, strengthLevels: IStrengthLevels) {
    // alert("foxfm::addCurrLvlAwpsDiffNextLvl: newColNextLvl - " + newColNextLvl);
    if (newColCurrLvl) {
      this.addCell(doc, playerTable, headerRow, newColCurrLvl, 'foxfm_idTblHdrTeam_CurrStrength', this.ressourceCurrentStrength.value(), 'textCenter sorting_disabled bold', 'center', '', '70');
    }
    if (newColAwpDiff) {
      this.addCell(doc, playerTable, headerRow, newColAwpDiff, 'foxfm_idTblHdrTeam_AWPDiff', this.ressourceAwpsToNextStrength.value(), 'textCenter sorting_disabled bold', 'center', '', '50');
    }
    if (newColNextLvl) {
      this.addCell(doc, playerTable, headerRow, newColNextLvl, 'foxfm_idTblHdrTeam_NextStrength', this.ressourceNextStrength.value(), 'textCenter sorting_disabled bold', 'center', 'text-align:right;', '70');
    }
    var awp = NaN, tp = NaN, ep = NaN;
    // for(var j=headerRow+1; j<headerRow+2; j++) // for debugging: only run throught the first row
    for (var j = headerRow + 1; j < playerTable.rows.length; j++) {
      // alert(playerTable.rows[j].cells[awpCol].innerHTML);
      try {
        this.info('addCurrLvlAwpsDiffNextLvl(): row: ' + j);
        if (j != ignoreRow) {
          // get the awp of the player - either from the given column or calculate it from TPs and EPs
          if (awpCol) {
            awp = NumberHelper.getNumberFromNode(playerTable.rows[j].cells[awpCol]);
          } else {
            ep = NumberHelper.getNumberFromNode(playerTable.rows[j].cells[epCol]);
            tp = NumberHelper.getNumberFromNode(playerTable.rows[j].cells[tpCol]);
            awp = NumberHelper.getAWP(ep, tp);
          }
          this.info('addCurrLvlAwpsDiffNextLvl(): AWP: ' + awp);
          if (awp !== null) {
            var newCurrLvl = strengthLevels.strengthLevelByAwp(awp).strengthLevel().valueOf();
            var currLvl = NumberHelper.getNumberFromNode(playerTable.rows[j].cells[lvlCol]);
            var diffLvl = newCurrLvl - currLvl;
            // alert("addCurrLvlAwpsDiffNextLvl(): TP: " + tp + "; EP: " + ep + "; AWP: " + awp + "; CurrLvl: " + currLvl + "; new CurrentLvl: " + newCurrLvl);
            this.addCell(doc, playerTable, j, newColCurrLvl, null, newCurrLvl + '(' + diffLvl + ')', 'textRight table-middle green', 'padding-right:5px', '', '');
            var awpsNextStrength = strengthLevels.strengthLevel(newCurrLvl + 1).awpPoints().valueOf();
            this.addCell(doc, playerTable, j, newColAwpDiff, null, awp - awpsNextStrength, 'textRight table-middle green', 'padding-right:5px;', '', '');
            if (newColNextLvl) {
              this.addCell(doc, playerTable, j, newColNextLvl, null, newCurrLvl + 1 + '(' + awpsNextStrength + ')', 'textRight table-middle green', 'padding-right:5px', '', '');
            }
          } else {
            // This case was added for the last line in the table "Team". Otherwise no new columns would be added there!
            this.info('addCurrLvlAwpsDiffNextLvl(): add last row fill: ' + j);
            this.addCell(doc, playerTable, j, newColCurrLvl, 'foxfm_tblTeam_lastRowFill_currLvl', '', '', 'padding-right:5px', '#49a084', '');
            this.addCell(doc, playerTable, j, newColCurrLvl, 'foxfm_tblTeam_lastRowFill_currLvl', '', '', 'padding-right:5px', '#49a084', '');
            this.addCell(doc, playerTable, j, newColAwpDiff, 'foxfm_tblTeam_lastRowFill_awpDiff', '', '', 'padding-right:5px', '#49a084', '');
            this.addCell(doc, playerTable, j, newColNextLvl, 'foxfm_tblTeam_lastRowFill_nextLvl', '', '', 'padding-right:5px', '#49a084', '');
          }
        }
      } catch (e) {
        this.error(e);
      }
    }
  }

  /* Dependent on the inserted content by this add-on the width of the header of
   * the team table must extended.
   * --> the name of the CSS rule is hard coded: '.pageWrapper'
   */
  private foxfm_team_changeTeamTableStyleWidth(document, iAdditionalWidth) {
    // get all style sheets
    var aStyleSheets = document.styleSheets;
    var i, j;
    // iterate through all external style sheets
    for (i = 0; i < aStyleSheets.length; i++) {
      // get current style sheet - cross browser safe
      var aCurrentStyleSheetRules = [];
      if (aStyleSheets[i].cssRules) {
        aCurrentStyleSheetRules = aStyleSheets[i].cssRules;
      } else if (aStyleSheets[i].rules) {
        aCurrentStyleSheetRules = aStyleSheets[i].rules;
      }
      // iterate through all rules
      for (j = 0; j < aCurrentStyleSheetRules.length; j++) {
        var currentRule = aCurrentStyleSheetRules[j];
        if (currentRule.selectorText) {
          this.debug("current rule: " + currentRule.selectorText);
          if (currentRule.selectorText.toLowerCase() === '.pagewrapper') {
            var iCurrentRuleWidth = Number(currentRule.style.width.replace(/\D+/g, ''));
            iCurrentRuleWidth += iAdditionalWidth;
            currentRule.style.width = `${iCurrentRuleWidth}px`;
          }
        }
      }
    }
  }

  private addCell(doc, tbl, row, col, id, content, styleClass, styleAlign, styleBgColor, attrWidth) {
    try {
      if (tbl.rows[row].cells.length >= col) {
        this.info(row + '::' + col + ' max rows: ' + tbl.rows.length + ', max.cols: ' + tbl.rows[row].cells.length);
        var newCell = tbl.rows[row].insertCell(col);
        newCell.appendChild(doc.createTextNode(content));
        if (styleClass) {
          newCell.className = styleClass;
        }
        newCell.style = styleAlign;
        newCell.style.backgroundColor = styleBgColor;
        if (id) {
          newCell.id = id;
        }
        if (attrWidth) {
          newCell.setAttribute('width', attrWidth);
        }
      }
    } catch (e) {
      this.error(row + '::' + col + ' max rows: ' + tbl.rows.length + ', max.cols: ' + tbl.rows[row].cells.length);
      this.error(e);
    }
  }

  private info(msg: string): void {
    this.log.info(this.loggingModule.name(), msg);
  }

  private warn(msg: string): void {
    this.log.warn(this.loggingModule.name(), msg);
  }

  private error(msg: string): void {
    this.log.error(this.loggingModule.name(), msg);
  }

  private debug(msg: string): void {
    this.log.debug(this.loggingModule.name(), msg);
  }
}
