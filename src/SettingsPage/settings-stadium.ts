import {computedFrom} from 'aurelia-framework';
import {SettingsManagerInterface} from '../Common/BusinessLogic/SettingsManagerInterface';
import {SettingsManager} from '../Common/BusinessLogic/SettingsManager';
import {LogLevel, LoggerInterface} from '../Common/CrossCutting/Logger/LoggerInterface';
import {Logger} from '../Common/CrossCutting/Logger/Logger';

export class SettingsStadium {
	private thisModule: string = "SettingsStadium";
  private settingsManager: SettingsManagerInterface;
  private log: LoggerInterface;

  heading = 'Foxfm settings for the stadium';
  firstName = 'John2';
  lastName = 'Doe';
  // previousValue = this.fullName;

	constructor() {
      this.log = new Logger();
      this.log.setLogLevel(LogLevel.All);
      this.log.registerModuleForLogging(this.thisModule);
      this.log.activateModuleForLogging("all");

      this.settingsManager = new SettingsManager(this.log);
	}

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  @computedFrom('firstName', 'lastName')
  get fullName() {
    var fullName = `${this.firstName} ${this.lastName}`;
     this.info("fullName: " + fullName);

      // this.settingsManager.test();
      this.settingsManager.getCategoriesAsync().then((categories: string[]) => {
        this.debug("cat: " + categories[0]);
      });

    return fullName;
  } 

  submit() {
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate() {
    // if (this.fullName !== this.previousValue) {
    //   return confirm('Are you sure you want to leave?');
    // }
  }

	private info(msg: string): void {
		this.log.info(this.thisModule, msg);
	}
	private debug(msg: string): void {
		this.log.debug(this.thisModule, msg);
	}
	private warn(msg: string): void {
		this.log.warn(this.thisModule, msg);
	}
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
