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

  name = 'Angular 5';
  onAddmode = false;
  //selectedpfs:string[] =[];
  selectedfundlists:string[] =[];
  investmenttypes: string[]=['One Time','SIP'];
  selectedinvtyp:string[] =[];
  sipshow= false;
  otshow =false;
  shofndselect = false;
  @Input() pfname;
  @Input() onEdit;
  fundnames:string[];
  cardpfonetimetotal:number = 0;
  cardpfsiptotal:number = 0;

  addonestklst(){
    this.onAddmode=!this.onAddmode;
  }

  public orForm : FormGroup;

constructor(private orfb: FormBuilder,
            private dbserivce :DbservicesService){}

  ngOnInit() {
    this.orForm = this.initorpflists(this.pfname);
    //this.addPortfolio();
    //this. addonepf();
    console.log(" ");
    console.log(this.onEdit);
    //this.test();
  }
  
  addPortfolio(){
    this.orForm = this.orfb.group({ 
      orpflists:new FormArray([])
      });
  }

  addonepf(){
  const control = <FormArray>this.orForm.controls['orpflists'];
  control.push(this.initorpflists(this.pfname));
}

 initorpflists(pfname) {
    return new FormGroup({
      orportfolio:new FormControl(pfname,Validators.required),
      orStocklists:new FormArray([]),
      orMFlists:new FormArray([]),
      orSiptotal: new FormControl(0),
      orOnetimetotal: new FormControl(0)
    });
  }


  addonemflist(controln){
  controln.push(this.initorMFlists());
  //this.addonefundordlist(controln,"",(controln.controls.length-1));
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
  if(invtype=="SIP"){
  controll.push(this.initfundordlist(invtype));
  }else{
    controll.insert(0,this.initfundordlist(invtype));
  }

  //this.computeshow(controll);
  
}

initorMFlists() {
    
  let mfform = new FormGroup({
      ormffundname:new FormControl('',Validators.required),
      ormffndnameedit:new FormControl("edit",Validators.required),
      ormfDathold:new FormControl(""),
      orMFfundorderlists:new FormArray([])    
      
    });

    mfform.get('ormffundname').valueChanges
    .debounceTime(200)
    .distinctUntilChanged()
    .switchMap((query) =>  ((query.length > 2) ? this.dbserivce.dbaction('fund','fetch',query.toUpperCase() ) : empty()))
    .subscribe(        
        queryField => {  
          console.log("----->----checkfetch@");                   
                        console.log(queryField['body']);
                        console.log("----->----@");                   
                        this.fundnames=queryField['body'];
                       
                        this.fundnames.length >0? console.log(this.fundnames):0;
                        if(this.fundnames.length == 1){
                          this.fundnames.forEach(ele  => {
                          if((<any>ele).fnsipdt!= null){
                            (<any>ele).fnsipdt.forEach(sipele => {
                              var array= sipele.sipfreqdates.split(',');
                              sipele.sipfreqdates=array;
                              //mfform.get('ormfSipdthold').patchValue(sipele.sipfreqdates);
                            })
                            console.log("----->----");
                              console.log(this.fundnames);
                              console.log("----->----");
                          }

                              });                               
                  
                              
                          mfform.get('ormfDathold').patchValue(this.fundnames.length >0? this.fundnames :{});

                          //mfform.controls.pfmfDathold
                          console.log("nat---------########");
                          console.log(mfform.get('pfmfFundname'));
                          console.log("nat---------########");
                          
                          //mfform.get('pfmffreq').patchValue(this.fundnames.length >0? this.fundnames[0]['fnsipdt'][0]['sipfreq'] :0);
                          //mfform.get('pfmfsipdt').patchValue(this.fundnames.length >0? this.fundnames[0]['sipfreq'] :0);
                        }

                      },
        error =>      {
                        console.log(error);
                      },
        () =>         {
                        console.log("inside value ");
                      }
                    );


    return mfform;

    
  }



initfundordlist(invtype){
    let orlisform =  new FormGroup({      
      orMFfundordelstrtyp :new FormControl(invtype,Validators.required),
      orMFfundordelsfreq:new FormControl(''),
      orMFfundordelsstdt:new FormControl(''),
      orMFfundordelsamt:new FormControl('',Validators.required),
      orMFsipinstal:new FormControl(''),
      orMFsipendt:new FormControl(''),
      //holding select SIP data
      ormfSipdthold:new FormControl(""),
      ormfSelctedSip:new FormControl(""),
    });

    

    orlisform.valueChanges
    .distinctUntilChanged()
    .subscribe(values => {
      resolvedPromise.then(() => {
        this.validatesip(orlisform.controls.orMFsipinstal,orlisform.controls.ormfSelctedSip.value);         
        
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
  this.orForm.controls.orMFlists.value.forEach((cure,inder) => {    
    cure.orMFfundorderlists.forEach((cure1,inder1) => {
      if(cure1.orMFfundordelstrtyp == "One Time"){
        this.cardpfonetimetotal =  this.cardpfonetimetotal+ Number(cure1.orMFfundordelsamt);             
      }else if(cure1.orMFfundordelstrtyp == "SIP"){
        this.cardpfsiptotal = this.cardpfsiptotal+Number(cure1.orMFfundordelsamt);
      }      
      
    })


    })

    this.orForm.controls.orSiptotal.patchValue(this.cardpfonetimetotal);
    this.orForm.controls.orOnetimetotal.patchValue(this.cardpfsiptotal);
  }

deleteMFRow(controlls,k) {
  const control = <FormArray>controlls['orMFfundorderlists'];
  control.removeAt(k);
  this.cardMFtotalcalc();
   // this.computeshow(control);
}

/*
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
*/

issip(controlnn){
  if(controlnn.value =='SIP'){
    return true;
  } else{
    return false;
  }

}


otshowcal(controlnn){

  return this.computeshows(controlnn['orMFfundorderlists'],"otshobutt");
}


sipshowcal(controlnn){
  return this.computeshows(controlnn['orMFfundorderlists'],"sipshobutt");
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

  //Check to restrict same fund added in the pf
  let allrecord =  this.orForm.controls.orMFlists.value;
  let result = allrecord.filter(recs => recs.ormffundname == control.controls.ormffundname.value);  
  if(result.length>1){
    control.controls.ormffundname.setErrors({'namexists': true});
    return;
  }else{
    control.controls.ormffundname.setErrors(null);
  }
  
  //Check to see valid fund is selected
  result = this.fundnames.filter(recs => (<any>recs).fnddisplayname == control.controls.ormffundname.value);
  console.log(result);
  if(result.length<1){
    control.controls.ormffundname.setErrors({'invalidfund': true});
    return;
  }else{
    control.controls.ormffundname.setErrors(null);
  }

  if(control.controls.ormffndnameedit.value == 'edit'){
  control.controls.ormffndnameedit.patchValue("noedit");
  }else{
    control.controls.ormffndnameedit.patchValue("edit");
    while (control.controls.orMFfundorderlists.length !== 0) {
      control.controls.orMFfundorderlists.removeAt(0);
    }
  };
  this.cardMFtotalcalc();  
}


freqSelectchange(evt: any,sipdetail:any){
  evt['ormfSipdthold'].patchValue(sipdetail.sipfreqdates);
  evt['ormfSelctedSip'].patchValue(sipdetail);
}

removefund(k){
  const control = <FormArray>this.orForm.controls['orMFlists'];
  control.removeAt(k);
  this.cardMFtotalcalc();
}

validatesip(controlref,selectedsip){
  if( (Number(controlref.value) < Number(selectedsip.sipmininstal)) ||  (Number(controlref.value) > Number(selectedsip.sipmaxinstal))){
    controlref.setErrors({'incorrect': true});    
  }else{
   // controlref.setErrors(null);    
  }
}

validateamt(sublist,main){
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
}





