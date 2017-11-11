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
  @Input() myindex;
  
  Mypfdetailcpy:any;
  OnAddEdit=false;




 
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
      pfmfnav: 0,
      pfmfamt: 0,
      pfmfpercent: 0,
      pfmfallotedamt: 0
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
 console.log("this.Mypfdetail");
  console.log(this.Mypfdetail);
  console.log("this.myindex");
  console.log(this.myindex);
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

     this.pfForm.get('pfStocklists').valueChanges.subscribe(values => {
     resolvedPromise.then(() => {
        
       switch (this.pfForm.controls.pfStkAmtsplittype.value)
       {
         case "%":
         console.log("inside %");
            values.forEach((cure,inder) => {             
              console.log("this.Mypfdetailcpy.pfplannedinvamt");
              console.log(this.Mypfdetailcpy.pfplannedinvamt);
              console.log("this.Mypfdetailcpy.pfstklist[inder].pfstpercent");
              console.log(this.Mypfdetailcpy.pfstklist[inder].pfstpercent);


              this.Mypfdetailcpy.pfstklist[inder].pfstallotedamt = this.Mypfdetailcpy.pfplannedinvamt *(this.Mypfdetailcpy.pfstklist[inder].pfstpercent/100);
              this.Mypfdetailcpy.pfstklist[inder].pfstTotUnit = (Math.floor((this.Mypfdetailcpy.pfstklist[inder].pfstallotedamt/this.Mypfdetailcpy.pfstklist[inder].pfstltp))).toFixed(0);
            });
            break;

         case "Amount":
            values.forEach((cure,inder) => {
              this.Mypfdetailcpy.pfstklist[inder].pfstallotedamt = <number>this.Mypfdetailcpy.pfstklist[inder].pfstamt;
              this.Mypfdetailcpy.pfstklist[inder].pfstTotUnit = (Math.floor((this.Mypfdetailcpy.pfstklist[inder].pfstallotedamt/this.Mypfdetailcpy.pfstklist[inder].pfstltp))).toFixed(0);
            });
          break;
        default:
            values.forEach((cure,inder) => this.Mypfdetailcpy.pfstklist[inder].pfstTotUnit = 0);
            break;
        };



        this.stksummed = values.reduce((acc, cur) => acc + cur.pfstAllotedAmt, 0);
        this.summed = this.mfsummed  + this.stksummed;
        this.Mypfdetailcpy.pfsummed = this.summed;
        this.balanceleft= this.Mypfdetailcpy.pfplannedinvamt - this.Mypfdetailcpy.pfsummed ;
      
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
               
               this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = this.Mypfdetailcpy.pfplannedinvamt * (this.Mypfdetailcpy.pfmflist[inder].pfmfpercent/100);
               //this.Mypfdetailcpy.pfmflist[inder].pfstTotUnit = this.Mypfdetailcpy.pfmflist[inder].pfmfAllotedAmt/this.Mypfdetailcpy.pfstklist[inder].pfmfLtp;
             });
             break;
 
          case "Amount":
             values.forEach((cure,inder) => {
               this.Mypfdetailcpy.pfmflist[inder].pfmfallotedamt = this.Mypfdetailcpy.pfmflist[inder].pfmfamt;
               //this.Mypfdetailcpy.pfstklist[inder].pfstTotUnit = this.Mypfdetailcpy.pfstklist[inder].pfstAllotedAmt/this.Mypfdetailcpy.pfstklist[inder].pfstLtp;
             });
           break;
         };
         
         this.mfsummed = values.reduce((acc, cur) => acc + cur.pfmfAllotedAmt, 0);
         this.summed = this.mfsummed  + this.stksummed;
         this.Mypfdetailcpy.pfsummed = this.summed;
         this.balanceleft= this.Mypfdetailcpy.pfplannedinvamt - this.Mypfdetailcpy.pfsummed ;
        
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

 this.Mypfdetailcpy.pfmflist.forEach((cure,inder) => {
    this.Mypfdetailcpy.pfmflist[inder].pfstamt = 0;
    this.Mypfdetailcpy.pfmflist[inder].pfmfpercent = 0;
    const control3 = (<FormGroup>(<FormArray>this.pfForm.controls['pfMFlists']).controls[inder]).controls['pfmfAmt'].patchValue(0);
    const control4 = (<FormGroup>(<FormArray>this.pfForm.controls['pfMFlists']).controls[inder]).controls['pfmfPercent'].patchValue(0);        
  });


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

  this.Mypfdetailcpy=JSON.parse(JSON.stringify(this.Mypfdetail));
  
  if(this.Mypfdetail.pfstkamtsplittype !== null){
    this.selectedAmtSplitType = this.Mypfdetail.pfstkamtsplittype;
  }
  if(this.Mypfdetail.pfmfamtsplittype !== null){
    this.selectedMFAmtSplitType = this.Mypfdetail.pfmfamtsplittype;
  }

   if (this.Mypfdetailcpy !== null){

    if(this.Mypfdetailcpy.pfstklist!==null){ 
      this.Mypfdetailcpy.pfstklist.forEach( 
        (stklstobjor) => {
          var scontrol = <FormArray>this.pfForm.controls['pfStocklists'];
          scontrol.push(this.initStkItemRows(stklstobjor));          
        }        
      );
    }
    


    if(this.Mypfdetailcpy.pfmflist!==null){ 
      this.Mypfdetailcpy.pfmflist.forEach( 
        (mflstobjor) => {
          
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
  this.Mypfdetail=JSON.parse(JSON.stringify(this.Mypfdetailcpy));
  //this.FormCardpopulate();
  console.log(this.myindex);
  this.cardsave.emit(this.Mypfdetail);

  
  //To be implemented either with service or with emitter to go back to parent
}

chtoupper(){
  console.log("inside key press");
  this.Mypfdetailcpy.pfportfolioname=this.Mypfdetailcpy.pfportfolioname.toUpperCase();
}


}