import { INotification } from "./INotification";

export class MyNotification implements INotification {
  constructor(
    private title: string,
    private options?: NotificationOptions,
    private onClickedCallback?: (event: Event) => void,
  ) { }

  public notify(
    closeAfterSeconds: number = 0,
  ): void {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    }
    // Let's check whether notification permissions have alredy been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      this.showNotification(closeAfterSeconds);
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          this.showNotification(closeAfterSeconds);
        }
      });
    }
  }
  private showNotification(
    closeAfterSeconds: number,
  ) {
    const notification = new Notification(this.title, this.options)
    if (this.onClickedCallback) {
      notification.onclick = this.onClickedCallback;
    }
    if (closeAfterSeconds > 0) {
      setTimeout(notification.close.bind(notification), closeAfterSeconds * 1000);
    }
  }
}
