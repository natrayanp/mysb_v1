import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  Users = [{"name": "shiba2","image":"assets/img/shiba2.jpg","usertype":"Familyaccess","Linkedpfs":["ananthis","natrayans"]},
           {"name": "natrayan","image":"/home/natrayan/project/AwsProject/Angular/Tradingapp/tradingapp9/src/assets/img/002.jpg","usertype":"kiteaccess","Linkedpfs":["All"]}];
}
