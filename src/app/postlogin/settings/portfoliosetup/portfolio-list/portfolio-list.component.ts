import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AsyncPipe } from '@angular/common';
import { SettingspfService } from '../../../../natservices/settingspf.service';
import { NotificationsService } from '../../../../commonmodule/notifymodule/services/notifications.service';
import { NotifyService } from '../../../../natservices/notify.service';
import { NotificationComponent } from '../../../../commonmodule/notificationmodule/notification/notification.component'
import { DbservicesService } from '../../../../natservices/dbservices.service';
@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent implements OnInit {

  onfetch=true;
  onAddmode = false;
  message1 = "You don't have any portfolio yet.....Click on Add to start your journey";
  showcancelalrt= true;
  dberror:boolean;
  editi:number;
  totalpf:number;
  isEAModeon:boolean = false;

  empty_pfdetails=  {
    pfportfolioid: null,
    pfuserid: null,
    pfportfolioname: null,
    pfpurpose: null,
    pfbeneUsers: null,
    pfstartdt: null,
    pftargetdt: null,
    pftargetintrate: null,
    pfplannedinvamt: 0,
    pfinvamtfeq:null,
    pfstkamtsplittype: "%",
    pfmfamtsplittype:"%",
    pfsummed:null,
    pfstklist: [
     /* {
        pfstexchange: "",
        pfsttradingsymbl: "",
        pfstltp: 0,
        pfstamt: 0,
        pfstpercent: 0,
        pfstallotedamt: 0,
        pfsttotunit: 0
      }*/
    ],
    pfmflist:[
    /*  {
        pfmffundname: "",
        pfmfnav: 0,
        pfmfamt: 0,
        pfmfpercent: 0,
        pfmfallotedamt: 0
      }*/
    ]
  };

  test:number;
  //This should come from a service
 //pfdetails=[];

 //pfdetails=[{"pfPortfolioid": null,"pfuserid": null,"pfPortfolioname": "Natrayan","pfPurpose": null,"pfBeneUsers": null,"pfStartDt": null,"pfTargetDt": null,"pfTargetIntRate": null,"pfPlannedInvAmt": 10000,"pfInvAmtFeq":"Daily","pfStkAmtsplittype": "Amount","pfmfAmtsplittype":"%","pfStocklists": [{"pfstExchange": "NSE","pfstTradingsymbl": "ITC","pfstLtp": 300,"pfstAmt": 3000,        "pfstPercent": 0,"pfstAllotedAmt": 3000,"pfstTotUnit": 10},{"pfstExchange": "NSE","pfstTradingsymbl":"SBIN","pfstLtp":200,"pfstAmt":1000,"pfstPercent":0,"pfstAllotedAmt":1000,"pfstTotUnit": 2}],"pfMFlists":[{"pfmfFundname": "Birla MNC","pfmfNAV":600,"pfmfAmt":0,"pfmfPercent":50,"pfmfAllotedAmt":5000}]}];;
  pfdetails;
  pfedetails=[];
  pfcpydetails;

  constructor(private router: Router, 
              private spf :SettingspfService,
              //private notifyservice: NotificationsService,
              private notify: NotifyService,
              private dbserivce :DbservicesService,) { }

  ngOnInit() {    
    this.fetchpfdata(); 
    this.editi=-1;
    //this.test=this.spf.servicepfdata;
  }


fetchpfdata(){
  this.dbserivce.dbaction('pf','fetch','').subscribe(
  //this.spf.getpf().subscribe(
    data =>
          {
            console.log("success fetch");
            console.log(data);            
            this.pfdetails =data['body'];
            this.totalpf=this.pfdetails.length;
            console.log("this.pfdetails.length");
            console.log(this.pfdetails.length);
            this.pfcpydetails=JSON.parse(JSON.stringify((this.pfdetails)));
            this.onfetch=!this.onfetch;
          },
    error => 
          {  
            this.onfetch=!this.onfetch;          
            //this.message1=error.message;
            this.pfdetails=[];
            console.log(error);
            this.notify.update(error.message,"error","alert");
                        
          },
    () => {
            
            console.log("Inside end of fetchpfdata observable");
          }
  );
 
}





/*
refereshpf(){
  this.pfdetails.shift();
  this.pfcpydetails=JSON.parse(JSON.stringify((this.pfdetails)));
  console.log("after shitf");
  this.onAddmode=false;  
}



cardasaveNewPortfolio(formval){
  console.log("save NEW card");
  event.preventDefault();
  this.onAddmode=false;
  console.log(JSON.stringify(formval));
  this.callsavedbaction(formval);
  if (this.dberror==true){
    console.log("calling cancelnewportfolio");
    //this.CanceladdNewPortfolio(); 
  }
}
*/

cardasave(pfformobj){
  event.preventDefault();
  console.log("save card");
  console.log((pfformobj));

  this.callsavedbaction(pfformobj);
  
  /*
  if(pfformobj.pfportfolioid=="New"){
    console.log("new");
    this.cardasaveNewPortfolio(pfformobj); 
  } else{
    console.log("existing");
    this.cardasaveNewPortfolio(pfformobj);
    if (this.dberror==true){
      console.log("calling cancelnewportfolio");
      this.cardacancel(event,0);
    }

  }*/

}


callsavedbaction(formval){
  //this.dberror = true;
  this.dbserivce.dbaction('pf','save',formval).subscribe(
  //this.spf.savepf(formval).subscribe(
    data => { 
              console.log(data);
              this.fetchpfdata();                 
              this.pfedetails=[];
              this.isEAModeon=false;  
              this.notify.update("Portfolio Saved Succesfully","success","alert");

              },             
            
    error=> {
            console.log("inside error of savepf");
            console.log(error);            
            this.notify.update(error.message,"error","alert");
            },
    () =>   {
              console.log("end of savepf observable");
            }

  )

}

addNewPortfolio(){
   var empty_pfdetails_fornew=JSON.parse(JSON.stringify((this.empty_pfdetails)));
   empty_pfdetails_fornew.pfportfolioid="New";
   //this.pfdetails.unshift(empty_pfdetails_fornew);
   this.pfedetails.unshift(empty_pfdetails_fornew);
   console.log("inside add new portfolio");
   console.log(this.pfedetails);
   this.onAddmode=!this.onAddmode;
   this.editi=0;
   this.isEAModeon=true;
   this.notify.clearall();
 }

 cardaedit(i){  
  var cpy_of = this.pfdetails.splice(i,1);
  this.pfedetails.unshift(cpy_of[0]);
  this.editi=i;
  this.notify.clearall();
  this.pfcpydetails=JSON.parse(JSON.stringify((this.pfdetails)));
  this.isEAModeon=true;
  window.scroll(0, 0);
 }

 /*
 CanceladdNewPortfolio(){  
  if (this.showcancelalrt  == true){
    //this.notifyservice.alert("Cancel New addition","New portfolio addition cancelled");
  }
  this.refereshpf();
 }*/

 cardacancel(event,index){
  console.log("insde cardacancel");
  console.log(index);
  console.log(this.pfedetails);
  console.log(this.pfedetails[0].pfportfolioid);
  this.editi=-1;
  if(this.pfedetails[0].pfportfolioid=="New"){
    
    console.log("inside new portfolio addition cancel");
    this.pfedetails.shift();
    this.notify.update("New Portfolio addition cancelled","error","alert");
  }else{
    console.log("inside editing an existing portfolio");
    this.pfdetails.splice(index,0,this.pfedetails[0]);
    console.log(this.pfdetails);
    this.notify.update("Portfolio edit cancelled","error","alert");
    this.pfedetails=[];
  }
  this.pfcpydetails=JSON.parse(JSON.stringify((this.pfdetails)));
  //this.onAddmode=false;
  this.isEAModeon=false;  
}


/* code to add filter... moved to day2
applyFilter(filterValue: string) {  
  filterValue = filterValue.toUpperCase(); 
  this.pfdetails = (JSON.stringify((this.pfcpydetails)));
  this.pfdetails = this.pfcpydetails.filter(({pfportfolioname}) => pfportfolioname.indexOf(filterValue) !== -1);
}
*/



}
