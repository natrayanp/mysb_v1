import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { NotificationsService } from '../../../../commonmodule/notifymodule/services/notifications.service';
import { DbservicesService } from '../../../../natservices/dbservices.service';
import { NotifyService } from '../../../../natservices/notify.service';
import { NotificationComponent } from '../../../../commonmodule/notificationmodule/notification/notification.component'

import { empty } from 'rxjs/observable/empty';
import { element } from 'protractor';
const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit 
{
  //onEdit=false;
  public pfForm : FormGroup;
  
  summed: number;
  balanceleft:number = 0;

  fundnames:string[];
  mfsummed:number=0;
  stksummed:number=0;
  today = new Date();
  @Input() Mypfdetail;
  @Input() OnAdd;
  @Input() myindex;
  @Input() onEdit;
  @Input() EAMode;
  
  Mypfdetailcpy:any;
  OnAddEdit=false;


  MfPurTypes = ["SIP","One-Time"];
  sipfreqs = ['Monthly'];
  sipdates = ['1','2','3'];
 
 emptyPayOff = {
      pfstexchange: "",
      pfsttradingsymbl: "",
      pfstltp: 0,
      pfstamt: 0,
      pfstpercent: 0,
      pfstallotedamt: 0,
      pfsttotunit: 0
    };


    emptymf= {
      pfmffundname: "",
      pfmfpurtype: "",
      pfmffreq: "",
      pfmfsipdt: "",
      pfmfamt: 0,
      pfmfpercent: 0,
      pfmfallotedamt: 0,
      pfmfdathold:"",
      pfmfsipdthold:"",
      pfmfallotedamtmonequ:0,
      pfmfsipendt:""
    };
 
  freqs = ['Daily','Weekly','Fortnightly','Monthly','Quaterly','Halfyearly','Yearly','Adhoc'];
  userSchedules=[{"title":"natrayans Portfolio","description":"for my savings","location":"9.5%","timeStart":this.today,"timeEnd":this.today}];
  AmtSplitTypes=['%','Amount'];
  selectedAmtSplitType = this.AmtSplitTypes[0];
  selectedMFAmtSplitType = this.AmtSplitTypes[0];
  @Output() cardcancel: EventEmitter<any> = new EventEmitter();
  @Output() cardsave: EventEmitter<any> = new EventEmitter();
  @Output() cardedit: EventEmitter<any> = new EventEmitter();
  

  
  
//, private ref: ChangeDetectorRef
  constructor(private pffb: FormBuilder,private router: Router,private notifyservice: NotificationsService,private dbserivce :DbservicesService,) { 
     

}

  ngOnInit() {


 
 console.log("iam inside card");
 console.log("this.Mypfdetail");
  console.log(this.Mypfdetail);
  console.log("this.myindex");
  console.log(this.myindex);
       
  /*this.Mypfdetail.pfplannedinvamt =0;
  this.Mypfdetail.pfsummed =0;
  this.balanceleft=0;
    if (this.Mypfdetail == null || this.Mypfdetail.pfportfolioname == null )
    {
      this.onEdit=true;
    }
    
    if(this.Mypfdetail.pfstksmtsplittype !== null){
      this.selectedAmtSplitType = this.Mypfdetail.pfstkamtsplittype;
    }
    if(this.Mypfdetail.pfmfAmtsplittype !== null){
      this.selectedMFAmtSplitType = this.Mypfdetail.pfmfamtsplittype;
    }
 */

    this.pfForm = this.pffb.group({ 
      pfPortfolioid:[null],
      pfuserid:[null],
      pfPortfolioname:[null,Validators.required],
      pfPurpose:[null],
      pfBeneUsers:[null,Validators.required],
      pfStartDt:[null,Validators.required],
      pfTargetDt:[null,Validators.required],
      pfTargetIntRate:[null,Validators.required],
      pfPlannedInvAmt:[0,Validators.required],
      pfInvAmtFeq:[null,Validators.required],
      pfStkAmtsplittype:[null,Validators.required],
      pfmfAmtsplittype:[null,Validators.required],
      pfSummed: [0],
      pfStocklists:new FormArray([]),
      pfMFlists:new FormArray([])  
      });

    
    this.FormCardpopulate();

  console.log("check mypfdetailscopy");
  console.log(JSON.stringify(this.Mypfdetailcpy));

  this.pfForm.get('pfPlannedInvAmt').valueChanges.subscribe(values => {
    resolvedPromise.then(() => {
      console.log("inside planned investment amonu");
      console.log(this.balanceleft);
      console.log(this.Mypfdetailcpy.pfplannedinvamt);
      console.log(this.Mypfdetail.pfsummed);
      this.balanceleft= this.Mypfdetailcpy.pfplannedinvamt - this.Mypfdetailcpy.pfsummed ;
      this.calculateformfamtchange();
      this.calculateforstkamtchange();
  })
  });


     this.pfForm.get('pfStocklists').valueChanges.subscribe(values => {
     resolvedPromise.then(() => {
        
      this.calculateforstkamtchange();
    
      });
      
    });
    
  this.pfForm.get('pfMFlists').valueChanges
    .subscribe(values => {
      console.log("printing value");
      console.log(values);
      console.log("printing value");

      resolvedPromise.then(() => {
               
        this.calculateformfamtchange();      
        
       });

       
     });

    this.Cancelutlogic();

//ngoninit end
  }

  UserEdit(event){
    //this.onEdit=!this.onEdit;
    console.log("inside user edit");
    console.log(this.myindex);
    this.cardedit.emit(this.myindex);

  }

  initMFItemRows(MFObj) {
    let mfform = new FormGroup({
        pfmfFundname : new FormControl(MFObj.pfmfFundname),
        pfmfpurtype: new FormControl(MFObj.pfmfPurtype),
        pfmffreq: new FormControl(MFObj.pfmfFreq),
        pfmfsipdt: new FormControl(MFObj.pfmfSipdt),
        pfmfAmt: new FormControl(MFObj.pfmfAmt),
        pfmfPercent: new FormControl(MFObj.pfmfPercent),
        pfmfAllotedAmt:new FormControl(MFObj.pfmfAllotedAmt),
        pfmfDathold:new FormControl(MFObj.pfmfdathold),     
        pfmfSipdthold:new FormControl(MFObj.pfmfsipdthold),
        pfmfAllotedAmtMonEqu: new FormControl(MFObj.pfmfallotedamtmonequ),
        pfSipEnDt: new FormControl(MFObj.pfmfsipendt)
    });

    mfform.get('pfmfFundname').valueChanges
    .debounceTime(200)
    .distinctUntilChanged()
    //.subscribe(
    .switchMap((query) =>  ((query.length > 2) ? this.dbserivce.dbaction('fund','fetch',query.toUpperCase() ) : empty()))
    .subscribe(        
        queryField => {  
          console.log("----->----@");                   
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
                              
                              
                              mfform.get('pfmfSipdthold').patchValue(sipele.sipfreqdates);
                            })
                            console.log("----->----");
                              console.log(this.fundnames);
                              console.log("----->----");
                          }

                              });                               
                  
                              
                          mfform.get('pfmfDathold').patchValue(this.fundnames.length >0? this.fundnames :{});

                          mfform.controls.pfmfDathold
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


initStkItemRows(payOffObj) {
  return new FormGroup({
      pfstExchange : new FormControl(payOffObj.pfstExchange),
      pfstTradingsymbl: new FormControl(payOffObj.pfstTradingsymbl),
      pfstLtp: new FormControl(payOffObj.pfstLtp),
      pfstAmt: new FormControl(payOffObj.pfstAmt),
      pfstPercent: new FormControl(payOffObj.pfstPercent),
      pfstAllotedAmt:new FormControl(payOffObj.pfstAllotedAmt),
      pfstTotUnit: new FormControl(payOffObj.pfstTotUnit)
  });
}

calculateformfamtchange(){

  /*
  switch (this.pfForm.controls.pfmfAmtsplittype.value)
  {
    case "%":
    this.pfForm.controls.pfMFlists.value.forEach((cure,inder) => {   
      if (this.Mypfdetailcpy.pfmflist[inder].pfmfpurtype !="One-Time"){          
      
      switch ((this.Mypfdetailcpy.pfmflist[inder].pfmffreq).toUpperCase()){
        case "MONTHLY":
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = this.Mypfdetailcpy.pfplannedinvamt * (this.Mypfdetailcpy.pfmflist[inder].pfmfpercent/100);
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ = this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt;
          break;
        case "WEEKLY":
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = (this.Mypfdetailcpy.pfplannedinvamt * (this.Mypfdetailcpy.pfmflist[inder].pfmfpercent/100))/4;
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ = this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt*4;
          break;
        case "DAILY":
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = (this.Mypfdetailcpy.pfplannedinvamt * (this.Mypfdetailcpy.pfmflist[inder].pfmfpercent/100))/21;
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ = this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt*21;
          break;
        case "ANNUALLY":
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = (this.Mypfdetailcpy.pfplannedinvamt * (this.Mypfdetailcpy.pfmflist[inder].pfmfpercent/100))*12;
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ = this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt/12;
          break;
        case "QUARTERLY":
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = (this.Mypfdetailcpy.pfplannedinvamt * (this.Mypfdetailcpy.pfmflist[inder].pfmfpercent/100))*3;
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ =this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt/3;
          break;
        case "SEMI-ANNUALLY":
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = (this.Mypfdetailcpy.pfplannedinvamt * (this.Mypfdetailcpy.pfmflist[inder].pfmfpercent/100))*6;
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ =this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt/6;
          break;
        

      }

    }
      //this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = this.Mypfdetailcpy.pfplannedinvamt * (this.Mypfdetailcpy.pfmflist[inder].pfmfpercent/100);
      //this.Mypfdetailcpy.pfmflist[inder].pfstTotUnit = this.Mypfdetailcpy.pfmflist[inder].pfmfAllotedAmt/this.Mypfdetailcpy.pfstklist[inder].pfmfLtp;
    });
    break;

   case "Amount":*/
   this.pfForm.controls.pfMFlists.value.forEach((cure,inder) => {   
   // values.forEach((cure,inder) => {
    if (this.Mypfdetailcpy.pfmflist[inder].pfmfpurtype !="One-Time"){
      switch ((this.Mypfdetailcpy.pfmflist[inder].pfmffreq).toUpperCase()){
        case "MONTHLY":
          //this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = this.Mypfdetailcpy.pfmflist[inder].pfmfamt;
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ = this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt;
          break;
        case "WEEKLY":
          //this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = this.Mypfdetailcpy.pfmflist[inder].pfmfamt;
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ = this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt*4;
          break;
        case "DAILY":
          //this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = this.Mypfdetailcpy.pfmflist[inder].pfmfamt;
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ = this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt*21;
          break;
        case "ANNUALLY":
          //this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = this.Mypfdetailcpy.pfmflist[inder].pfmfamt;
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ = this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt/12;
          break;
        case "QUARTERLY":
          //this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = this.Mypfdetailcpy.pfmflist[inder].pfmfamt;
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ = this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt/3;
          break;
        case "SEMI-ANNUALLY":
          //this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = this.Mypfdetailcpy.pfmflist[inder].pfmfamt;
          this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ = this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt/6;
          break;
      }
    }else{
      this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamtmonequ = 0;
    }
  
  });
    /*
      //this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = this.Mypfdetailcpy.pfmflist[inder].pfmfamt;
      //this.Mypfdetailcpy.pfstklist[inder].pfstTotUnit = this.Mypfdetailcpy.pfstklist[inder].pfstAllotedAmt/this.Mypfdetailcpy.pfstklist[inder].pfstLtp;
    });
    break;

  }*/
  //this.mfsummed = this.pfForm.controls.pfMFlists.value.reduce((acc, cur) => acc + cur.pfmfAllotedAmt, 0);
  this.mfsummed = this.pfForm.controls.pfMFlists.value.reduce((acc, cur) => acc + cur.pfmfAllotedAmtMonEqu, 0);
  
  this.summed = this.mfsummed  + this.stksummed;
  this.Mypfdetailcpy.pfsummed = this.summed;
  this.balanceleft= this.Mypfdetailcpy.pfplannedinvamt - this.Mypfdetailcpy.pfsummed ;
}

calculateforstkamtchange(){
  if (this.pfForm.controls.pfStocklists != null)
  {
    console.log("nnnnnnnnnnnnn");
    console.log(this.pfForm.controls.pfStocklists);
    console.log("nnnnnnnnnnnnn");
  switch (this.pfForm.controls.pfStkAmtsplittype.value)
  {
    case "%":
    console.log("inside %");
    this.pfForm.controls.pfStocklists.value.forEach((cure,inder) => {             
         console.log("this.Mypfdetailcpy.pfplannedinvamt");
         console.log(this.Mypfdetailcpy.pfplannedinvamt);
         console.log("this.Mypfdetailcpy.pfstklist[inder].pfstpercent");
         console.log(this.Mypfdetailcpy.pfstklist[inder].pfstpercent);


         this.Mypfdetailcpy.pfstklist[inder].pfstallotedamt = this.Mypfdetailcpy.pfplannedinvamt *(this.Mypfdetailcpy.pfstklist[inder].pfstpercent/100);
         this.Mypfdetailcpy.pfstklist[inder].pfstTotUnit = (Math.floor((this.Mypfdetailcpy.pfstklist[inder].pfstallotedamt/this.Mypfdetailcpy.pfstklist[inder].pfstltp))).toFixed(0);
       });
       break;

    case "Amount":
    this.pfForm.controls.pfStocklists.value.forEach((cure,inder) => {
         this.Mypfdetailcpy.pfstklist[inder].pfstallotedamt = <number>this.Mypfdetailcpy.pfstklist[inder].pfstamt;
         this.Mypfdetailcpy.pfstklist[inder].pfstTotUnit = (Math.floor((this.Mypfdetailcpy.pfstklist[inder].pfstallotedamt/this.Mypfdetailcpy.pfstklist[inder].pfstltp))).toFixed(0);
       });
     break;
   default:
   this.pfForm.controls.pfStocklists.value.forEach((cure,inder) => this.Mypfdetailcpy.pfstklist[inder].pfstTotUnit = 0);
       break;
   };

   this.stksummed = this.pfForm.controls.pfStocklists.value.reduce((acc, cur) => acc + cur.pfstAllotedAmt, 0);
   this.summed = this.mfsummed  + this.stksummed;
   this.Mypfdetailcpy.pfsummed = this.summed;
   this.balanceleft= this.Mypfdetailcpy.pfplannedinvamt - this.Mypfdetailcpy.pfsummed ;   
   console.log(this.stksummed);
  }
}





 
AmtSplitchange(newobjval){
 this.Mypfdetailcpy.pfstkamtsplittype = this.selectedAmtSplitType;
 this.Mypfdetailcpy.pfstklist.forEach((cure,inder) => {
  this.Mypfdetailcpy.pfstklist[inder].pfstamt = 0;
  this.Mypfdetailcpy.pfstklist[inder].pfstpercent = 0;
  const control3 = (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstAmt'].patchValue(0);   
  const control4 = (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstPercent'].patchValue(0);     

});

}

MFAmtSplitchange(newobjval){
  this.Mypfdetailcpy.pfmfamtsplittype = this.selectedMFAmtSplitType;

if(this.Mypfdetailcpy.pfmflist.length > 0){
 this.Mypfdetailcpy.pfmflist.forEach((cure,inder) => {
    this.Mypfdetailcpy.pfmflist[inder].pfstamt = 0;
    this.Mypfdetailcpy.pfmflist[inder].pfmfpercent = 0;
    const control3 = (<FormGroup>(<FormArray>this.pfForm.controls['pfMFlists']).controls[inder]).controls['pfmfAmt'].patchValue(0);
    const control4 = (<FormGroup>(<FormArray>this.pfForm.controls['pfMFlists']).controls[inder]).controls['pfmfPercent'].patchValue(0);        
  });
}


 }

addNewStkRow() {
  event.preventDefault(); // ensure this button doesn't try to submit the form

    
    if(this.Mypfdetailcpy.pfstklist == null){
      this.Mypfdetailcpy.pfstklist=[];
    } 
    this.Mypfdetailcpy.pfstklist.push(JSON.parse(JSON.stringify(this.emptyPayOff)));
    

       const control = <FormArray>this.pfForm.controls['pfStocklists'];
       console.log(control);
       control.push(this.initStkItemRows(this.emptyPayOff));
}

addNewMFRow() {
  event.preventDefault(); // ensure this button doesn't try to submit the form

  if(this.Mypfdetailcpy.pfmflist == null){
    this.Mypfdetailcpy.pfmflist=[];
  } 
    this.Mypfdetailcpy.pfmflist.push(JSON.parse(JSON.stringify(this.emptymf)));
    const control = <FormArray>this.pfForm.controls['pfMFlists'];
    control.push(this.initMFItemRows(this.emptymf));
}



deleteStkRow(index: number) {
  this.Mypfdetailcpy.pfstklist.splice(index, 1);
  const control = <FormArray>this.pfForm.controls['pfStocklists'];
  control.removeAt(index);
 
}


deleteMFRow(index: number) {
  this.Mypfdetailcpy.pfmflist.splice(index, 1);
  const control = <FormArray>this.pfForm.controls['pfMFlists'];
  control.removeAt(index);
 
}



Cancelutlogic(){
  
  if (this.OnAdd==true || this.onEdit==false){
      return true;
    }
    else{
    return false;
    }
}

FormCardpopulate(){
  console.log("formcardpopulate");
  console.log(this.Mypfdetail);
  console.log(this.Mypfdetailcpy);
  this.Mypfdetailcpy=JSON.parse(JSON.stringify(this.Mypfdetail));
  console.log(this.Mypfdetailcpy);
  /*
  if(this.Mypfdetailcpy.pfstklist==null){
    console.log("is null");
  }
  if(this.Mypfdetailcpy.pfmflist==null){
    console.log("is null");
  }

  if(this.Mypfdetail.pfstkamtsplittype != null){
    this.selectedAmtSplitType = this.Mypfdetail.pfstkamtsplittype;
  }
  if(this.Mypfdetail.pfmfamtsplittype != null){
    this.selectedMFAmtSplitType = this.Mypfdetail.pfmfamtsplittype;
  }
*/

   if (this.Mypfdetailcpy != null){

    //if(this.Mypfdetailcpy.pfstklist.length>0){ 
    if(this.Mypfdetailcpy.pfstklist!=null){ 
      this.Mypfdetailcpy.pfstklist.forEach( 
        (stklstobjor) => {
          var scontrol = <FormArray>this.pfForm.controls['pfStocklists'];
          scontrol.push(this.initStkItemRows(stklstobjor));          
        }        
      );
    }
    


    if(this.Mypfdetailcpy.pfmflist!=null){ 
      this.Mypfdetailcpy.pfmflist.forEach( 
        (mflstobjor) => {
          console.log('mypfdetails cardpopulate');
          console.log(mflstobjor);
          var scontrol = <FormArray>this.pfForm.controls['pfMFlists'];
          scontrol.push(this.initMFItemRows(mflstobjor));
         
        }
      );
    }
  }
}

cancel_cardedit(i){
  event.preventDefault();
  this.onEdit=!this.onEdit; 
  /*
  var scontrol = <FormArray>this.pfForm.controls['pfStocklists'];
  scontrol.controls=[];
  var scontrol = <FormArray>this.pfForm.controls['pfMFlists'];
  scontrol.controls=[];
  
  this.FormCardpopulate();
  */
 console.log("check index");
 console.log(this.myindex);
  this.cardcancel.emit(this.myindex);
  
}

save_cardedit(pfFormfrm){
 
  //this.onEdit=!this.onEdit;
  console.log("natnat");
  console.log(pfFormfrm);
  //this.Mypfdetail=JSON.parse(JSON.stringify(this.Mypfdetailcpy));
  //this.FormCardpopulate();
  console.log(this.myindex);
  this.cardsave.emit(this.Mypfdetailcpy);

  
  //To be implemented either with service or with emitter to go back to parent
}

chtoupper(){
  console.log("inside key press");
  this.Mypfdetailcpy.pfportfolioname=this.Mypfdetailcpy.pfportfolioname.toUpperCase();
}

/*
itemSelected (evt: any) {
  console.log("nat---------########");
  console.log(evt);
  console.log("nat---------########");
  this.Mypfdetailcpy.pfmflist.forEach( 
    (mflstobjor) => {     
      console.log(mflstobjor);
      if(mflstobjor['pfmffundname'] == evt){
        var scontrol = <FormGroup>(<FormArray>this.pfForm.controls['pfMFlists']).controls[]
        scontrol.push(this.initMFItemRows(mflstobjor));
      }


     
    }


}

*/
freqSelectchange(evt: any, inx: number){
  
  console.log(evt);
  console.log(inx);
  console.log(evt.source.value);
  
  var myss= this.Mypfdetailcpy.pfmflist[inx].pfmfdathold[0].fnsipdt.filter((rec) => rec.sipfreq == evt.source.value? rec.sipfreqdates :"");
  console.log(myss[0].sipfreqdates);
  this.Mypfdetailcpy.pfmflist[inx].pfmfSipdthold=myss[0].sipfreqdates;
  this.Mypfdetailcpy.pfmflist[inx].sipminamtselect=myss[0].sipminamt;
  this.Mypfdetailcpy.pfmflist[inx].sipmaxamtselect=myss[0].sipmaxamt;
  //var array = myss[0].sipfreqdates.split(',');
  
  //console.log(array);
  
}
  /*
getdate(date){
  var td = new Date();
  td = date.toLocaleString();
  console.log("iam printing date");
  console.log(date);
  console.log(typeof(date));
  
  return date;

  const day = td.getDate();
  const month = td.getMonth() + 1;
  const year = td.getFullYear();
  
  
  console.log(`${day}/${month}/${year}`);
  return `${day}/${month}/${year}`;

  
}
*/
}