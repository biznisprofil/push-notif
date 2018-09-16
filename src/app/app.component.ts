import { Component } from '@angular/core';
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _pushNotificationService: PushNotificationService) { }

  ngOnInit() {
    this._pushNotificationService.requestPermission();

    this.myFunction();
  }

  myFunction() {
    const title = 'Hello';
    const options = new PushNotificationOptions();
    options.body = 'Native Push Notification';
    options.icon = './assets/logo-ex-7.png';

    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('notif', notif);
        console.log('onshow');
        // setTimeout(() => {
        //   notif.notification.close();
        // }, 3000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        // window.location.href = 'http://localhost:4200/';
        // window.location.replace("http://localhost:4200/");
        window.open('http://localhost:4200/','_blank');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
      (err) => {
        console.log(err);
      });
  }
}
