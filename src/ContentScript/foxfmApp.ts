import { LoggerInterface } from "../Common/Logger/LoggerInterface"
import { Logger } from "../Common/Logger/Logger"
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModulesSetting } from '../Common/Logger/RegisteredLoggingModulesSetting';
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { StadiumManagerUi } from "./StadiumManagerUi"

class foxfmApp {
  private log: LoggerInterface;
  private thisModule: string = "foxfmApp";
  private stadiumManagerUi: StadiumManagerUi;

  constructor(log: LoggerInterface) {
    this.log = log;
    var loggingModule = new RegisteredLoggingModule(this.thisModule, false, new LogLevelError());
    this.log.registerModuleForLogging(loggingModule);
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
