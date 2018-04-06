import { Component, OnInit, Input, Output, EventEmitter}  from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { DbservicesService } from '../../../natservices/dbservices.service';
import { empty } from 'rxjs/observable/empty';

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-orderfinal',
  templateUrl: './orderfinal.component.html',
  styleUrls: ['./orderfinal.component.scss']
})
export class OrderfinalComponent  {



  selectedfundlists:string[] =[];
  investmenttypes: string[]=['One Time','SIP'];
  selectedinvtyp:string[] =[];
  sipshow= false;
  otshow =false;
  shofndselect = false;
  @Input() public pfMFlistsFormArray:FormArray;
  @Input() public mypfdet: any;
  @Input() onEdit;
  fundnames:string[];
  cardpfonetimetotal:number = 0;
  cardpfsiptotal:number = 0;
  teststr;any;

empty = {
  ormflistid:"",
  orportfolioid:"",
  ormffundname:"",
  ormffndcode:"",
  ormffndnameedit:"edit",
  ormfdathold:"",  
  ormffundorderlists:"",
  ormfexecuteshow:"dontshow"
};



emptyinitfundordlist={
  orormflistid:"",
  orormfpflistid:"",
  ormffundordelstrtyp :"",
  ormffundordelsfreq:"",
  ormffundordelsstdt:0,
  ormffundordelsamt:0,
  ormfsipinstal:0,
  ormfsipendt:null,
  //holding select SIP data
  ormfsipdthold:"",
  ormfselctedsip:"",
  ormffndstatus:"New"
};


  public orForm : FormGroup;

constructor(private orfb: FormBuilder,
            private dbserivce :DbservicesService){}

  ngOnInit() {

    this.addPortfolio();    
    this.populateform();   
  }

  populateform(){
    
    if(this.mypfdet.pfmflist != null){  
      this.mypfdet.pfmflist.forEach((recor,index1) => {

        this.addonemflist(recor);
        if (recor.ormffundorderlists != null){
          recor.ormffundorderlists.forEach((recor1,index2) => {

            this.addonefundordlist(
              (<FormArray>this.orForm.controls.orpflists).controls,              
              recor1,
              index1);
          })
        } 
    })
  }
    
  }


 
  addPortfolio(){
    this.orForm = this.orfb.group({ 
      orpflists:new FormArray([])
      });
  }

  addonemflist(valuelist){

    (<FormArray>this.pfMFlistsFormArray).push(this.initorMFlists(valuelist));
  }

addonefundordlist(controln,valuelist,ind){  

  const controll1=(<FormArray>((<FormGroup>this.pfMFlistsFormArray.controls[ind]).controls).orMFFundorderlists);
  
  if(valuelist.ormffundordelstrtyp=="SIP"){        
   
    controll1.push(this.initfundordlist(valuelist));
    
    
  }else{
    
    controll1.insert(0,this.initfundordlist(valuelist));
    
  }

  
}

initorMFlists(valuelist) {
    
  let mfform = new FormGroup({
      orMFListid:new FormControl(valuelist.ormflistid),
      orPortfolioid:new FormControl(valuelist.orportfolioid),
      orMFFundname:new FormControl(valuelist.ormffundname,Validators.required),
      orMFFndnameedit:new FormControl(valuelist.ormffndnameedit,Validators.required),
      orMFFndcode:new FormControl(valuelist.ormffndcode),
      orMFFndsipstatus:new FormControl(valuelist.ormffndsipstatus),
      orMFDathold:new FormControl(valuelist.ormfdathold),
      orMFFundorderlists:new FormArray([])      
    });

    mfform.get('orMFFundname').valueChanges
    .debounceTime(200)
    .distinctUntilChanged()
    .switchMap((query) =>  ((query.length > 2) ? this.dbserivce.dbaction('fund','fetch',query.toUpperCase() ) : empty()))
    .subscribe(        
        queryField => {  
                 
                        this.fundnames=queryField['body'];
                       
                        this.fundnames.length >0? console.log(this.fundnames):0;

                        if(this.fundnames.length == 1){
                          
                  
                         
                          mfform.get('orMFDathold').patchValue(this.fundnames.length >0? this.fundnames :{});
                          mfform.get('orMFFndcode').patchValue(this.fundnames.length ==1? this.fundnames[0]['fndschcdfrmbse'] :{});


                        }

                      },
        error =>      {
                        
                      },
        () =>         {
                        
                      }
                    );


    return mfform;

    
  }



initfundordlist(valuelist){
    let orlisform =  new FormGroup({      
      orORMFlistid:new FormControl(valuelist.orormflistid),
      orORMFpflistid:new FormControl(valuelist.orormfpflistid),
      orMFfundordelstrtyp :new FormControl(valuelist.ormffundordelstrtyp,Validators.required),
      orMFfundordelsfreq:new FormControl(valuelist.ormffundordelsfreq),
      orMFfundordelsstdt:new FormControl(valuelist.ormffundordelsstdt),
      orMFfundordelsamt:new FormControl(valuelist.ormffundordelsamt,Validators.required),
      orMFsipinstal:new FormControl(valuelist.ormfsipinstal),
      orMFsipendt:new FormControl(valuelist.ormfsipendt),
      //holding select SIP data
      ormfSipdthold:new FormControl(valuelist.ormfsipdthold),
      ormfSelctedSip:new FormControl(valuelist.ormfselctedsip),
      orMFFndstatus:new FormControl(valuelist.ormffndstatus),
    });

    orlisform.valueChanges
    .distinctUntilChanged()
    .subscribe(values => {
      resolvedPromise.then(() => {
        
        
        if(orlisform.controls.orMFfundordelsfreq.value =="" || orlisform.controls.orMFfundordelsfreq.value == null){
          orlisform.controls.orMFfundordelsfreq.setErrors({'incorrect': true});
        }else{
          orlisform.controls.orMFfundordelsfreq.setErrors(null);
        };
       
        this.cardMFtotalcalc();
        })
  });

  orlisform.get('orMFsipinstal').valueChanges
  .distinctUntilChanged()
  .subscribe(values => {
    this.validatesip(orlisform.controls.orMFsipinstal,orlisform.controls.ormfSelctedSip.value);
  });

  return orlisform;
  }


//###############This is not working and may need to remove//###############
//this for identifying duplicate SIP records
//thinking allowing multiple SIP on the same date is valid as the installments may different
//so commenting now
/*
  filterss(trigerrec,allrecord){
    console.log("filterss");    
    console.log(trigerrec);
    console.log(allrecord);
    console.log(trigerrec.orMFfundordelsfreq.value);
    let result = allrecord.filter(recs => recs.orMFfundordelsfreq == trigerrec.orMFfundordelsfreq.value && recs.orMFfundordelsstdt ==trigerrec.orMFfundordelsstdt.value);

    console.log(result);

    if (result.length >1){
      console.log("inside if");
      trigerrec.orMFfundordelsstdt.setErrors({'incorrect': true});
               
    }else {
      console.log("inside else");
      if(trigerrec.orMFfundordelsstdt.value =="" || trigerrec.orMFfundordelsstdt.value == null){
        trigerrec.orMFfundordelsstdt.setErrors({'incorrect': true});
        console.log("inside else if");
      }else{
      trigerrec.orMFfundordelsstdt.setErrors(null);     
      console.log("inside else if else");     
      }
    }

    console.log("filterss");
  }
*/
//###############This is not working and may need to remove//###############

cardMFtotalcalc()
{
  this.cardpfonetimetotal=0;
  this.cardpfsiptotal=0;
  this.pfMFlistsFormArray.value.forEach((cure,inder) => {    
    cure.orMFFundorderlists.forEach((cure1,inder1) => {
      if(cure1.orMFfundordelstrtyp == "One Time"){
        this.cardpfonetimetotal =  this.cardpfonetimetotal+ Number(cure1.orMFfundordelsamt);             
      }else if(cure1.orMFfundordelstrtyp == "SIP"){
        this.cardpfsiptotal = this.cardpfsiptotal+Number(cure1.orMFfundordelsamt);
      }      
      
    })


    })
    
  }

addnewmflist(){
  if (this.mypfdet.pfmflist == "" || this.mypfdet.pfmflist == null){    
    this.mypfdet.pfmflist=[];
  }
  this.mypfdet.pfmflist.push(JSON.parse(JSON.stringify(this.empty)));
  this.addonemflist(this.empty);
}

addnewfundordlist(reccontrol,siponetime,ind){

  if (this.mypfdet.pfmflist[ind].ormffundorderlists == "" || this.mypfdet.pfmflist[ind].ormffundorderlists == null){    
    this.mypfdet.pfmflist[ind].ormffundorderlists=[];
  }
  
  let modempty = JSON.parse(JSON.stringify(this.emptyinitfundordlist));
  modempty.ormffundordelstrtyp = siponetime;


  if(siponetime=="SIP"){    
    this.mypfdet.pfmflist[ind].ormffundorderlists.push(modempty);
  }else{
    this.mypfdet.pfmflist[ind].ormffundorderlists.splice(0,0,modempty);
  }
  
  
  this.addonefundordlist(reccontrol,modempty,ind); 
}




deleteMFRow(controlls,k,l) {
  const control = <FormArray>controlls['orMFFundorderlists'];
  control.removeAt(l);
  this.mypfdet.pfmflist[k].ormffundorderlists.splice(l,1);
  this.cardMFtotalcalc();
   
}



issip(controlnn){
  if(controlnn.value =='SIP'){
    return true;
  } else{
    return false;
  }

}


otshowcal(controlnn){

  return this.computeshows(controlnn['orMFFundorderlists'],"otshobutt");
}


sipshowcal(controlnn){
  return this.computeshows(controlnn['orMFFundorderlists'],"sipshobutt");
}



  computeshows(controlnn,resfor){
    
    var cond1='';
    var cond2='';
    var sipshow = false;
    var otshow = false;
    for (var i=0 ;i < controlnn.length; i++){
      if(controlnn.controls[i].get(['orMFfundordelstrtyp']).value == 'SIP'){        
        cond1 = 'SIP';
      }else if (controlnn.controls[i].get(['orMFfundordelstrtyp']).value == 'One Time'){
        cond2 = 'OT';      
      }    
      
      }
    var strss = cond1+cond2;    
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

edittog(control,k){


  if(control.controls.orMFFndnameedit.value == 'edit'){
      //Check to restrict same fund added in the pf

  let allrecord =  this.pfMFlistsFormArray.value;
  let result = allrecord.filter(recs => recs.orMFFundname == control.controls.orMFFundname.value);  
  if(result.length>1){
    control.controls.orMFFundname.setErrors({'namexists': true});
    return;
  }else{
    control.controls.orMFFundname.setErrors(null);
  }
  
  //Check to see valid fund is selected
  result = this.fundnames.filter(recs => (<any>recs).fnddisplayname == control.controls.orMFFundname.value);
  
  if(result.length<1){
    control.controls.orMFFundname.setErrors({'invalidfund': true});
    return;
  }else{
    control.controls.orMFFundname.setErrors(null);
  }
  control.controls.orMFFndnameedit.patchValue("noedit");    

  }else{
    control.controls.orMFFndnameedit.patchValue("edit");
    while (control.controls.orMFFundorderlists.length !== 0) {
      control.controls.orMFFundorderlists.removeAt(0);
      this.mypfdet.pfmflist[k].ormffundorderlists=[];

    }
  }
  this.cardMFtotalcalc();  
}


freqSelectchange(evt: any,sipdetail:any){
  evt['ormfSipdthold'].patchValue(sipdetail.sipfreqdates);
  evt['ormfSelctedSip'].patchValue(sipdetail);
}

removefund(k,l){
  const control = this.pfMFlistsFormArray;

  control.removeAt(k);
  this.mypfdet.pfmflist.splice(k,1);
  
  this.cardMFtotalcalc();
}

validatesip(controlref,selectedsip){
  if (selectedsip == 0){
  
    controlref.setErrors({'incorrect': true});
  }
  if( (Number(controlref.value) < Number(selectedsip.sipmininstal)) ||  (Number(controlref.value) > Number(selectedsip.sipmaxinstal))){
    controlref.setErrors({'incorrect': true});    
  }else{
      
  }
}

validateamt(sublist,main){


  if(main == 0){

    sublist.controls.orMFfundordelsamt.setErrors({'amtlimit': true});
  }

  if(sublist.controls.orMFfundordelstrtyp.value == "One Time"){
    if(((sublist.controls.orMFfundordelsamt.value > (main.controls.ormfDathold.value)[0].fndmaxpuramt)) ||
    ((sublist.controls.orMFfundordelsamt.value < (main.controls.ormfDathold.value)[0].fndminpuramt))){
      sublist.controls.orMFfundordelsamt.setErrors({'amtlimit': true});     
    }else {
      if(((sublist.controls.orMFfundordelsamt.value)%((main.controls.ormfDathold.value)[0].fndpuramtinmulti))!=0){
        sublist.controls.orMFfundordelsamt.setErrors({'amtlimit': true});
      }else{
        
      sublist.controls.orMFfundordelsamt.setErrors(null);  
    }
    }
}if(sublist.controls.orMFfundordelstrtyp.value == "SIP"){
  if(((sublist.controls.orMFfundordelsamt.value > (sublist.controls.ormfSelctedSip.value).sipmaxamt)) ||
  ((sublist.controls.orMFfundordelsamt.value < (sublist.controls.ormfSelctedSip.value).sipminamt))){
    sublist.controls.orMFfundordelsamt.setErrors({'amtlimit': true});  
  }else {
    if(((sublist.controls.orMFfundordelsamt.value) % ((sublist.controls.ormfSelctedSip.value).sipmulamt))!=0){
      sublist.controls.orMFfundordelsamt.setErrors({'amtlimit': true});  
    }else{
      
      sublist.controls.orMFfundordelsamt.setErrors(null); 
    }
  }
}

}

viewchildchk(){
  
}

cc(orMFfundorderlis){
  

  return true;

}


}





