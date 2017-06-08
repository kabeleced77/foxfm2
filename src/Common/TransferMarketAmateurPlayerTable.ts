import { IWebElementToExtend } from "./Toolkit/WebElementToExtend";
import { IStrengthLevelsSetting } from "./Settings/StrengthLevelsSetting";
import { ISetting } from "./Toolkit/Setting";
import { ITransferMarketAmateurPlayerTableExtensionSetting } from "./Settings/TransferMarketAmateurPlayerTableExtensionSetting";
import { IEasyLogger } from "./Logger/EasyLogger";
import { IHtmlTable } from "./Toolkit/HtmlTable";
import { IAwpPoints } from "./Toolkit/AwpPoints";

export class TransferMarketAmateurPlayerTable implements IWebElementToExtend {
  private table: IHtmlTable;
  private awpPoints: IAwpPoints;
  private strengthLevels: IStrengthLevelsSetting;
  private amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>;
  private log: IEasyLogger;

  constructor(
    table: IHtmlTable,
    awpPoints: IAwpPoints,
    strengthLevels: IStrengthLevelsSetting,
    amateurPlayerTableSettings: ISetting<ITransferMarketAmateurPlayerTableExtensionSetting>,
    log: IEasyLogger
  ) {
    this.table = table;
    this.awpPoints = awpPoints;
    this.strengthLevels = strengthLevels;
    this.amateurPlayerTableSettings = amateurPlayerTableSettings;
    this.log = log;
  }

  public extend(): void {
    this.log.info("start extension");
    this.amateurPlayerTableSettings
      .value()
      .then(setting => {
        if (setting.addAwpColumn()) {
          this.adjustHeader();
          this.strengthLevels
            .strengthLevels()
            .then(strengthLevels => {
              this.awpPoints.points().forEach((awp, i) => {
                let awps = awp.awpPoints();
                this.addAwpsToTable(awps.toString(), i);
              });
            })
            .catch(e => { throw new Error(`"Error while extending amateur market player table: ${e}."`); });
        }
      })
      .catch(e => { throw new Error(`"Error reading settings to extend amateur market player table: ${e}."`); });
  }

  private adjustHeader() {
    let newTextNode = document.createTextNode("AWPs");
    let newDiv = document.createElement("div");
    newDiv.setAttribute("style", "color:#04143e;");
    newDiv.className = "bold";
    newDiv.appendChild(newTextNode);
    let newCell = this.table.tableHeader().rows[0].insertCell(7);
    newCell.className = "textCenter";
    newCell.appendChild(newDiv);
  }
  private addAwpsToTable(awps: String, row: Number): void {
    let newTextNode = document.createTextNode(awps.toString());
    let newDiv = document.createElement("div");
    newDiv.align = "center";
    newDiv.appendChild(newTextNode);
    let newCell = this.table.firstTableBody().rows[row.valueOf()].insertCell(7);
    newCell.appendChild(newDiv);
  }
}
