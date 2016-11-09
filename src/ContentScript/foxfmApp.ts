import { LoggerInterface, LogLevel } from "../Common/CrossCutting/Logger/LoggerInterface"
import { Logger } from "../Common/CrossCutting/Logger/Logger"
import { StadiumManagerUi } from "./StadiumManagerUi"

class foxfmApp {
  private log: LoggerInterface;
  private thisModule: string = "foxfmApp";
  private stadiumManagerUi: StadiumManagerUi;

  constructor(
    log: LoggerInterface
  ) {
    this.log = log;
    this.log.setLogLevel(LogLevel.All);
    this.log.activateModuleForLogging("all");
    this.stadiumManagerUi = new StadiumManagerUi(this.log);
  }

  public main(): void {
    this.info("S t a r t e d");
    try {
      this.run();
    } catch (error) {
      this.error(error);
    }
  }

  private run(): void {
    this.stadiumManagerUi.addPricingControlElements();
  }

  private info(msg: string): void {
    this.log.info(this.thisModule, msg);
  }
  private error(msg: string): void {
    this.log.error(this.thisModule, msg);
  }
  private debug(msg: string): void {
    this.log.debug(this.thisModule, msg);
  }
}

var logger = new Logger();
var app = new foxfmApp(logger);
app.main();
