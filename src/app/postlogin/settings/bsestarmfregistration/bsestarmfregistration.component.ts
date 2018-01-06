import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Registration,bankifscdetail,regisuccfatcadetail } from '../../../natdatamodel/natdatamodel';
import { DbservicesService } from '../../../natservices/dbservices.service';
import { FileuploadService } from '../../../natservices/fileupload.service';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';

@Component({
  selector: 'app-bsestarmfregistration',
  templateUrl: './bsestarmfregistration.component.html',
  styleUrls: ['./bsestarmfregistration.component.scss']
})
export class BsestarmfregistrationComponent implements OnInit {
  
  regdet:regisuccfatcadetail = new(regisuccfatcadetail);
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
  fileName:string= "Select a File";
  filelist: FileList;
  file:File;
  showprogressbar:boolean=false;
  percentDone:number;
  filevalerror=true;
  filvaldiationmsg: string = "";
  incslbs: any;
  srcwlths:any;
  

  constructor(private fb: FormBuilder,
              private dbserivce :DbservicesService,
              private ups:FileuploadService)
    {
    this.getregistrationdetails();
    this.occupationcodes = Registration.OCCUPATION_CODE;
    this.fatcaoccucd = Registration.FATCA_OCCUPATION_CODE;
    this.states=Registration.STATE;
    this.countrys=Registration.COUNTRY;
    this.nominrels=Registration.NOMINEE_RELATIONSHIP;
    this.incslbs = Registration.FATCA_INCOME_SLAB;
    this.srcwlths = Registration.FATCA_SOURCE_OF_WEALTH;
    //this.fcountrys=Registration.FATCA_COUNTRY;
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

  
  createdetailfrm(){
    this.clientdetails = this.fb.group({
      clientname: [this.regdet.clientname, Validators.required],
      clientpan : ['', Validators.required],
      clientcode: ['', Validators.required],
      clientgender: ['', Validators.required],
      clientdob: ['', Validators.required],
      clientemail: ['', Validators.required],
      clientmobile: ['', Validators.required],
      clientcommode: [''],
      clientholding: ['SI'], //default to single and hide from users
      clientpepflg: [''],
      clientisnri:[''],
      clienttaxstatusres: [true],
      clienttaxstatusnri: [''],
      clientocupation: ['', Validators.required],
      clientocutyp: [''],
      clienthasnominee: [false],
      clientnomineename: [''],
      clientnomineerel: [''],
      clientnomineedob: [''],
      clientnomineeaddres: ['',Validators.maxLength(40)],
      clientfndhldtype: ['physical'],//default to single and hide from users
    });
  }

  createclientaddfrm(){
    this.clientaddress = this.fb.group({
      clientaddress1: ['', Validators.compose([Validators.required,Validators.maxLength(40)])],
      clientaddress2: ['', Validators.maxLength(40)],
      clientaddress3: ['', Validators.maxLength(40)],
      clientcity: ['', Validators.required],
      clientstate: ['', Validators.required],
      clientcountry: [{value: 'India'}, Validators.required],
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
      clientpobir: ['', Validators.required],
      clientcobir: ['', Validators.required],
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
    this.clientdetails.controls['clienttaxstatusres'].setValue (!this.nristatus);
    this.clientdetails.controls['clienttaxstatusnri'].setValue ('');
  }

  getregistrationdetails(){
     console.log("insdier getregistrationdetails");
    this.dbserivce.dbaction('regist','fetch','').subscribe(
      data =>{
                  console.log("data is taken");
                  console.log(data);
                  this.regdet=<regisuccfatcadetail>data['body'];
                  this.assignvalue();
              },
     error => {
                  console.log(error);
                }
              );  
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

  assignvalue(){
    console.log("inside assignvalue");
    console.log(this.regdet.clientname);
    this.clientdetails.controls.clientname.setValue(this.regdet.clientname);
  this.clientdetails.controls.clientpan.setValue(this.regdet.clientpan);
  this.clientdetails.controls.clientcode.setValue(this.regdet.clientcode);
  this.clientdetails.controls.clientgender.setValue(this.regdet.clientgender);
  this.clientdetails.controls.clientdob.setValue(this.regdet.clientdob);
  this.clientdetails.controls.clientemail.setValue(this.regdet.clientemail);
  this.clientdetails.controls.clientmobile.setValue(this.regdet.clientmobile);
  this.clientdetails.controls.clientcommode.setValue(this.regdet.clientcommode);
  this.clientdetails.controls.clientholding.setValue(this.regdet.clientholding);
  this.clientdetails.controls.clientpepflg.setValue(this.regdet.clientpepflg);
  this.clientdetails.controls.clientisnri.setValue(this.regdet.clientisnri);
  this.clientdetails.controls.clienttaxstatusres.setValue(this.regdet.clienttaxstatusres);
  this.clientdetails.controls.clienttaxstatusnri.setValue(this.regdet.clienttaxstatusnri);
  this.clientdetails.controls.clientocupation.setValue(this.regdet.clientocupation);
  this.clientdetails.controls.clientocutyp.setValue(this.regdet.clientocutyp);
  this.clientdetails.controls.clienthasnominee.setValue(this.regdet.clienthasnominee);
  this.clientdetails.controls.clientnomineename.setValue(this.regdet.clientnomineename);
  this.clientdetails.controls.clientnomineerel.setValue(this.regdet.clientnomineerel);
  this.clientdetails.controls.clientnomineedob.setValue(this.regdet.clientnomineedob);
  this.clientdetails.controls.clientnomineeaddres.setValue(this.regdet.clientnomineeaddres);
  this.clientdetails.controls.clientfndhldtype.setValue(this.regdet.clientfndhldtype);
  
  this.clientaddress.controls.clientaddress1.setValue(this.regdet.clientaddress1);
  this.clientaddress.controls.clientaddress2.setValue(this.regdet.clientaddress2);
  this.clientaddress.controls.clientaddress3.setValue(this.regdet.clientaddress3);
  this.clientaddress.controls.clientcity.setValue(this.regdet.clientcity);
  this.clientaddress.controls.clientstate.setValue(this.regdet.clientstate);
  this.clientaddress.controls.clientcountry.setValue(this.regdet.clientcountry);
  this.clientaddress.controls.clientpincode.setValue(this.regdet.clientpincode);
  this.clientaddress.controls.clientforinadd1.setValue(this.regdet.clientforinadd1);
  this.clientaddress.controls.clientforinadd2.setValue(this.regdet.clientforinadd2);
  this.clientaddress.controls.clientforinadd3.setValue(this.regdet.clientforinadd3);
  this.clientaddress.controls.clientforcity.setValue(this.regdet.clientforcity);
  this.clientaddress.controls.clientforstate.setValue(this.regdet.clientforstate);
  this.clientaddress.controls.clientforcountry.setValue(this.regdet.clientforcountry);
  this.clientaddress.controls.clientforpin.setValue(this.regdet.clientforpin);
  
  this.clientbank.controls.clientactype.setValue(this.regdet.clientactype);
  this.clientbank.controls.clientacnumb.setValue(this.regdet.clientacnumb);
  this.clientbank.controls.clientmicrno.setValue(this.regdet.clientmicrno);
  this.clientbank.controls.clientifsc.setValue(this.regdet.clientifsc);
  
  this.clientfatca.controls.clientsrcwealth.setValue(this.regdet.clientsrcwealth);
  this.clientfatca.controls.clientincslb.setValue(this.regdet.clientincslb);
  this.clientfatca.controls.clientpobir.setValue(this.regdet.clientpobir);
  this.clientfatca.controls.clientcobir.setValue(this.regdet.clientcobir);
  this.clientfatca.controls.clienttaxrescntry1.setValue(this.regdet.clienttaxrescntry1);
  this.clientfatca.controls.clienttaxid1.setValue(this.regdet.clienttaxid1);
  this.clientfatca.controls.clienttaxidtype1.setValue(this.regdet.clienttaxidtype1);
  this.clientfatca.controls.clienttaxrescntry2.setValue(this.regdet.clienttaxrescntry2);
  this.clientfatca.controls.clienttaxid2.setValue(this.regdet.clienttaxid2);
  this.clientfatca.controls.clienttaxidtype2.setValue(this.regdet.clienttaxidtype2);
  this.clientfatca.controls.clienttaxrescntry3.setValue(this.regdet.clienttaxrescntry3);
  this.clientfatca.controls.clienttaxid3.setValue(this.regdet.clienttaxid3);
  this.clientfatca.controls.clienttaxidtype3.setValue(this.regdet.clienttaxidtype3);
  this.clientfatca.controls.clienttaxrescntry4.setValue(this.regdet.clienttaxrescntry4);
  this.clientfatca.controls.clienttaxid4.setValue(this.regdet.clienttaxid4);
  this.clientfatca.controls.clienttaxidtype4.setValue(this.regdet.clienttaxidtype4);
  
  
  }

  onFileInput(event){
    this.filelist=event.target.files;
    this.file= this.filelist[0];
     this.fileName= this.file.name;
     this.selectFile(event);
   }

   selectFile(event) {
     console.log(this.filevalerror);
    //this.uploadFile(event.target.files);
    console.log("insdie selectfile");
    console.log(event.target.files);
    this.filelist=event.target.files;

     if (this.filelist.length == 0) {
      this.filevalerror=true;
      this.filvaldiationmsg="No file selected!";
      console.log("No file selected!");
      }else{
        this.file=this.filelist[0];
          if(this.file.type != 'application/tiff'){
            this.filevalerror=true;
            this.filvaldiationmsg="Only TIFF files are allowed";
              console.log("Only TIFF files are allowed");
          }else if(this.file.size > 1000000){
              this.filevalerror=true;
              this.filvaldiationmsg="File size more than 1 MB not allowed";
                console.log("File size more than 1 MB not allowed")
          }else{
            this.filevalerror=false;
          }
      }

    this.filelist=null;

    console.log(this.file.name);
    console.log(this.file.size);
    console.log(this.file.type);
    console.log('---------');
    console.log(this.filevalerror);
    console.log(this.filvaldiationmsg)
    console.log('---------');
 }
      
  

 uploadFile() {  
    this.showprogressbar=true;
    console.log(this.file);
    this.ups.uploadFile('https://file.io/2ojE41', this.file)
      .subscribe(
        event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${this.percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
            this.showprogressbar=false;

          }
        },
        (err) => {
          console.log("Upload Error:", err);
        }, () => {
          console.log("Upload done");
        }
      )
  }

  myfunc(){
    console.log("natrayan myfunc");
  }




  saveformdata(){
    console.log("insdier save registration form");
    this.dbserivce.dbaction('registfrm','detailsave',JSON.stringify(this.regdet)).subscribe(
      data =>{
                  console.log("data is updated successfully");
                  console.log(data);
                  //this.regdet=<regisuccfatcadetail>data['body'];
                  //this.assignvalue();
              },
     error => {
                  console.log(error);
                }
              );  

/*
    this.dbserivce.dbaction('registfrm','addsave',this.clientaddress.value).subscribe(
      data =>{
                  console.log("data is taken");
                  console.log(data);
                  this.regdet=<regisuccfatcadetail>data['body'];
                  this.assignvalue();
              },
      error => {
                  console.log(error);
                }
              );  

    this.dbserivce.dbaction('registfrm','banksave',this.clientbank.value).subscribe(
      data =>{
                  console.log("data is taken");
                  console.log(data);
                  this.regdet=<regisuccfatcadetail>data['body'];
                  this.assignvalue();
              },
      error => {
                  console.log(error);
                }
              );  
  
  this.dbserivce.dbaction('registfrm','fatcasave',this.clientfatca.value).subscribe(
    data =>{
                console.log("data is taken");
                console.log(data);
                this.regdet=<regisuccfatcadetail>data['body'];
                this.assignvalue();
            },
    error => {
                console.log(error);
              }
            );  
*/

            }

}
