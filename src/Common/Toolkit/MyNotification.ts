import { IEasyLogger } from "../Logger/EasyLogger";
import { INotification } from "./INotification";

export class MyNotification implements INotification {
  constructor(
    private title: string,
    private options?: NotificationOptions,
    private onClickedCallback?: (event: Event) => void,
    private logger?: IEasyLogger,
  ) { }

  public async notify(
    closeAfterSeconds: number = 0,
  ): Promise<void> {
    this.logger?.debug(`will notify user with title: ${this.title} and options: ${JSON.stringify(this.options)}`);
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    }
    // Let's check whether notification permissions have alredy been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      this.logger?.debug(`notification permission already granted, will create notification`);
      this.showNotification(closeAfterSeconds);
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      this.logger?.debug(`notification permission not granted yet, will ask user for permission`);
      const permission = await Notification.requestPermission()
      if(permission === "granted") {
        // If the user accepts, let's create a notification
        this.showNotification(closeAfterSeconds);
      }
    }
  }
  private showNotification(
    closeAfterSeconds: number,
  ) {
    this.logger?.debug(`will show notification with title: ${this.title} and options: ${JSON.stringify(this.options)}`);
    const notification = new Notification(this.title, this.options)
    if (this.onClickedCallback) {
      notification.onclick = this.onClickedCallback;
    }
    this.logger?.debug(`notification shown, will close after ${closeAfterSeconds} seconds: ${closeAfterSeconds > 0 ? 'yes' : 'no'}`);
    if (closeAfterSeconds > 0) {
      setTimeout(notification.close.bind(notification), closeAfterSeconds * 1000);
    }
  }
}
