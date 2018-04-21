import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ChangeDetectionStrategy} from '@angular/core';
import { OrderdbservService } from "../../../natservices/orderdbserv.service";
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NotifyService } from '../../../natservices/notify.service';
import { NotificationComponent } from '../../../commonmodule/notificationmodule/notification/notification.component'
import { DbservicesService } from '../../../natservices/dbservices.service';
import { OrderservService } from '../../../natservices/orderserv.service';
import { startWith, tap, delay } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-pfwiseorderlist',
  templateUrl: './pfwiseorderlist.component.html',
  styleUrls: ['./pfwiseorderlist.component.scss']
})
export class PfwiseorderlistComponent implements OnInit {
  /*
  name = 'Angular 5';
  onAddmode = false;
  portfolios: string[]=['Natrayans','Nirudhis','Ananthis','Nidha','Jayakodi','Palaniappan','Arun'];  
  fundlists: string[]=['Aditya Birla Sun Life MNC Fund - Direct Growth','Aditya Birla Sun Life MNC Fund - Direct Divident'];  
  investmenttypes: string[]=['One Time','SIP'];
  
  sipshow= false;
  otshow =false;
  */
  selectedinvtyp:string[] = [];
  selectedfundlists:string[] = [];
  selectedpfs: string[] = [];
  fundnames = [];
  fundnamescpy = [];
  shofndselect = false;
  onetimeamtacrosspf = 0;
  sipamtacrosspf = 0;
  showit: boolean;
  onAddpfmode= false;
  onAddmfmode= false;
  onfetch= true;
  //onAddmode = false;
  message1 = "You don't have any portfolio yet.....Click on Add to start your journey";
  editi:number;
  totalpf:number;
  isEAModeon:boolean = false;

  pfdetails;
  pfcpydetails;

  empty_pfdetails=  {
    pfportfolioid: null,
    pfuserid: null,
    pfscreen:'ord',
    pfnameadd:null,
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


  addonestklst(){
    this.onAddpfmode=!this.onAddpfmode;
  }

  public orForm : FormGroup;

constructor(private orfb: FormBuilder,
            private notify: NotifyService,
            private orderservice: OrderservService,
            private dbserivce: DbservicesService,
            private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    console.log("inside pfwiseorder");
    //this.onfetch=this.orderservice.onfetch;
    this.fetchpforderdata();
    //this.gettotalacrosspf();  
    //this.addPortfolio();
    //this.test();
    
  }
  ngAfterViewChecked(){
    this.getordchanged();
  }

  fetchpforderdata(){
    this.orderservice.getorderdata();
    //this.pfdetails =this.orderservice.pforderdetails;
    //this.pfcpydetails=JSON.parse(JSON.stringify((this.orderservice.pforderdetails)));    
  }
  
  addNewPortfolio() {
    console.log("inside [] outside");
    console.log(this.fundnames.length==0);

    if (this.fundnames.length === 0){
      console.log("inside []");
      this.dbserivce.dbaction('pfmain', 'fetch', this.orderservice.pforderdetails )
      .subscribe(
        record => {
                    console.log('fetchfetch');
                    console.log(record['body'][0]);
                    console.log(record['body'][0].length);
                    if ( record['body'][0].length > 0 ) {
                        console.log('fetchfetch true');
                        this.fundnames = record['body'][0];
                        this.fundnamescpy = this.fundnames;
                        let dd = JSON.parse(JSON.stringify(this.empty_pfdetails));
                        dd.pfnameadd = 'edit';
                        this.orderservice.pforderdetails.push(dd);
                        this.isEAModeon = true;
                    } else {
                      this.notify.update("All Porfolios' are already in order list","info","alert");
                        this.fundnames.push('allused');
                    }
                  /*  let fundnamess = record['body'][0];
                    fundnamess.filter(recs => recs.pfportfolionam == );
                    console.log(this.fundnames);
                    let result = allrecord.filter(recs => recs.orMFfundordelsfreq == trigerrec.orMFfundordelsfreq.value && recs.orMFfundordelsstdt ==trigerrec.orMFfundordelsstdt.value);*/
        }
      );

    }else if (this.fundnames[0] === 'allused') {
      console.log("inside [] allused");
      this.notify.update("All Porfolios' are already in order list","info","alert");
    
    }else if(this.fundnames.length >0) {
        console.log("inside [] have record");
        let dd = JSON.parse(JSON.stringify(this.empty_pfdetails));
        dd.pfnameadd = 'edit';
        this.orderservice.pforderdetails.push(dd);
        this.isEAModeon = true;
    }
}
  

/*
  addPortfolio(){
    this.orForm = this.orfb.group({ 
      orpflists:new FormArray([])
      });
  }

  addonepf(){
  const control = <FormArray>this.orForm.controls['orpflists'];
  control.push(this.initorpflists(this.selectedpfs));
  this.canceladdpf();
}

 initorpflists(pfname) {
    return new FormGroup({
      orportfolio:new FormControl(pfname,Validators.required),
      orStocklists:new FormArray([]),
      orMFlists:new FormArray([])   
    });
  }

addonemflist(controln,fund,invtype){
  //const control = <FormArray>(<FormArray>this.orForm.controls['orpflists']).controls[index].get('orMFlists');
  controln.push(this.initorMFlists(fund,invtype));
  console.log("55555555555555");
  console.log(controln.controls.length);
  console.log("55555555555555");
  this.addonefundordlist(controln,invtype,(controln.controls.length-1));
  this.restfundselect();
  this.showfndselect();
}

restfundselect(){
  this.selectedfundlists=[];
   this.selectedinvtyp =[];

}

addonefundordlist(controln,invtype,ind){  
  const controll = <FormArray>(controln.controls[ind].get('orMFfundorderlists'));
  console.log(controll);
  controll.push(this.initfundordlist(invtype));

  //this.computeshow(controll);
  
}

initorMFlists(fund,invtype) {
    return new FormGroup({
      ormffundname:new FormControl(fund,Validators.required),
      orMFfundorderlists:new FormArray([])      
    });
    
  }



  initfundordlist(invtype){
     return new FormGroup({      
      orMFfundordelstrtyp :new FormControl(invtype,Validators.required),
      orMFfundordelsfreq:new FormControl(''),
      orMFfundordelsstdt:new FormControl(''),
      orMFfundordelsamt:new FormControl('',Validators.required),
      
    });
  }

deleteMFRow(controlls,k) {
  const control = <FormArray>controlls['orMFfundorderlists'];
  control.removeAt(k);
   // this.computeshow(control);
}

  onChangeObj(newobjval){
    console.log("inside");
   console.log(newobjval);
   }

  onChangeObj1(newobjval){
    console.log("inside");
   console.log(newobjval);
   }

  onChangeObj2(newobjval){
    console.log("inside");
   console.log(newobjval);
   }

issip(controlnn){
  if(controlnn.value =='SIP'){
    return true;
  } else{
    return false;
  }

}


otshowcal(controlnn){
  console.log("33333333333333");
  console.log();
  console.log("33333333333333");
  return this.computeshows(controlnn['orMFfundorderlists'],"otshobutt");
  

}


sipshowcal(controlnn){

  return this.computeshows(controlnn['orMFfundorderlists'],"sipshobutt");

}



  computeshows(controlnn,resfor){
    console.log(controlnn);
    var cond1='';
    var cond2='';
    var sipshow = false;
    var otshow = false;
    for (var i=0 ;i < controlnn.length; i++){
      if(controlnn.controls[i].get(['orMFfundordelstrtyp']).value == 'SIP'){
        console.log("inside SIP");
        cond1 = 'SIP';
      }else if (controlnn.controls[i].get(['orMFfundordelstrtyp']).value == 'One Time'){
        cond2 = 'OT';
        console.log("inside OT");      }
      
      
      }
    var strss = cond1+cond2;
    console.log(strss);
      switch(strss){
        case "SIP": {
          sipshow= false;
          otshow =true;
          break;
        }
        case "OT":{
          sipshow= true;
          otshow =false;
          break;
        }
        case "SIPOT":{
         sipshow= false;
         otshow =false;
          break;
        }
        default:{
          sipshow= true;
          otshow =true;
        }

      }

      if (resfor == 'otshobutt'){
        return otshow;
      }else if(resfor == 'sipshobutt'){
        return sipshow;
      }

    }


showfndselect(){
  this.shofndselect=!this.shofndselect;
}


addpf(){
  this.onAddpfmode=true;
}

canceladdpf(){
  this.onAddpfmode=false;
}
  

gettotalacrosspf(){
  this.getone();
  this.getsip();
  this.onetimeamtacrosspf=0;
  this.sipamtacrosspf=0;
  console.log(this.pfdetails);
  console.log(typeof(this.pfdetails));
  this.pfdetails.value.forEach((cure,inder) => {   
    console.log(cure) ;
    this.onetimeamtacrosspf= Number(cure.pfonetimetotal);
    this.sipamtacrosspf = Number(cure.pfsiptotal); });
}

getone(){
  console.log(this.orderservice.pforderdetails);
  return this.orderservice.pforderdetails.pfonetimetotal;
}

getsip(){
  return this.orderservice.pforderdetails.pfsiptotal;
}


*/


cardasave(ind) {
  console.log(ind);
  console.log(this.fundnames);
  console.log(this.orderservice.pforderdetails[ind]);

  const eventrec = this.fundnames.filter(rec => rec.pfportfolioname === this.orderservice.selected2);  
  console.log(eventrec[0]);
  if (eventrec.length === 1) {
    this.orderservice.addfund(ind, eventrec[0]);
    this.orderservice.pforderdetails[ind].pfnameadd = '';
    this.isEAModeon = false;
    // remove the item from fundnames to ensure it has pf's not in order list: START
      let removeitemindex =-1;
      this.fundnames.forEach((cure, inder) => {
        if (cure.pfportfolioname === this.orderservice.selected2) {
          removeitemindex = inder;
        }
      });
      if (removeitemindex !== -1) {
        this.fundnames.splice(removeitemindex, 1);
      }
      if (this.fundnames.length === 0){
        this.fundnames.push('allused');
      }

    // remove the item from fundnames to ensure it has pf's not in order list: START
    } else {
      this.orderservice.formref.controls.pfPortfolioname.setErrors({'nameincorct': true});
    }
}



refshclk(){
  this.orderservice.ordchanged="NO";
}

getordchanged(){
  
  if (this.orderservice.ordchanged =="YES"){
    console.log("inside getorderchanged true");
    this.showit = true;
    
  }else{
    console.log("inside getorderchanged false");
    this.showit = false;
  }
  this.cdRef.detectChanges();
}

}
