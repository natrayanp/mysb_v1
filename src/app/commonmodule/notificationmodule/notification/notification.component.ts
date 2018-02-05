import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../../natservices/notify.service';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(public notify: NotifyService, public sanitizer:DomSanitizer) {console.log(notify.notimsg); }

  ngOnInit() {
    
  }

  fomrat(content){
    var str = content;
    var res = str.replace(/#/g, "\"");
    var res1 = res.replace(/!/g, "\'");
    console.log(res1);
    return res1;
    //return this.sanitizer.bypassSecurityTrustHtml(res1);
  }


    
}
