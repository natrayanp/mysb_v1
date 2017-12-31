
import { Component, ViewEncapsulation } from '@angular/core';

import { NotifyService } from '../../../natservices/notify.service';

@Component({
  selector: 'notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationMessageComponent {

  constructor(public notify: NotifyService) {console.log(notify.bannermsg); }

}