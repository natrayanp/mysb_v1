import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../../natservices/dbservices.service';
import { NotifyService } from '../../natservices/notify.service';
import { NotificationComponent } from '../../commonmodule/notificationmodule/notification/notification.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  lazldid:string='';

  constructor(private dbserivce :DbservicesService,
              private notify: NotifyService) {     
                            this.parseJwt(localStorage.getItem("natjwt"));
    
            }

  ngOnInit() {
    this.notificationfetch();
  }
  uid:any;
  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var decodedJwtJsonData=window.atob(base64);
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    this.uid=decodedJwtData.uid;
    console.log('jwtData: ' + base64Url);
    console.log('decodedJwtJsonData: ' + decodedJwtJsonData);
    console.log('decodedJwtData: ' + decodedJwtData);
    console.log('username: ' + decodedJwtData.username);
    console.log('expiry: ' + decodedJwtData.exp);

    
    //return JSON.parse();
};



notificationfetch() {
  var data={lazldid:this.lazldid,module:'dashboard'};
  console.log("data is"+JSON.stringify(data));
  this.dbserivce.dbaction('notifi','fetch',data).subscribe(
  data =>{
          console.log("inside success dbservice");
          var data1=data.body['data'];
          console.log(data1);
          console.log(data.body['lazyloadid']);
          this.lazldid=data.body['lazyloadid'];
          if(data1 != null){
            data1.forEach(element => {
              this.notify.update(element.nfumessage, 'success',element.nfumsgtype);
            });
            
          }
          //this.lazldid=data.lazldid;
        },
  error =>{
          console.log("inside error dbservice");
          console.log(error);
      }
        );

}

retrylazyid(){
  this.notificationfetch();
}
}
