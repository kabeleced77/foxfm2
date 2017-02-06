import { LoggerInterface } from "../Common/Logger/LoggerInterface"
import { Logger } from "../Common/Logger/Logger"
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModulesSetting } from '../Common/Logger/RegisteredLoggingModulesSetting';
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { StadiumManagerUi } from "./StadiumManagerUi"

class foxfmApp {
  private logger: LoggerInterface;
  private loggingModule: IRegisteredLoggingModule;
  private stadiumManagerUi: StadiumManagerUi;

  constructor(logger: LoggerInterface) {
    this.logger = logger;
    this.loggingModule = new RegisteredLoggingModule("foxfmApp", new LogLevelError());
  }

  public main(): void {
    this.info("S t a r t e d");
    try {
      this.logger.registerModuleForLogging(this.loggingModule).then(() => {
        this.stadiumManagerUi = new StadiumManagerUi(this.logger);
        this.run();
      });
    } catch (error) {
      this.error(error);
    }
  }

  private run(): void {
    this.stadiumManagerUi.addPricingControlElements();
  }
  private info(msg: string): void {
    this.logger.info(this.loggingModule.name().toString(), msg);
  }
  private error(msg: string): void {
    this.logger.error(this.loggingModule.name().toString(), msg);
  }
  private debug(msg: string): void {
    this.logger.debug(this.loggingModule.name().toString(), msg);
  }
}

var logger = new Logger();
var app = new foxfmApp(logger);
app.main();
