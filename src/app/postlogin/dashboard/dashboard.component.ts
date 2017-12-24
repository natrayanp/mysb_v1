import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {     
    this.parseJwt(localStorage.getItem("natjwt"));
    
  }

  ngOnInit() {
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
}
