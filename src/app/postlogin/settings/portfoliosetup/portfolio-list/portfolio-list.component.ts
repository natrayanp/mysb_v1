import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent implements OnInit {


  onAddmode = false;

  empty_pfdetails=  {
    pfPortfolioid: null,
    pfuserid: null,
    pfPortfolioname: null,
    pfPurpose: null,
    pfBeneUsers: null,
    pfStartDt: null,
    pfTargetDt: null,
    pfTargetIntRate: null,
    pfPlannedInvAmt: 0,
    pfInvAmtFeq:null,
    pfStkAmtsplittype: null,
    pfmfAmtsplittype:null,
    pfSummed:null,
    pfStocklists: [
      {
        pfstExchange: "",
        pfstTradingsymbl: "",
        pfstLtp: 0,
        pfstAmt: 0,
        pfstPercent: 0,
        pfstAllotedAmt: 0,
        pfstTotUnit: 0
      }
    ],
    pfMFlists:[
      {
        pfmfFundname: "",
        pfmfNAV: 0,
        pfmfAmt: 0,
        pfmfPercent: 0,
        pfmfAllotedAmt: 0
      }
    ]
  };

  //This should come from a service
 //pfdetails=[];

 pfdetails=[{"pfPortfolioid": null,"pfuserid": null,"pfPortfolioname": "Natrayan","pfPurpose": null,"pfBeneUsers": null,"pfStartDt": null,"pfTargetDt": null,"pfTargetIntRate": null,"pfPlannedInvAmt": 10000,"pfInvAmtFeq":"Daily","pfStkAmtsplittype": "Amount","pfmfAmtsplittype":"%","pfStocklists": [{"pfstExchange": "NSE","pfstTradingsymbl": "ITC","pfstLtp": 300,"pfstAmt": 3000,        "pfstPercent": 0,"pfstAllotedAmt": 3000,"pfstTotUnit": 10},{"pfstExchange": "NSE","pfstTradingsymbl":"SBIN","pfstLtp":200,"pfstAmt":1000,"pfstPercent":0,"pfstAllotedAmt":1000,"pfstTotUnit": 2}],"pfMFlists":[{"pfmfFundname": "Birla MNC","pfmfNAV":600,"pfmfAmt":0,"pfmfPercent":50,"pfmfAllotedAmt":5000}]}];;
 

  constructor(private router: Router) { }

  ngOnInit() {
    
    console.log(JSON.stringify(this.pfdetails));
  }


addNewPortfolio(){
 

    this.pfdetails.unshift(this.empty_pfdetails);

  this.onAddmode=!this.onAddmode;
}

cardacancel(event,index){
  this.pfdetails.unshift(this.empty_pfdetails);
  console.log("this.pfdetails");
  console.log(this.pfdetails);
  this.CanceladdNewPortfolio();
  this.onAddmode=!this.onAddmode;

}

cardasave(pfformobj){
  //this.onAddmode=!this.onAddmode;
  console.log("save card");
  console.log(event);
  console.log(pfformobj);
  console.log(pfformobj.value);
  //this.pfdetails.unshift(pfformobj.value);
// logic to be added to save it in DB

}

CanceladdNewPortfolio(){
  
  this.pfdetails.shift();
  this.onAddmode=!this.onAddmode;
  
}

}
