import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AsyncPipe } from '@angular/common';
import { SettingspfService } from '../../../../natservices/settingspf.service';
//import { NotificationsService } from '../../../../commonmodule/notifymodule/services/notifications.service';
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
  
  pfdetails;
  pfedetails=[];
  pfcpydetails;

  empty_pfdetails=  {
    pfportfolioid: null,
    pfuserid: null,
    pfscreen:"pfs",
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
    pfshowadcrtbtn:"",
    pfsiptotal:0,
    pfonetimetotal:0,
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



  constructor(private router: Router, 
              private spf :SettingspfService,
              private notify: NotifyService,
              private dbserivce :DbservicesService,) { }

  ngOnInit() {    
    this.fetchpfdata(); 
    this.editi=-1;
  }


fetchpfdata(){
  this.dbserivce.dbaction('pf','fetch','').subscribe(
    data =>
          {        
            this.pfdetails =data['body'];            
            this.totalpf=this.pfdetails.length;
            this.pfcpydetails=JSON.parse(JSON.stringify((this.pfdetails)));
            this.onfetch=false;
          },
    error => 
          {  
            this.onfetch=!this.onfetch;          
            this.pfdetails=[];
            this.notify.update(error.message,"error","alert");
                        
          },
    () => {
          
          }
  );
 
}


cardasave(pfformobj){
  event.preventDefault();
  this.callsavedbaction(pfformobj);
}


callsavedbaction(formval){
  console.log(formval);
  this.dbserivce.dbaction('pf','save',formval).subscribe(
    data => { 
              
              this.fetchpfdata();                 
              this.pfedetails=[];
              this.isEAModeon=false;  
              this.notify.update("Portfolio Saved Succesfully","success","alert");

              },             
            
    error=> {

            this.notify.update(error.error.statusdetails,"error","alert");
            },
    () =>   {
              
            }

  )

}

addNewPortfolio(){
   var empty_pfdetails_fornew=JSON.parse(JSON.stringify((this.empty_pfdetails)));
   empty_pfdetails_fornew.pfportfolioid="NEW";
   empty_pfdetails_fornew.pfscreen="pfs";
   this.pfedetails.unshift(empty_pfdetails_fornew);

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

 executepf(i){  
  var cpy_of = this.pfdetails[i].pfportfolioid;
  
  this.dbserivce.dbaction('pf','execute',cpy_of).subscribe(
    
      data => { 
                
                this.fetchpfdata();                 
                this.notify.update("excution in progress","success","alert");
  
                },             
              
      error=> {
        
              this.notify.update(error.error.statusdetails,"error","alert");
              },
      () =>   {
                
              }
  
    )
 }


 cardacancel(event,index){

  this.editi=-1;
  if(this.pfedetails[0].pfportfolioid=="New"){
    
    
    this.pfedetails.shift();
    this.notify.update("New Portfolio addition cancelled","error","alert");
  }else{
    
    this.pfdetails.splice(index,0,this.pfedetails[0]);
    
    this.notify.update("Portfolio edit cancelled","error","alert");
    this.pfedetails=[];
  }
  this.pfcpydetails=JSON.parse(JSON.stringify((this.pfdetails)));
  
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
