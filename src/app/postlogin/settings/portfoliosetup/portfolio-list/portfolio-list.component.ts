import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { SettingspfService } from '../../../../natservices/settingspf.service'

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

  //This should come from a service
 //pfdetails=[];

 //pfdetails=[{"pfPortfolioid": null,"pfuserid": null,"pfPortfolioname": "Natrayan","pfPurpose": null,"pfBeneUsers": null,"pfStartDt": null,"pfTargetDt": null,"pfTargetIntRate": null,"pfPlannedInvAmt": 10000,"pfInvAmtFeq":"Daily","pfStkAmtsplittype": "Amount","pfmfAmtsplittype":"%","pfStocklists": [{"pfstExchange": "NSE","pfstTradingsymbl": "ITC","pfstLtp": 300,"pfstAmt": 3000,        "pfstPercent": 0,"pfstAllotedAmt": 3000,"pfstTotUnit": 10},{"pfstExchange": "NSE","pfstTradingsymbl":"SBIN","pfstLtp":200,"pfstAmt":1000,"pfstPercent":0,"pfstAllotedAmt":1000,"pfstTotUnit": 2}],"pfMFlists":[{"pfmfFundname": "Birla MNC","pfmfNAV":600,"pfmfAmt":0,"pfmfPercent":50,"pfmfAllotedAmt":5000}]}];;
  pfdetails;

  constructor(private router: Router, private spf :SettingspfService) { }

  ngOnInit() {    

    this.fetchpfdata(); 
  }


fetchpfdata(){
  
  this.spf.getpf().subscribe(
    data =>
          {
            this.pfdetails =data;
            this.onfetch=!this.onfetch;
          },
    error => 
          {  
            this.onfetch=!this.onfetch;          
            this.message1=error.message;
            this.pfdetails=[];
            console.log(error);
                        
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
}

cardasave(pfformobj){
  
  console.log("save card");
  console.log(event);
  console.log(pfformobj);
  console.log(JSON.stringify(pfformobj.value));
  if(pfformobj.pfPortfolioid=="New"){
    console.log("new");
    this.cardasaveNewPortfolio(pfformobj); 
  } else{
    console.log("existing");
    //call update to DB based on portfolio id
  }

  //this.pfdetails.unshift(pfformobj.value);
  // logic to be added to save it in DB
}

cardasaveNewPortfolio(formval){
  this.onAddmode=!this.onAddmode;
  this.onfetch=!this.onfetch;
  this.pfdetails.shift(formval);
}

addNewPortfolio(){
   var empty_pfdetails_fornew=JSON.parse(JSON.stringify((this.empty_pfdetails)));
   empty_pfdetails_fornew.pfportfolioid="New";
   this.pfdetails.unshift(empty_pfdetails_fornew);
   this.onAddmode=!this.onAddmode;
 }

}
