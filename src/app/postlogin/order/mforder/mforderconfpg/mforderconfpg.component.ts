import { Component, OnInit } from '@angular/core';
import { OrderservService } from '../../../../natservices/orderserv.service';

@Component({
  selector: 'app-mforderconfpg',
  templateUrl: './mforderconfpg.component.html',
  styleUrls: ['./mforderconfpg.component.scss']
})
export class MforderconfpgComponent implements OnInit {

  constructor(private orderservice: OrderservService, ) { }

  ngOnInit() {
  }


}
