import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { OrderdbservService } from "../../../natservices/orderdbserv.service";
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-pfwiseorder',
  templateUrl: './pfwiseorder.component.html',
  styleUrls: ['./pfwiseorder.component.scss']
})
export class PfwiseorderComponent implements OnInit {
  public orForm : FormGroup;
  constructor(private myordsr: OrderdbservService, private orfb: FormBuilder) { }
  pfnamecpys:any;
  showadvanced = false;
  isallexpanded=true;
  

  ngOnInit() {
    this.fetchpfdata();
    this.addPortfolio();
    //this.test();
  }


  showadvancedf(i,j){
   var value =  (<FormGroup>(<FormArray>(<FormArray>(<FormGroup>(<FormArray>this.orForm.controls['orpflists']).controls[i]).controls['orStocklists']).controls[j]).controls['orshowhide']).value;
   console.log(value); 
   if(value =="true"){
    const control = <FormGroup>(<FormArray>(<FormArray>(<FormGroup>(<FormArray>this.orForm.controls['orpflists']).controls[i]).controls['orStocklists']).controls[j]).controls['orshowhide'].patchValue("false"); 
    console.log("inside true");  
  }else{
    const control = <FormGroup>(<FormArray>(<FormArray>(<FormGroup>(<FormArray>this.orForm.controls['orpflists']).controls[i]).controls['orStocklists']).controls[j]).controls['orshowhide'].patchValue("true");
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

somemsg(){
  console.log("success");
}

  addPortfolio(){
    this.orForm = this.orfb.group({ 
      orpflists:new FormArray([])
      });
  }

addonepf(){
  const control = <FormArray>this.orForm.controls['orpflists'];
  console.log(control);
  control.push(this.initorpflists());
}

addonestklist(index){
  const control = <FormArray>(<FormArray>this.orForm.controls['orpflists']).controls[index].get('orStocklists');
  control.push(this.initorStocklists());
}

addonemflist(index){
  const control = <FormArray>(<FormArray>this.orForm.controls['orpflists']).controls[index].get('orMFlists');
  control.push(this.initorMFlists());
}



deleteStkRow(i,j) {
  //this.Mypfdetailcpy.pfstklist.splice(index, 1);
  const control = <FormArray>(<FormArray>this.orForm.controls['orpflists']).controls[i].get('orStocklists');
  control.removeAt(j);
 
}

deleteMFRow(i,k) {
  //this.Mypfdetailcpy.pfstklist.splice(index, 1);
  const control = <FormArray>(<FormArray>this.orForm.controls['orpflists']).controls[i].get('orMFlists');
  control.removeAt(k);
 
}



 test(){
/*
  const control1 = <FormArray> (control).controls[0].get('orStocklists');
  const control2 = <FormArray> (control).controls[0].get('orMFlists');
  console.log("control1");
  console.log(control1);
  console.log("control1 end");
  control1.push(this.initorStocklists());
  control2.push(this.initorMFlists());*/
 }



  initorpflists() {
    return new FormGroup({
      orportfolio:new FormControl(null,Validators.required),
      orStocklists:new FormArray([]),
      orMFlists:new FormArray([])  
    });
  }

  initorStocklists() {
    return new FormGroup({      
      orsttransaction_type:new FormControl(null,Validators.required),
      orstexchange:new FormControl(null,Validators.required),
      orsttradingsymbol:new FormControl("ITC",Validators.required),      
      orstorder_type:new FormControl(null,Validators.required),
      orstquantity:new FormControl(null,Validators.required),
      //Additional Details
      orstproduct:new FormControl(null,Validators.required),
      orstprice:new FormControl(null,Validators.required),
      orsttrigger_price:new FormControl(null,Validators.required),
      orstdisclosed_quantity:new FormControl(null,Validators.required),
      orstvalidity:new FormControl(null,Validators.required),     
      orstreadonly:new FormControl(null,Validators.required),
      orstoploss: new FormControl(null,Validators.required),
      orsquareoff: new FormControl(null,Validators.required),
      ortrailing_stoploss: new FormControl(null,Validators.required),
      orstorderid:new FormControl(null,Validators.required),
      orshowhide:new FormControl("false")
    });
  }

  initorMFlists() {
    return new FormGroup({
      ormffundname:new FormControl(null,Validators.required),
      ormfquantity:new FormControl(null),
      ormforderamt:new FormControl(null)
    });
  }


}


//https://embed.plnkr.co/1qx5A6S9k9DM1FbXctvN/
//https://scotch.io/tutorials/how-to-implement-conditional-validation-in-angular-2-model-driven-forms