import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../../natservices/notify.service';


@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(public notify: NotifyService) {console.log(notify.notimsg); }

  ngOnInit() {
  }

}
