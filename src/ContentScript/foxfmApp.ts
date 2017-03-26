import { LoggerInterface } from "../Common/Logger/LoggerInterface"
import { Logger } from "../Common/Logger/Logger"
import { IRegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModule } from '../Common/Logger/RegisteredLoggingModule';
import { RegisteredLoggingModulesSetting } from '../Common/Logger/RegisteredLoggingModulesSetting';
import { ILogLevel } from '../Common/Logger/LogLevel';
import { LogLevelError } from '../Common/Logger/LogLevel';
import { StadiumManagerUi } from "./StadiumManagerUi"
import { TeamUi } from "./TeamUi"
import { StrengthLevelsSetting } from "../Common/StrengthLevelsSetting"


class foxfmApp {
  private logger: LoggerInterface;
  private loggingModule: IRegisteredLoggingModule;
  private stadiumManagerUi: StadiumManagerUi;
  private teamUi: TeamUi;

  constructor(logger: LoggerInterface) {
    this.logger = logger;
    this.loggingModule = new RegisteredLoggingModule("foxfmApp", new LogLevelError());
  }

  public main(): void {
    this.info("S t a r t e d");
    try {
      this.logger.registerModuleForLogging(this.loggingModule)
      .then(() => {
        this.stadiumManagerUi = new StadiumManagerUi(this.logger);
        this.teamUi = new TeamUi(this.logger, new StrengthLevelsSetting());
        this.run();
      })
      .catch(reason => this.error(reason));
    } catch (error) {
      this.error(error);
    }
  }

  private run(): void {
    this.stadiumManagerUi.addPricingControlElements();
    this.teamUi.addAdditionalInformation(document);
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
