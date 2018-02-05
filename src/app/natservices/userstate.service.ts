import { Injectable } from '@angular/core';

@Injectable()
export class UserstateService {

  constructor() { }

  username:string;
  lastlogin:Date;
  userstatus:string;
  tknexpiry:Date;



  parseJwt () {
    var token = localStorage.getItem("natjwt");
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var decodedJwtJsonData=window.atob(base64);
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    //this.uid=decodedJwtData.uid;
    console.log('jwtData: ' + base64Url);
    console.log('decodedJwtJsonData: ' + decodedJwtJsonData);
    console.log('decodedJwtData: ' + decodedJwtData);
    console.log('username: ' + decodedJwtData.username);
    this.username=decodedJwtData.username;
    console.log('expiry: ' + decodedJwtData.exp);
    console.log('type of expiry: '+typeof(decodedJwtData.exp));
    console.log('userstatus: '+decodedJwtData.userstatus);
    this.userstatus=decodedJwtData.userstatus;
    //console.log('usertype: '+decodedJwtData.usertype);    
    //return JSON.parse();
};

}
