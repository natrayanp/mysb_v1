import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { NotificationsService } from '../../../../commonmodule/notifymodule/services/notifications.service';
import { DbservicesService } from '../../../../natservices/dbservices.service';
import { NotifyService } from '../../../../natservices/notify.service';
import { NotificationComponent } from '../../../../commonmodule/notificationmodule/notification/notification.component'

import { OrderfinalComponent } from '../../../../postlogin/order/orderfinal/orderfinal.component'
                

import { empty } from 'rxjs/observable/empty';
import { element } from 'protractor';
const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit 
{

  public pfForm : FormGroup;

  ngAfterViewInit() {
  }

  summed: number;
  balanceleft:number = 0;

  fundnames:string[];
  mfsummed:number=0;
  stksummed:number=0;
  today = new Date();
  @Input() Mypfdetail;
  @Input() OnAdd;
  @Input() myindex;
  @Input() onEdit;
  @Input() EAMode;

  @Output() cardcancel: EventEmitter<any> = new EventEmitter();
  @Output() cardsave: EventEmitter<any> = new EventEmitter();
  @Output() cardedit: EventEmitter<any> = new EventEmitter();
  @Output() cardexecute: EventEmitter<any> = new EventEmitter();
  

  Mypfdetailcpy:any;
  OnAddEdit=false;
 
 emptyPayOff = {
      pfstexchange: "",
      pfsttradingsymbl: "",
      pfstltp: 0,
      pfstamt: 0,
      pfstpercent: 0,
      pfstallotedamt: 0,
      pfsttotunit: 0
    };


    emptymf= {
      ormflistid:"",
      orportfolioid:"",
      ormffundname:"",
      ormffndnameedit:"edit",
      ormfdathold:"",
      ormffundorderlists:""
    };
 
  constructor(private pffb: FormBuilder,
              private router: Router,
              private notifyservice: NotificationsService,
              private dbserivce :DbservicesService) { }

  
  ngOnInit() { 

    this.pfForm = this.pffb.group({ 
      pfPortfolioid:[null],
      pfuserid:[null],
      pfPortfolioname:[null,Validators.required],
      pfPurpose:[null],
      pfBeneUsers:[null,Validators.required],
      pfStartDt:[null,Validators.required],
      pfTargetDt:[null,Validators.required],
      pfTargetIntRate:[null,Validators.required],
      pfPlannedInvAmt:[0,Validators.required],
      //pfInvAmtFeq:[null,Validators.required],
      pfStkAmtsplittype:[null,Validators.required],
      pfmfAmtsplittype:[null,Validators.required],
      pfSummed:[0],
      pfSiptotal:[0],
      pfOnetimetotal:[0],
      pfStocklists:new FormArray([]),
      pfMFlists:new FormArray([])  
      });

    this.Mypfdetailcpy=JSON.parse(JSON.stringify(this.Mypfdetail));

  }

  UserEdit(event){
    this.cardedit.emit(this.myindex);
  }

  pfexecute(event){
    this.cardexecute.emit(this.myindex);
  }

FormCardpopulate(){

  this.Mypfdetailcpy=JSON.parse(JSON.stringify(this.Mypfdetail));
}

cancel_cardedit(i){
  event.preventDefault();
  this.onEdit=!this.onEdit; 
  this.cardcancel.emit(this.myindex);
  
}

save_cardedit(pfFormfrm){
   this.cardsave.emit(this.Mypfdetailcpy);
}

chtoupper(){
  this.Mypfdetailcpy.pfportfolioname=this.Mypfdetailcpy.pfportfolioname.toUpperCase();
}

showex(){
  if (this.Mypfdetailcpy.pfshowadcrtbtn == "Y"){
    return true;
  }else{
    return false;
  }
}

}