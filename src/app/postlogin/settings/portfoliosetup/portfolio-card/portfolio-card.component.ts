import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {Router} from "@angular/router";

const resolvedPromise = Promise.resolve(null);

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit 
{
  onEdit=false;
  public pfForm : FormGroup;
  
  summed: number;
  balanceleft:number = 0;
  mfsummed:number;
  stksummed:number;
  today = new Date();
  @Input() Mypfdetail;
  @Input() OnAdd;
  
  Mypfdetailcpy:any;
  OnAddEdit=false;




 
 emptyPayOff = {
      pfstExchange: "",
      pfstTradingsymbl: "",
      pfstLtp: 0,
      pfstAmt: 0,
      pfstPercent: 0,
      pfstAllotedAmt: 0,
      pfstTotUnit: 0
    };


    emptymf= {
      pfmfFundname: "",
      pfmfNAV: 0,
      pfmfAmt: 0,
      pfmfPercent: 0,
      pfmfAllotedAmt: 0
    };
 
  freqs = ['Daily','Weekly','Fortnightly','Monthly','Quaterly','Halfyearly','Yearly','Adhoc'];
  userSchedules=[{"title":"natrayans Portfolio","description":"for my savings","location":"9.5%","timeStart":this.today,"timeEnd":this.today}];
  AmtSplitTypes=['%','Amount'];
  selectedAmtSplitType = this.AmtSplitTypes[0];
  selectedMFAmtSplitType = this.AmtSplitTypes[0];
  @Output() cardcancel: EventEmitter<any> = new EventEmitter();
  @Output() cardsave: EventEmitter<any> = new EventEmitter();

  
  
//, private ref: ChangeDetectorRef
  constructor(private pffb: FormBuilder,private router: Router) { 
     

}

  ngOnInit() {


  /*this has to come from master component either as blank or set of value
       this.Mypfdetail = {  
  pfPortfolioid:null,
  pfuserid:null,
  pfPortfolioname: null,
  pfPurpose: null,
  pfBeneUsers: null,
  pfStartDt: null,
  pfTargetDt: null,
  pfTargetIntRate: null,
  pfPlannedInvAmt: null,
  pfStkAmtsplittype: null,
  pfmfAmtsplittype:null,
  pfSummed:null,
  pfStocklists: [
    {
      pfstExchange: "",
      pfstTradingsymbl: "",
      pfstLtp: "",
      pfstAmt: 0,
      pfstPercent: 0,
      pfstAllotedAmt: 0,
      pfstTotUnit: 0
    }
  ]
}
 // this has to come from master component*/

 //Empty
    if (this.Mypfdetail == null || this.Mypfdetail.pfPortfolioname == null )
    {
      this.onEdit=true;
    }
    if(this.Mypfdetail.pfStkAmtsplittype !== null){
      this.selectedAmtSplitType = this.Mypfdetail.pfStkAmtsplittype;
    }
    if(this.Mypfdetail.pfmfAmtsplittype !== null){
      this.selectedMFAmtSplitType = this.Mypfdetail.pfmfAmtsplittype;
    }
    

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
      /*this.pffb.array([
        this.initStkItemRows()])*/
      
      });

    
    this.FormCardpopulate();

    /* replacing the below with populatevalues() function

    this.Mypfdetailcpy=JSON.parse(JSON.stringify(this.Mypfdetail));
      
    
    if (this.Mypfdetailcpy !== null){
    this.Mypfdetailcpy.pfStocklists.forEach( 
      (stklstobjor) => {
        //this.pfForm.controls.pfStocklists.push(this.initStkItemRows(po);
        var scontrol = <FormArray>this.pfForm.controls['pfStocklists'];
        scontrol.push(this.initStkItemRows(stklstobjor));
       
      }
      
    );

    this.Mypfdetailcpy.pfMFlists.forEach( 
      (mflstobjor) => {
        //this.pfForm.controls.pfStocklists.push(this.initStkItemRows(po);
        var scontrol = <FormArray>this.pfForm.controls['pfMFlists'];
        scontrol.push(this.initMFItemRows(mflstobjor));
       
      }
    );
  }*/
  console.log("check mypfdetailscopy");
  console.log(JSON.stringify(this.Mypfdetailcpy));

      this.pfForm.get('pfStocklists').valueChanges.subscribe(values => {
     resolvedPromise.then(() => {
        
       switch (this.pfForm.controls.pfStkAmtsplittype.value)
       {
         case "%":
            values.forEach((cure,inder) => {             
              
              this.Mypfdetailcpy.pfStocklists[inder].pfstAllotedAmt = this.Mypfdetailcpy.pfPlannedInvAmt *(this.Mypfdetailcpy.pfStocklists[inder].pfstPercent/100);
              this.Mypfdetailcpy.pfStocklists[inder].pfstTotUnit = (Math.floor((this.Mypfdetailcpy.pfStocklists[inder].pfstAllotedAmt/this.Mypfdetailcpy.pfStocklists[inder].pfstLtp))).toFixed(0);
            });
            break;

         case "Amount":
            values.forEach((cure,inder) => {
              this.Mypfdetailcpy.pfStocklists[inder].pfstAllotedAmt = <number>this.Mypfdetailcpy.pfStocklists[inder].pfstAmt;
              this.Mypfdetailcpy.pfStocklists[inder].pfstTotUnit = (Math.floor((this.Mypfdetailcpy.pfStocklists[inder].pfstAllotedAmt/this.Mypfdetailcpy.pfStocklists[inder].pfstLtp))).toFixed(0);
            });
          break;
        default:
            values.forEach((cure,inder) => this.Mypfdetailcpy.pfStocklists[inder].pfstTotUnit = 0);
            break;
        };



        this.stksummed = values.reduce((acc, cur) => acc + cur.pfstAllotedAmt, 0);
        this.summed = this.mfsummed  + this.stksummed;
        this.Mypfdetailcpy.pfSummed = this.summed;
        this.balanceleft= this.Mypfdetailcpy.pfPlannedInvAmt - this.Mypfdetailcpy.pfSummed ;
      
      });
      //this.summed = values.reduce((acc, cur) => acc + cur.pfstTotUnit, 0);
    })


    this.pfForm.get('pfMFlists').valueChanges.subscribe(values => {
      resolvedPromise.then(() => {
         console.log("resolve");
         console.log(this.pfForm.controls.pfmfAmtsplittype.value);
         
        switch (this.pfForm.controls.pfmfAmtsplittype.value)
        {
          case "%":
             values.forEach((cure,inder) => {             
               
               this.Mypfdetailcpy.pfMFlists[inder].pfmfAllotedAmt = this.Mypfdetailcpy.pfPlannedInvAmt * (this.Mypfdetailcpy.pfMFlists[inder].pfmfPercent/100);
               //this.Mypfdetailcpy.pfMFlists[inder].pfstTotUnit = this.Mypfdetailcpy.pfMFlists[inder].pfmfAllotedAmt/this.Mypfdetailcpy.pfStocklists[inder].pfmfLtp;
             });
             break;
 
          case "Amount":
             values.forEach((cure,inder) => {
               this.Mypfdetailcpy.pfMFlists[inder].pfmfAllotedAmt = this.Mypfdetailcpy.pfMFlists[inder].pfmfAmt;
               //this.Mypfdetailcpy.pfStocklists[inder].pfstTotUnit = this.Mypfdetailcpy.pfStocklists[inder].pfstAllotedAmt/this.Mypfdetailcpy.pfStocklists[inder].pfstLtp;
             });
           break;
         };
         
         this.mfsummed = values.reduce((acc, cur) => acc + cur.pfmfAllotedAmt, 0);
         this.summed = this.mfsummed  + this.stksummed;
         this.Mypfdetailcpy.pfSummed = this.summed;

         this.balanceleft= this.Mypfdetailcpy.pfPlannedInvAmt - this.Mypfdetailcpy.pfSummed ;
        
       });
      
    
       //this.summed = values.reduce((acc, cur) => acc + cur.pfstTotUnit, 0);
     })


    console.log("natnann");
    console.log(this.pfForm.controls.pfMFlists);

    this.Cancelutlogic();

/*


   //http://plnkr.co/edit/7jJJhkcgqk4YdjFOXTGF?p=preview  --> for form group array
    //plnkr.co/edit/Q5HYcpnPQosSYvk2KkoP?p=preview
      this.StocklistForm = this.Stocklistfb.group({
        itemRows: this.Stocklistfb.array([this.initStkItemRows()])
      }); */
  }

  UserEdit(event){
    this.onEdit=!this.onEdit;
  }


  initMFItemRows(MFObj) {
    return new FormGroup({
        pfmfFundname : new FormControl(MFObj.pfstExchange),
        pfmfNAV: new FormControl(MFObj.pfstLtp),
        pfmfAmt: new FormControl(MFObj.pfstAmt),
        pfmfPercent: new FormControl(MFObj.pfstPercent),
        pfmfAllotedAmt:new FormControl(MFObj.pfstAllotedAmt),        
    });
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

 
AmtSplitchange(newobjval){
 this.Mypfdetailcpy.pfStkAmtsplittype = this.selectedAmtSplitType;
 this.Mypfdetailcpy.pfStocklists.forEach((cure,inder) => {

  this.Mypfdetailcpy.pfStocklists[inder].pfstAmt = 0;
  this.Mypfdetailcpy.pfStocklists[inder].pfstPercent = 0;
  const control3 = (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstAmt'].patchValue(0);   
  const control4 = (<FormGroup>(<FormArray>this.pfForm.controls['pfStocklists']).controls[inder]).controls['pfstPercent'].patchValue(0);     

});

}

MFAmtSplitchange(newobjval){
  this.Mypfdetailcpy.pfmfAmtsplittype = this.selectedMFAmtSplitType;

 this.Mypfdetailcpy.pfMFlists.forEach((cure,inder) => {
    this.Mypfdetailcpy.pfMFlists[inder].pfstAmt = 0;
    this.Mypfdetailcpy.pfMFlists[inder].pfstPercent = 0;
    const control3 = (<FormGroup>(<FormArray>this.pfForm.controls['pfMFlists']).controls[inder]).controls['pfmfAmt'].patchValue(0);
    const control4 = (<FormGroup>(<FormArray>this.pfForm.controls['pfMFlists']).controls[inder]).controls['pfmfPercent'].patchValue(0);        
  });


 }

addNewStkRow() {
  event.preventDefault(); // ensure this button doesn't try to submit the form


    this.Mypfdetailcpy.pfStocklists.push(JSON.parse(JSON.stringify(this.emptyPayOff)));
    //this.pfForm.controls.payOffs.push(this.createPayOffFormGroup(emptyPayOff)); 

       const control = <FormArray>this.pfForm.controls['pfStocklists'];
       console.log(control);
       control.push(this.initStkItemRows(this.emptyPayOff));
}

addNewMFRow() {
  event.preventDefault(); // ensure this button doesn't try to submit the form


    this.Mypfdetailcpy.pfMFlists.push(JSON.parse(JSON.stringify(this.emptymf)));
    //this.pfForm.controls.payOffs.push(this.createPayOffFormGroup(emptyPayOff)); 

       const control = <FormArray>this.pfForm.controls['pfMFlists'];
       console.log(control);
       control.push(this.initMFItemRows(this.emptymf));
}



deleteStkRow(index: number) {
  this.Mypfdetailcpy.pfStocklists.splice(index, 1);
  const control = <FormArray>this.pfForm.controls['pfStocklists'];
  control.removeAt(index);
 
}


deleteMFRow(index: number) {
  this.Mypfdetailcpy.pfMFlists.splice(index, 1);
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

  this.Mypfdetailcpy=JSON.parse(JSON.stringify(this.Mypfdetail));
  
  if(this.Mypfdetail.pfStkAmtsplittype !== null){
    this.selectedAmtSplitType = this.Mypfdetail.pfStkAmtsplittype;
  }
  if(this.Mypfdetail.pfmfAmtsplittype !== null){
    this.selectedMFAmtSplitType = this.Mypfdetail.pfmfAmtsplittype;
  }

   if (this.Mypfdetailcpy !== null){

      this.Mypfdetailcpy.pfStocklists.forEach( 
        (stklstobjor) => {
          var scontrol = <FormArray>this.pfForm.controls['pfStocklists'];
          scontrol.push(this.initStkItemRows(stklstobjor));          
        }        
      );
  
      this.Mypfdetailcpy.pfMFlists.forEach( 
        (mflstobjor) => {
          
          var scontrol = <FormArray>this.pfForm.controls['pfMFlists'];
          scontrol.push(this.initMFItemRows(mflstobjor));
         
        }
      );
    }
}

cancel_cardedit(i){

  this.onEdit=!this.onEdit; 
  var scontrol = <FormArray>this.pfForm.controls['pfStocklists'];
  scontrol.controls=[];
  var scontrol = <FormArray>this.pfForm.controls['pfMFlists'];
  scontrol.controls=[];
   
  this.FormCardpopulate();

  this.cardcancel.emit(i);

}

save_cardedit(pfFormfrm){
  this.onEdit=!this.onEdit;
  console.log("natnat");
  console.log(pfFormfrm);
  this.cardsave.emit(pfFormfrm);
  
  //To be implemented either with service or with emitter to go back to parent
}

}