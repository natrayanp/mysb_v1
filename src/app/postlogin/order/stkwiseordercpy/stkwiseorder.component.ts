import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { OrderdbservService } from "../../../natservices/orderdbserv.service";
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-stkwiseorder',
  templateUrl: './stkwiseorder.component.html',
  styleUrls: ['./stkwiseorder.component.scss']
})
export class StkwiseorderComponent implements OnInit {
  public stkForm : FormGroup;
  constructor(private myordsr: OrderdbservService, private stkfb: FormBuilder) { }
  pfnamecpys:any;
  showadvanced = false;
  isallexpanded=true;
  exchangenames=["NSE","BSE"];
  

  ngOnInit() {
    this.fetchpfdata();
    this.addStocklist();
    //this.test();
  }

  fetchpfdata(){
    
    this.myordsr.getonlypf().subscribe(
      data =>
            {
              console.log("success fetch");
              console.log(data);            
              this.pfnamecpys =data;
              
            },
      error => 
            {  
  
              this.pfnamecpys=[];
              console.log(error);
                          
            },
      () => {
              
              console.log("Inside end of fetchpfdata observable");
            }
    );
   
  }

  addStocklist(){
    this.stkForm = this.stkfb.group({ 
      stkstklists:new FormArray([])
      });
  }

  addonestklst(){
    const control = <FormArray>this.stkForm.controls['stkstklists'];
    console.log(control);
    control.push(this.initorstklists());
  }

  initorstklists() {
    return new FormGroup({
      stktradingsymbol:new FormControl(null,Validators.required),
      stkexchange:new FormControl(null,Validators.required),
      stkmffundname:new FormControl(null,Validators.required),
      stkStocklists:new FormArray([]),
      stkMFlists:new FormArray([]),
      stkpflists:new FormArray([])
    });
  }

  
  /*


  showadvancedf(i,j){
   var value =  (<FormGroup>(<FormArray>(<FormArray>(<FormGroup>(<FormArray>this.stkForm.controls['orpflists']).controls[i]).controls['orStocklists']).controls[j]).controls['orshowhide']).value;
   console.log(value); 
   if(value =="true"){
    const control = <FormGroup>(<FormArray>(<FormArray>(<FormGroup>(<FormArray>this.stkForm.controls['orpflists']).controls[i]).controls['orStocklists']).controls[j]).controls['orshowhide'].patchValue("false"); 
    console.log("inside true");  
  }else{
    const control = <FormGroup>(<FormArray>(<FormArray>(<FormGroup>(<FormArray>this.stkForm.controls['orpflists']).controls[i]).controls['orStocklists']).controls[j]).controls['orshowhide'].patchValue("true");
    console.log("inside false");  
  }

  }

  expandall(){
    this.isallexpanded=!this.isallexpanded;
  }

  onChangeObj(newobjval){
    console.log("inside");
   console.log(newobjval);
   }



somemsg(){
  console.log("success");
}





addonestklist(index){
  const control = <FormArray>(<FormArray>this.stkForm.controls['orpflists']).controls[index].get('orStocklists');
  control.push(this.initorStocklists());
}

addonemflist(index){
  const control = <FormArray>(<FormArray>this.stkForm.controls['orpflists']).controls[index].get('orMFlists');
  control.push(this.initorMFlists());
}



deleteStkRow(i,j) {
  //this.Mypfdetailcpy.pfstklist.splice(index, 1);
  const control = <FormArray>(<FormArray>this.stkForm.controls['orpflists']).controls[i].get('orStocklists');
  control.removeAt(j);
 
}

deleteMFRow(i,k) {
  //this.Mypfdetailcpy.pfstklist.splice(index, 1);
  const control = <FormArray>(<FormArray>this.stkForm.controls['orpflists']).controls[i].get('orMFlists');
  control.removeAt(k);
 
}






  

  initorStocklists() {
    return new FormGroup({      
      stksttransaction_type:new FormControl(null,Validators.required),
      stkstexchange:new FormControl(null,Validators.required),
      stksttradingsymbol:new FormControl("ITC",Validators.required),      
      stkstorder_type:new FormControl(null,Validators.required),
      stkstquantity:new FormControl(null,Validators.required),
      //Additional Details
      stkstproduct:new FormControl(null,Validators.required),
      stkstprice:new FormControl(null,Validators.required),
      stksttrigger_price:new FormControl(null,Validators.required),
      stkstdisclosed_quantity:new FormControl(null,Validators.required),
      stkstvalidity:new FormControl(null,Validators.required),     
      stkstreadonly:new FormControl(null,Validators.required),
      stkstoploss: new FormControl(null,Validators.required),
      stksquareoff: new FormControl(null,Validators.required),
      stktrailing_stoploss: new FormControl(null,Validators.required),
      stkstorderid:new FormControl(null,Validators.required),
      stkportfolio:new FormControl(null,Validators.required),
      stkshowhide:new FormControl("false")
    });
  }

  initorMFlists() {
    return new FormGroup({
      stkmffundname:new FormControl(null,Validators.required),
      stkmfquantity:new FormControl(null),
      stkmforderamt:new FormControl(null),
      stkportfolio:new FormControl(null,Validators.required),
    });
  }
*/

}


//https://embed.plnkr.co/1qx5A6S9k9DM1FbXctvN/
//https://scotch.io/tutorials/how-to-implement-conditional-validation-in-angular-2-model-driven-forms