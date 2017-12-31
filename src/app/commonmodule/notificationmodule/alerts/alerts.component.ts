import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../../natservices/notify.service';

@Component({
  selector: 'alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  constructor(public notify: NotifyService) {console.log(notify.alertmsg); }

  ngOnInit() {
  }

}


