import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Registration,bankifscdetail } from '../../../natdatamodel/natdatamodel';
import { DbservicesService } from '../../../natservices/dbservices.service';

@Component({
  selector: 'app-bsestarmfregistration',
  templateUrl: './bsestarmfregistration.component.html',
  styleUrls: ['./bsestarmfregistration.component.scss']
})
export class BsestarmfregistrationComponent implements OnInit {

  isLinear = false;
  clientdetails: FormGroup;
  clientaddress: FormGroup;
  clientbank: FormGroup;
  clientfatca: FormGroup;
  hasnominee:boolean = false;
  nristatus:boolean = false;
  occupationcodes:any;
  fatcaoccucd:any;
  states:string[];
  countrys:string[];
  fcountrys:string[];
  nominrels:string[];
  fidtypes:any;
  ifscdet:bankifscdetail;

  constructor(private fb: FormBuilder,
              private dbserivce :DbservicesService)
    {
    this.occupationcodes = Registration.OCCUPATION_CODE;
    this.fatcaoccucd = Registration.FATCA_OCCUPATION_CODE;
    this.states=Registration.STATE;
    this.countrys=Registration.COUNTRY;
    this.nominrels=Registration.NOMINEE_RELATIONSHIP;
    this.fcountrys=Registration.FATCA_COUNTRY;
    this.fidtypes=Registration.FATCA_IDTYPE;
    this.ifscdet=new(bankifscdetail);
    //https://www.rbi.org.in/scripts/neft.aspx IFSCODE to be downloaded and loaded in DB

    
    

  }

  ngOnInit() {
    
    this.createdetailfrm();
    this.createclientaddfrm();
    this.createclientbankfrm();
    this.createclientfatcafrm();

    this.clientbank.controls['clientifsc'].valueChanges.subscribe(values => {
      //this.clientbank.get('clientifsc').valueChanges.subscribe(values => {
        console.log("insider value change sub");        
        this.getbankdata(values);

      });


  }

  myname="anu";
  createdetailfrm(){
    this.clientdetails = this.fb.group({
      clientname: [{value: this.myname, disabled: true}, Validators.required],
      clientpan : [{value: this.myname, disabled: true}, Validators.required],
      clientcode: [{value: this.myname, disabled: true}, Validators.required],
      clientgender: ['', Validators.required],
      clientdob: ['', Validators.required],
      clientemail: [{value: this.myname, disabled: true}, Validators.required],
      clientmobile: [{value: this.myname, disabled: true}, Validators.required],
      clientcommode: ['', Validators.required],
      clientholding: ['SI', Validators.required], //default to single and hide from users
      clientpepflg: ['', Validators.required],
      clientisnri:[''],
      clienttaxstatusres: ['', Validators.required],
      clienttaxstatusnri: ['', Validators.required],
      clientocupation: ['', Validators.required],
      clientocutyp: ['', Validators.required],
      clienthasnominee: ['', Validators.required],
      clientnomineename: ['', Validators.required],
      clientnomineerel: ['', Validators.required],
      clientnomineedob: ['', Validators.required],
      clientnomineeaddres: ['', Validators.required],
      clientfndhldtype: ['physical', Validators.required],//default to single and hide from users
    });
  }

  createclientaddfrm(){
    this.clientaddress = this.fb.group({
      clientaddress1: ['', Validators.compose([Validators.required,Validators.maxLength(40)])],
      clientaddress2: ['', Validators.maxLength(40)],
      clientaddress3: ['', Validators.maxLength(40)],
      clientcity: ['', Validators.required],
      clientstate: ['', Validators.required],
      clientcountry: [{value: 'India', disabled: true}, Validators.required],
      clientpincode: ['', Validators.required],
      clientforinadd1: ['', Validators.compose([Validators.required,Validators.maxLength(40)])],
      clientforinadd2:['', Validators.maxLength(40)],
      clientforinadd3:['', Validators.maxLength(40)],
      clientforcity: ['', Validators.required],
      clientforstate: ['', Validators.required],
      clientforcountry:['', Validators.required],
      clientforpin: ['', Validators.required]
    });
  }

  createclientbankfrm(){    
    this.clientbank = this.fb.group({
      clientactype: ['', Validators.required],
      clientacnumb : ['', Validators.required],
      clientmicrno: ['', Validators.required],
      clientifsc: ['', {validators:Validators.required,updateOn: 'blur'}]
    });
  }

  createclientfatcafrm(){
    this.clientfatca = this.fb.group({
      clientsrcwealth: ['', Validators.required],
      clientincslb : ['', Validators.required],
      clienttaxrescntry1: ['', Validators.required],
      clienttaxid1: ['', Validators.required],
      clienttaxidtype1: ['', Validators.required],
      clienttaxrescntry2: ['', Validators.required],
      clienttaxid2: ['', Validators.required],
      clienttaxidtype2: ['', Validators.required],
      clienttaxrescntry3: ['', Validators.required],
      clienttaxid3: ['', Validators.required],
      clienttaxidtype3: ['', Validators.required],
      clienttaxrescntry4: ['', Validators.required],
      clienttaxid4: ['', Validators.required],
      clienttaxidtype4: ['', Validators.required]
    });
  }

  tooglenominee(event){
    console.log(event);
    this.hasnominee=event.checked;
  }

  tooglenri(event){
    console.log(event);
    this.nristatus=event.checked;
  }


  
    


  getbankdata(event){
    //this.ifscdet=null;
    this.ifscdet=new(bankifscdetail);
    console.log("insdier getbankdata");
    if (this.clientbank.controls['clientifsc'].valid){
      this.dbserivce.dbaction('IFSC','fetch',{"ifsc":this.clientbank.controls['clientifsc'].value}).subscribe(
        data =>{
                  console.log("data is taken");
                  console.log(data);
                  this.ifscdet=<bankifscdetail>data['body'];
                  console.log(JSON.stringify(this.ifscdet));

                },    
        error =>{
          console.log("insdie error");
          console.log(error);
                  if (error.hasOwnProperty('error')){
                    if(error.error.hasOwnProperty('natstatus')){
                      console.log("insdie natstatus of error");
                      this.ifscdet.errormsg="Tech error"+error['error'].statusText+error['error'].statusText;
                      this.ifscdet.failed=true;

                    }else{
                      console.log("no not status");
                      this.ifscdet.errormsg=error['statusText'];
                      this.ifscdet.failed=true;
                      console.log(JSON.stringify(this.ifscdet));
                    }
                  }else{
                    console.log("insdie else of error");
                    this.ifscdet.errormsg=error['error'].statusText;
                    this.ifscdet.failed=true;
                    //this.notify.update('Error!!!'+ error.statusText, 'error');
                  }
                  
                }
      )};
  }


}
