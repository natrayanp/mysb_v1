import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { SettingspfService } from '../../../../natservices/settingspf.service'
import { NotificationsService } from '../../../../commonmodule/notifymodule/services/notifications.service';
                                      
@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent implements OnInit {

  onfetch=true;
  onAddmode = false;
  message1 = "You don't have any portfolio yet.....Click on Add to start your journey";

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
      {
        pfstexchange: "",
        pfsttradingsymbl: "",
        pfstltp: 0,
        pfstamt: 0,
        pfstpercent: 0,
        pfstallotedamt: 0,
        pfsttotunit: 0
      }
    ],
    pfmflist:[
      {
        pfmffundname: "",
        pfmfnav: 0,
        pfmfamt: 0,
        pfmfpercent: 0,
        pfmfallotedamt: 0
      }
    ]
  };

  test:number;
  //This should come from a service
 //pfdetails=[];

 //pfdetails=[{"pfPortfolioid": null,"pfuserid": null,"pfPortfolioname": "Natrayan","pfPurpose": null,"pfBeneUsers": null,"pfStartDt": null,"pfTargetDt": null,"pfTargetIntRate": null,"pfPlannedInvAmt": 10000,"pfInvAmtFeq":"Daily","pfStkAmtsplittype": "Amount","pfmfAmtsplittype":"%","pfStocklists": [{"pfstExchange": "NSE","pfstTradingsymbl": "ITC","pfstLtp": 300,"pfstAmt": 3000,        "pfstPercent": 0,"pfstAllotedAmt": 3000,"pfstTotUnit": 10},{"pfstExchange": "NSE","pfstTradingsymbl":"SBIN","pfstLtp":200,"pfstAmt":1000,"pfstPercent":0,"pfstAllotedAmt":1000,"pfstTotUnit": 2}],"pfMFlists":[{"pfmfFundname": "Birla MNC","pfmfNAV":600,"pfmfAmt":0,"pfmfPercent":50,"pfmfAllotedAmt":5000}]}];;
  pfdetails;

  constructor(private router: Router, private spf :SettingspfService,private notifyservice: NotificationsService) { }

  ngOnInit() {    

    this.fetchpfdata(); 
    this.test=this.spf.servicepfdata;
  }


fetchpfdata(){
  
  this.spf.getpf().subscribe(
    data =>
          {
            console.log("success fetch");
            console.log(data);
            
            this.pfdetails =data;
            this.onfetch=!this.onfetch;
          },
    error => 
          {  
            this.onfetch=!this.onfetch;          
            this.message1=error.message;
            this.pfdetails=[];
            console.log(error);
                        
          },
    () => {
            
            console.log("Inside end of fetchpfdata observable");
          }
  );
 
}


cardacancel(event,index){
  this.pfdetails.unshift(this.empty_pfdetails);
  console.log("this.pfdetails");
  console.log(this.pfdetails);
  this.CanceladdNewPortfolio();
  this.onAddmode=!this.onAddmode;
}

CanceladdNewPortfolio(){  
  this.pfdetails.shift();
  this.onAddmode=!this.onAddmode;  
  this.notifyservice.success("success Alert","success New card addition");
  this.notifyservice.error("error Alert","error New card addition");
  this.notifyservice.alert("alert Alert","alert New card addition");
  this.notifyservice.info("info Alert","Cancelled New card addition");
  this.notifyservice.warn("warn Alert","Cancelled New card addition");
  this.notifyservice.bare("bare Alert","Cancelled New card addition");
}

cardasave(pfformobj){

  //
  pfformobj.pfportfolioid

  //
  event.preventDefault();
  console.log("save card");
  console.log((pfformobj));
  if(pfformobj.pfportfolioid=="New"){
    console.log("new");
    this.cardasaveNewPortfolio(pfformobj); 
  } else{
    console.log("existing");
    
    console.log(this.pfdetails);
    console.log(pfformobj);

    //call update to DB based on portfolio id
  }

  //this.pfdetails.unshift(pfformobj.value);
  // logic to be added to save it in DB
}

cardasaveNewPortfolio(formval){
  console.log("save NEW card");
  event.preventDefault();
  this.onAddmode=!this.onAddmode;
  console.log(JSON.stringify(formval));
  this.spf.savepf(formval).subscribe(
    data => { 
              console.log(data);
              if (data.status == 200){
                console.log("saved successfully");
              }
              this.onfetch=!this.onfetch;
              this.fetchpfdata();
            },
    error=> {
              console.log("errrererer");
              console.log(error);
              this.message1=error.message;
            },
    () =>   {
              console.log("end of savepf observable");
            }

  )
  //this.pfdetails.shift(formval);
  
  //this.pfdetails.unshift(formval);  
}

addNewPortfolio(){
   var empty_pfdetails_fornew=JSON.parse(JSON.stringify((this.empty_pfdetails)));
   empty_pfdetails_fornew.pfportfolioid="New";
   this.pfdetails.unshift(empty_pfdetails_fornew);
   this.onAddmode=!this.onAddmode;
 }



}
