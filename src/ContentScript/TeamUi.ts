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
import { ITeamTableSetting } from "../Common/TeamTableSetting"

import { XPathString } from "../Common/Toolkit/XPathString"
import { XPathAllResults } from "../Common/Toolkit/XPathAllResults"
import { XPathSingleResult } from "../Common/Toolkit/XPathSingleResult"
import { XPathHtmlTableCell } from "../Common/Toolkit/XPathHtmlTableCell"

import { HtmlTable } from "../Common/Toolkit/HtmlTable"

export class TeamUi {
  private log: LoggerInterface;
  private loggingModule: IRegisteredLoggingModule;
  private strengthLevelsSetting: IStrengthLevelsSetting;
  private teamTableSetting: ITeamTableSetting;

  private ressourceCurrentStrength: IRessource;
  private ressourceAwpsToNextStrength: IRessource;
  private ressourceNextStrength: IRessource;

  constructor(logger: LoggerInterface, strengthLevelsSetting: IStrengthLevelsSetting, teamTableSetting: ITeamTableSetting) {
    this.log = logger;
    this.loggingModule = new RegisteredLoggingModule("TeamUi", new LogLevelError());
    this.log.registerModuleForLogging(this.loggingModule);
    this.strengthLevelsSetting = strengthLevelsSetting;
    this.teamTableSetting = teamTableSetting;

    this.ressourceCurrentStrength = new Ressource("ofmTeamPageCurrentStrength");
    this.ressourceAwpsToNextStrength = new Ressource("ofmTeamPageAwpsToNextStrength");
    this.ressourceNextStrength = new Ressource("ofmTeamPageNextStrength");
  }

  public addAdditionalInformation(doc: Document) {
    this.teamTableSetting.setting()
      .then(setting => {
        var executeOnThisPage = doc.location.href.match(setting.url().url().toString()) !== null;
        this.info("called from: " + doc.location.href + ": " + executeOnThisPage);
        if ((setting.existingColumns().awpColumn().additionalInformationActivated()
          || setting.existingColumns().strengthColumn().additionalInformationActivated())
          && executeOnThisPage
        ) {
          this.strengthLevelsSetting
            .strengthLevels()
            .then(strengthLevels => {
              var teamTable = new HtmlTable(doc, setting.id().id());
              var teamTableBody = teamTable.firstTableBody();

              var awpHeaderCell = new XPathHtmlTableCell(
                new XPathSingleResult<HTMLTableCellElement>(
                  new XPathAllResults(doc,
                    new XPathString(setting.existingColumns().awpColumn().xPath().xPathString()))));
              var awpColumnIndex = awpHeaderCell.columnIndex().valueOf();

              var strengthHeaderCell = new XPathHtmlTableCell(
                new XPathSingleResult<HTMLTableCellElement>(
                  new XPathAllResults(doc,
                    new XPathString("//./table[1]/thead[1]/tr[1]/th[10]"))));
              var strengthColumnIndex = strengthHeaderCell.columnIndex().valueOf();


              for (var j = 0; j < teamTableBody.rows.length; j++) {
                var row = <HTMLTableRowElement>teamTableBody.rows[j];
                var awpPoints = NumberHelper.getNumberFromNode(row.cells[awpColumnIndex]);
                var actualStrengthLevel = strengthLevels.strengthLevelByAwp(awpPoints).strengthLevel().valueOf();
                var currentStrengthLevel = NumberHelper.getNumberFromNode(row.cells[strengthColumnIndex]);
                var awpsNextStrength = strengthLevels.strengthLevel(actualStrengthLevel + 1).awpPoints().valueOf();

                if (setting.existingColumns().awpColumn().additionalInformationActivated()) {
                  awpHeaderCell.tableCell().style.width = "120px";
                  this.extendInnerHtml(row.cells[awpColumnIndex], ` | ${awpPoints - awpsNextStrength}`);
                }
                if (setting.existingColumns().strengthColumn().additionalInformationActivated()
                  && actualStrengthLevel !== currentStrengthLevel) {
                  strengthHeaderCell.tableCell().style.width = "70px";
                  this.extendInnerHtml(row.cells[strengthColumnIndex], ` (${actualStrengthLevel})`);
                }
              }
            });
        }
      })
      .catch(e => { throw new Error(`Error while adding additional information to team table: ${e}`); });
  }

  private extendInnerHtml(node, text) {
    var i, num;
    // this.info('getNumberFromNode(): started:\n' + node + '\ndecimalPoint: ' + decimalPoint);
    if (node && node.tagName) {
      // this.info('getNumberFromNode():\nnode: ' + node + '\ntagName: ' + node.tagName + '\ninnerHTML: ' + node.innerHTML);
      for (i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        var childNodeType = childNode.nodeType;
        // this.info('getNumberFromNode(): childNode: ' + childNode + '; type of child: ' + childNodeType);
        if (childNodeType == 1) {
          return this.extendInnerHtml(childNode, text);
        }
      }
    }
    if (node && node.innerHTML) {
      node.innerHTML += text;
    } else {
      node += text;
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
