import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { SetjwtService } from '../natservices/setjwtservice.service';

@Component({
  selector: 'app-logincheck',
  templateUrl: './logincheck.component.html',
  styleUrls: ['./logincheck.component.scss']
})
export class LogincheckComponent implements OnInit {

  data:any;
  natkey:any;
  
  constructor(private router: Router, private route: ActivatedRoute, private setjwtservice: SetjwtService) { }

  ngOnInit() {
    this.natkey=this.route.snapshot.queryParamMap.get("natkey");
    if(localStorage.getItem("natjwt") === null){
        this.getUsers(this.natkey);       
      }else{
        window.opener.location="/securedpg/dashboard";  
        window.close(); 
      }
    
  }

  getUsers(natkey) {
    this.setjwtservice
    .login(natkey)
    .subscribe(
      (data) => {
        console.log(data);
        this.data = data;
        localStorage.setItem("natjwt",JSON.stringify(this.data['natjwt']));
        window.opener.location="/securedpg/dashboard";        
        window.close();         
      }, 
      (error) => {
        console.log('error ' + error);
      });
    }

}
