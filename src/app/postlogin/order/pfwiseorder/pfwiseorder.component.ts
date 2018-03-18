import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { OrderdbservService } from "../../../natservices/orderdbserv.service";
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-pfwiseorder',
  templateUrl: './pfwiseorder.component.html',
  styleUrls: ['./pfwiseorder.component.scss']
})
export class PfwiseorderComponent implements OnInit {
  name = 'Angular 5';
  onAddmode = false;
   portfolios: string[]=['Natrayans','Nirudhis','Ananthis','Nidha','Jayakodi','Palaniappan','Arun'];
  selectedpfs:string[] =[];
  fundlists: string[]=['Aditya Birla Sun Life MNC Fund - Direct Growth','Aditya Birla Sun Life MNC Fund - Direct Divident'];
  selectedfundlists:string[] =[];
  investmenttypes: string[]=['One Time','SIP'];
  selectedinvtyp:string[] =[];
  sipshow= false;
  otshow =false;
  shofndselect = false;
  onAddpfmode=false;

  addonestklst(){
    this.onAddmode=!this.onAddmode;
  }

  public orForm : FormGroup;

constructor(private orfb: FormBuilder){}

  ngOnInit() {
    //this.fetchpfdata();
    this.addPortfolio();
    //this.test();
  }
  
  addPortfolio(){
    this.orForm = this.orfb.group({ 
      orpflists:new FormArray([])
      });
  }

  addonepf(){
  const control = <FormArray>this.orForm.controls['orpflists'];
  control.push(this.initorpflists(this.selectedpfs));
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
  
}
