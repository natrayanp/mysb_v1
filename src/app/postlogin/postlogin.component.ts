import { Component, OnInit } from '@angular/core';
import { UserstateService } from '../natservices/userstate.service';

@Component({
  selector: 'app-postlogin',
  templateUrl: './postlogin.component.html',
  styleUrls: ['./postlogin.component.scss']
})
export class PostloginComponent implements OnInit {

  constructor(private userstate:UserstateService ) { }

  ngOnInit() {
    this.userstate.parseJwt();
  }
  
}
