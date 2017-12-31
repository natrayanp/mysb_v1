import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../../natservices/notify.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  constructor(public notify: NotifyService) {console.log(notify.bannermsg); }

  ngOnInit() {
  }

}
