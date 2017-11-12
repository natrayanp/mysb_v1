import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AsyncPipe } from '@angular/common';
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
  showcancelalrt= true;
  dberror:boolean;

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
  if (this.showcancelalrt  == true){
    this.notifyservice.alert("Cancel Changes","Changes made in the portfolio are discarded");    
  }  
  this.refereshpf();
  this.onAddmode=false;
}

CanceladdNewPortfolio(){  
  if (this.showcancelalrt  == true){
    this.notifyservice.alert("Cancel New addition","New portfolio addition cancelled");
  }
  this.refereshpf();
}

refereshpf(){
  this.pfdetails.shift();
  console.log("after shitf");
  this.onAddmode=false;  
}

cardasave(pfformobj){

  event.preventDefault();
  console.log("save card");
  console.log((pfformobj));
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

  }

}

cardasaveNewPortfolio(formval){
  console.log("save NEW card");
  event.preventDefault();
  this.onAddmode=false;
  console.log(JSON.stringify(formval));
  this.callsavedbaction(formval);
  if (this.dberror==true){
    console.log("calling cancelnewportfolio");
    this.CanceladdNewPortfolio(); 
  }
}

callsavedbaction(formval){
  this.dberror = true;
  this.spf.savepf(formval).subscribe(
    data => { 
              console.log("inside data of savepf");
              console.log(data);
             if((data.body['natstatus']=='success') ) {
              this.onfetch=!this.onfetch;
              this.fetchpfdata();              
              console.log("saved successfully");
              this.notifyservice.success("Saved successfully",data.body['statusdetails']);
              this.showcancelalrt=false;
              this.dberror = false;
              }
              
            },
    error=> {
            console.log("inside error of savepf");
            console.log(error);

            if((error.error['natstatus']=='error') ) {  
              console.log("inside error");                         ;
              this.notifyservice.error("Save failed",error.error['statusdetails']);    
              console.log("inside error end") ;         
            }else if((error.error['natstatus']=='warning') ) {
              this.notifyservice.alert("Save failed",error.error['statusdetails']);
            }else{
              this.notifyservice.alert("Save failed",error.error);
            }            
            this.showcancelalrt=false;
            this.dberror = true;
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
