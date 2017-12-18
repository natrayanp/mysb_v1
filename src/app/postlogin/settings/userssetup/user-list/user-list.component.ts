import { Component, OnInit, Input } from '@angular/core';
import { DbservicesService } from '../../../../natservices/dbservices.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor( private dbserivce :DbservicesService) { }

  ngOnInit() {
  }

  Users = [{"name": "shiba2","image":"assets/img/shiba2.jpg","usertype":"Familyaccess","Linkedpfs":["ananthis","natrayans"]},
           {"name": "natrayan","image":"/home/natrayan/project/AwsProject/Angular/Tradingapp/tradingapp9/src/assets/img/002.jpg","usertype":"kiteaccess","Linkedpfs":["All"]}];
/*
  createclient(){
  this.dbserivce.dbaction('Client','Creation','none').subscribe(
    data =>
          {
            /
            if((data.body['natstatus']=='success') ) {
              this.getdata();              
              console.log("saved successfully");
              //this.notifyservice.success("Saved successfully",data.body['statusdetails']);
              //this.showcancelalrt=false;
              //this.dberror = false;
              }
          });
}

createmandate() {
  this.dbserivce.dbaction('Mandate','Creation','none').subscribe(
    data =>
          {
            if((data.body['natstatus']=='success') ) {
              this.getdata();              
              console.log("saved successfully");
              //this.notifyservice.success("Saved successfully",data.body['statusdetails']);
              //this.showcancelalrt=false;
              //this.dberror = false;
              }
          });
}
*/

          }
