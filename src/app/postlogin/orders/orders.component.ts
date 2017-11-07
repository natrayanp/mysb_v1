import { Component, OnInit, Renderer2, ElementRef, ViewChild, Directive, AnimationPlayer} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders,HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';

import {PfqtypopupComponent} from './pfqtypopup/pfqtypopup.component';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public rForm : FormGroup;
  sForm: FormGroup;
  ordertypes : string[]= ['MKT','LMT','SL','SL-M'];
  products: string[]=['CNC','MS'];
  ordervalidities: string[]=['DAY','IOC'];  
  trantypes : string[]=['BUY','SELL'];
  portfolios: string[]=['Natrayans','Nirudhis','Ananthis','Nidha','Jayakodi','Palaniappan','Arun'];
  selectedpfs:string[] =[];
  //selectedpfs1:string[] =[];
  qtypopuvals=[{pf:null ,qty:0}];
  selectedpfscpy:string[];
  rform : any;
  myjsoncpy: any;
  myjsontosubmit=[];
  myjsonpf : any[];  
  myjsonporttran =[{portfolio:null ,data: []}];
  myjsontran=[{portfolio:null ,data:{},pfpopval:{}}];
  matchindxo:number;
  gorderid=1;


  api_key :string = 'uptxfbd1y845rxva';
  //values:string='[{"tradingsymbol": "INFY","exchange": "NSE","transaction_type": "BUY","order_type": "MARKET","quantity": 10,"readonly": "true"}]';
  values=this.myjsontosubmit;
  //values1 = JSON.parse(this.values);
  values3 :string;
  dialogRef: MatDialogRef<any>;

  constructor(private fb: FormBuilder, private renderer: Renderer2, public dialog: MatDialog, public snackBar: MatSnackBar) {

    
    this.rForm = fb.group({
      
      'portfolio':[null,Validators.required],
      'tradingsymbol':[null,Validators.required],
      'exchange':[null,Validators.required],
      'transaction_type':[null,Validators.required],
      'order_type':[null,Validators.required],
      'quantity':[null,Validators.required],
      'product':[null,Validators.required],
      'price':[null,Validators.required],
      'trigger_price':[null,Validators.required],
      'disclosed_quantity':[null,Validators.required],
      'validity':[null,Validators.required],      
      'readonly':[true,Validators.required],
      'orderid':[null,Validators.required]
       });

   }

   ngOnInit() {
  }

   //@ViewChild('someInput') someInput: ElementRef;
   @ViewChild('natbutton') natbutton: ElementRef;
   //@ViewChild('anabutton') anabutton: ElementRef;
   @ViewChild('myform') myform: ElementRef;
 
   natrayan() {
     //this.someInput.nativeElement.value = "Anchovies!";
     //this.renderer.setAttribute(this.someInput.nativeElement,"value","Anchovies!");
     //this.renderer.setProperty(this.myform.nativeElement,"submit",true);
     this.myform.nativeElement.submit();
   }

   pfselected(){
    return this.selectedpfs.length?true:false;
    
   }
   
   //On click of quantity, check if we have portfolio wise data, else send qty as zero for selectedpfs.  
   //Else send portfolio wise data which will have portfolio name and qty.
   
   onChangeObj(newobjval){
    this.resetpopupqtyval();
   }
   
   removechip(closechipval: string): void {
    this.selectedpfscpy = this.selectedpfs;
    let index = this.selectedpfs.indexOf(closechipval);
  
    if (index >= 0) {
      this.selectedpfscpy.splice(index, 1);
      this.selectedpfs=this.selectedpfscpy.slice(0);
      
    }
    this.resetpopupqtyval();
  }
  
  /* This is called whenever PF drop down selection is done and chip is closed*/
  resetpopupqtyval(){
    this.qtypopuvals=[{pf:null ,qty:0}];
    this.rForm.patchValue({'quantity': 0});
  }


  addStocklist(rform){
    
    this.myjsoncpy = null;
    this.myjsoncpy=rform;
    this.myjsoncpy.orderid=this.gorderid;

    console.log(JSON.stringify(rform));
        
    //no of portfolio for order is taken from popup output which has PF name and its qty
    this.myjsonpf = this.qtypopuvals.slice();
    this.values3=this.myjsoncpy.portfolio.slice();
    delete this.myjsoncpy.portfolio;    
  
    this.addstockwise();
    this.addportwise();
    this.addtosubmit();

    console.log("Stock wise : "+JSON.stringify(this.myjsontran));
    console.log("Portfolio wise : "+JSON.stringify(this.myjsonporttran));
    console.log("to submit : "+JSON.stringify(this.myjsontosubmit));


  this.rForm.reset();
  this.gorderid = this.gorderid+1;

  
  }

addstockwise(){

//Code for stock wise START

    /* Code to be implemented to make sure same stocks get combined and not added as separate item in the array*/
    
    /*Stock wise Example:myjsontran = [{"portfolio":["Natrayans","Ananthis"],"data":{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":35,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":false,"orderid":1},"pfpopval":[{"pf":"Natrayans","qty":15},{"pf":"Ananthis","qty":20}]},{"portfolio":["Natrayans","Nirudhis","Ananthis","Nidha"],"data":{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":61,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2},"pfpopval":[{"pf":"Natrayans","qty":18},{"pf":"Nirudhis","qty":16},{"pf":"Ananthis","qty":15},{"pf":"Nidha","qty":12}]}]*/

    //Logic to handle id to be added
    
    if(this.myjsontran.length == 0){
      this.myjsontran=[{portfolio:null ,data:{},pfpopval:{}}];
    }



    if(this.myjsontran[0].portfolio==null){
      //this.myjsontran[0].data[0].portfolio=JSON.parse(JSON.stringify(this.myjsonpf));
      
       
      this.myjsontran[0].portfolio=this.values3.slice();
      this.myjsontran[0].data=JSON.parse(JSON.stringify(this.myjsoncpy));
      this.myjsontran[0].pfpopval=JSON.parse(JSON.stringify(this.myjsonpf));
      //this.myjsontran[0].data['dispf'] = this.values3.slice(); 
      
      

    }else{
    //  console.log("inside else");
    this.myjsontran[this.myjsontran.length]={portfolio:null ,data: [],pfpopval:{}};
    this.myjsontran[this.myjsontran.length-1].portfolio=this.values3.slice();
    this.myjsontran[this.myjsontran.length-1].data=JSON.parse(JSON.stringify(this.myjsoncpy));
    this.myjsontran[this.myjsontran.length-1].pfpopval=JSON.parse(JSON.stringify(this.myjsonpf));
    //this.myjsontran[this.myjsontran.length-1].data['dispf']=this.values3.slice();   
      
      
    }
    console.log(JSON.stringify(this.myjsontran));
  }

  addportwise(){
  /*Code for stock wise ENDS*/
 
          
    //Code for portfolio wise START
    //portfolio wise Example : myjsonporttran = [{"portfolio":"Natrayans","data":[{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":15,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":false,"orderid":1},{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":18,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2}]},{"portfolio":"Ananthis","data":[{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":20,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":false,"orderid":1},{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":15,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2}]},{"portfolio":"Nirudhis","data":[{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":16,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2}]},{"portfolio":"Nidha","data":[{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":12,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2}]}]
       
    if(this.myjsonporttran.length == 0){
      this.myjsonporttran =[{portfolio:null ,data: []}];
    }
    
      var i=0;  
        var index=0;
  
          for(i=0;this.myjsonpf.length>i;i+=1){
            index = this.myjsonporttran.length-1;

           
              if(this.myjsonporttran[index].portfolio==null){
                
                
                pfmatchindex = -1;                                
              }            
            else{
                var pfmatchindex=this.hastag(this.myjsonpf[i].pf);
                console.log(pfmatchindex);
                if(pfmatchindex==-1){
                  index=index+1;
                  this.myjsonporttran[index]={portfolio:null ,data: []};
                }else{
                  index=pfmatchindex;
                }
              }
              console.log("INSIDE IF"+i);
              console.log("INSIDE IF"+index);

            //Insert portfolio name if it doesn't exists START
            if(pfmatchindex==-1 ){
              this.myjsonporttran[index].portfolio=this.myjsonpf[i].pf;
            }
            //Insert portfolio name if it doesn't exists END

            //Insert data START
            if(pfmatchindex>=0){               
              var dataindex=this.myjsonporttran[pfmatchindex].data.length;        
              this.myjsonporttran[index].data[dataindex]=JSON.parse(JSON.stringify(this.myjsoncpy));
              this.myjsonporttran[index].data[dataindex].quantity=this.myjsonpf[i].qty;      
            }else{
              //this is when it is first time or not match
              this.myjsonporttran[index].data[0]=JSON.parse(JSON.stringify(this.myjsoncpy));
              this.myjsonporttran[index].data[0].quantity=this.myjsonpf[i].qty;      
            }        
            //Insert data END
            
          }

        console.log(JSON.stringify(this.myjsonporttran));
        }
        //Code for portfolio wise END  */ 
        
        addtosubmit(){
  
    //code for JSON to submit START
    // to submit : myjsontosubmit = [{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":35,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":false,"orderid":1},{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":61,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2}]
    
      this.myjsontosubmit.push(this.myjsoncpy);
      
    //code for JSON to submit END
        }



//Function to identify if data exists in array START
hastag(tagname : string){
    var k =0;
    for (k=0;this.myjsonporttran.length>k;k+=1){
      if(this.myjsonporttran[k].portfolio==tagname){
          return k;
      }
    }
    return -1;
};
//Function to identify if data exists in array END


getpf(ids){
  var sdx="natrayan,ananthi";
  return sdx;
}

/* hasmatch(tradsym : string){
  var l =null;
  var matchindx:number;
  matchindx=-1;
  for (l=0;this.myjsontran.length>l;l+=1){
    if(this.myjsontran[l].tradingsymbol==tradsym){
      matchindx=l;
    }
  }
//loop through all the elements and see if they match
  var result = Object.keys(this.myjsoncpy);
  if (matchindx > -1){
  for(l=0;result.length>l;l+=1){
    if(this.myjsontran[matchindx][result[l]]!=this.myjsoncpy[result[l]])
    {
      matchindx=-1;
      return matchindx;
    }
  }
  return matchindx;
} 

 };*/





configmd: MatDialogConfig = {
  disableClose: true,
  hasBackdrop: true,
  backdropClass: '',
  width: '300',
  height: '500',
  position: {
    top: '',
    bottom: '',
    left: '',
    right: ''
  },
  data: {
    message: 'Jazzy jazz jazz'
  }
};




openmypopup() {
  if (this.selectedpfs.length?true:false){
    
    if(this.qtypopuvals[0].pf == null)
    {
     for(var i=0;this.selectedpfs.length>i;i++){
      if(i==0)
      {
        this.qtypopuvals[i].pf=this.selectedpfs[i];      
      }else{
        this.qtypopuvals[i]={pf:null ,qty:0};        
        this.qtypopuvals[i].pf=this.selectedpfs[i]; 
      }
     } 
      console.log(this.qtypopuvals);
    }
  this.dialogRef = this.dialog.open(PfqtypopupComponent,this.configmd);
  this.dialogRef.componentInstance.param1 = this.qtypopuvals;
  this.dialogRef.afterClosed().subscribe(result => {
    console.log("hurray");    
    console.log(result);    
    var scriptsum = 0;
    var i = 0;

    //result example: {Natrayans: 5, Nirudhis: 4, Ananthis: 3, Nidha: 2}
    for (var key in result) {
      var scriptsum =scriptsum + parseInt(result[key]);
      this.rForm.patchValue({'quantity': scriptsum});
      this.qtypopuvals[i].pf=key; 
      this.qtypopuvals[i].qty=result[key];
      i++;       
      }
      console.log(this.qtypopuvals); 
     /*qtypopuvals Example : 
     0:{portfolio: "Natrayans", qty: 5}
     1:{portfolio: "Nirudhis", qty: 4}
     2:{portfolio: "Ananthis", qty: 8}
     3:{portfolio: "Nidha", qty: 2}*/
    
    this.dialogRef = null;
});
}
else{
  console.log("inside else");
  this.snackBar.open("Select Portfolios for this order","close", {duration: 5000,verticalPosition:"top",horizontalPosition:"center"});
}
}


/*
Stockwise delete (deleting order id 1)
1) Delete myjsontran[].portfolio.orderid == 1
2) loop myjsonporttran[].data[].orderid==1 then delete
3) loop myjsontosubmit[].orderid == 1 then delete*/


stockwisedelete(Stkwise_del_item){
  //myjsontran = [{"portfolio":["Natrayans","Ananthis"],"data":{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":35,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":false,"orderid":1},"pfpopval":[{"pf":"Natrayans","qty":15},{"pf":"Ananthis","qty":20}]},{"portfolio":["Natrayans","Nirudhis","Ananthis","Nidha"],"data":{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":61,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2},"pfpopval":[{"pf":"Natrayans","qty":18},{"pf":"Nirudhis","qty":16},{"pf":"Ananthis","qty":15},{"pf":"Nidha","qty":12}]}]*/
  
  var Stkwise_del_orderid= Stkwise_del_item.data.orderid;
  var Stkwise_del_tradingsymbol= Stkwise_del_item.data.tradingsymbol;
  var Stkwise_del_portfolio= JSON.stringify(Stkwise_del_item.portfolio);
  var Stkwise_del_for = "sw";
  
  //Delete the item order id from the stock list
  this.Del_itm_frm_sw(Stkwise_del_orderid);
  this.Del_itm_frm_pw(Stkwise_del_orderid,Stkwise_del_tradingsymbol,Stkwise_del_portfolio,Stkwise_del_for);
  this.Del_itm_frm_tosub(Stkwise_del_orderid);


  console.log("Stock wise : "+JSON.stringify(this.myjsontran));
  console.log("Portfolio wise : "+JSON.stringify(this.myjsonporttran));
  console.log("to submit : "+JSON.stringify(this.myjsontosubmit));
  
 /* this code can be used for pf wise deletion
  //set the values to call the necessary functions  
  this.myjsoncpy=Stkwise_del_item;           //JSON object
  this.myjsonpf = Stkwise_del_item.pfpopval; //pop up value ie. pf and qty
  this.values3=Stkwise_del_item.portfolio;   //pf array
  delete this.myjsoncpy.portfolio;  

  this.addportwise();
  this.addtosubmit();*/


}

Del_itm_frm_sw(del_orderid){
  //myjsontran = [{"portfolio":["Natrayans","Ananthis"],"data":{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":35,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":false,"orderid":1},"pfpopval":[{"pf":"Natrayans","qty":15},{"pf":"Ananthis","qty":20}]},{"portfolio":["Natrayans","Nirudhis","Ananthis","Nidha"],"data":{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":61,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2},"pfpopval":[{"pf":"Natrayans","qty":18},{"pf":"Nirudhis","qty":16},{"pf":"Ananthis","qty":15},{"pf":"Nidha","qty":12}]}]*/
  
  var i;
  var del_index;
  for (i = 0; this.myjsontran.length>i;i++){
    if(this.myjsontran[i].data['orderid'] == del_orderid){
      del_index = i;
    }
  }
  this.myjsontran.splice(del_index,1);
  
}


Del_itm_frm_pw(del_orderid,stk_cd,pf_name,del_for){
//portfolio wise Example : myjsonporttran = [{"portfolio":"Natrayans","data":[{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":15,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":false,"orderid":1},{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":18,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2}]},{"portfolio":"Ananthis","data":[{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":20,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":false,"orderid":1},{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":15,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2}]},{"portfolio":"Nirudhis","data":[{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":16,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2}]},{"portfolio":"Nidha","data":[{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":12,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2}]}]
//Easy way to form this is to call the addStocklist() function to from this
if(del_for == "sw"){
  
  var i;
  var j;
  var del_indexi;
  for (i = 0; this.myjsonporttran.length>i;i++){
    
    if(pf_name.indexOf(this.myjsonporttran[i].portfolio)>-1){
      
      for (j = 0; this.myjsonporttran[i].data.length>j;j++){
        
        if(this.myjsonporttran[i].data[j].orderid == del_orderid){
          
            this.myjsonporttran[i].data.splice(j,1);
        }
      }
    }
    if(this.myjsonporttran[i].data.length==0){
      this.myjsonporttran.splice(i,1);
      i=i-1;
    }
}  
}
}

Del_itm_frm_tosub(del_orderid){
    //Easy way to form this is to call the addStocklist() function to from this
// to submit : myjsontosubmit = [{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":35,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":false,"orderid":1},{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":61,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2}]
var i;
var del_indext;
for (i = 0; this.myjsontosubmit.length>i;i++){
  if(this.myjsontosubmit[i].orderid == del_orderid){
    del_indext = i;
  }
}
this.myjsontosubmit.splice(del_indext,1);


}



stockwiseedit(Stkwise_edit_item){
  console.log("inside edit");
  //myjsontran = [{"portfolio":["Natrayans","Ananthis"],"data":{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":35,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":false,"orderid":1},"pfpopval":[{"pf":"Natrayans","qty":15},{"pf":"Ananthis","qty":20}]},{"portfolio":["Natrayans","Nirudhis","Ananthis","Nidha"],"data":{"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"BUY","order_type":"MKT","quantity":61,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"DAY","readonly":null,"orderid":2},"pfpopval":[{"pf":"Natrayans","qty":18},{"pf":"Nirudhis","qty":16},{"pf":"Ananthis","qty":15},{"pf":"Nidha","qty":12}]}]*/

  this.selectedpfs=Stkwise_edit_item.portfolio.slice();   
  var tmpqtypopuvals=Stkwise_edit_item.pfpopval.slice(); 
  console.log(this.selectedpfs);
  console.log(tmpqtypopuvals);

  //delete Stkwise_edit_item.portfolio;
  //delete Stkwise_edit_item.pfpopval;
  Stkwise_edit_item.data['portfolio']=this.selectedpfs;
  console.log(Stkwise_edit_item.data);
  this.rForm.setValue(Stkwise_edit_item.data);  
  this.rForm.patchValue({'quantity': Stkwise_edit_item.data.quantity});
  this.qtypopuvals=tmpqtypopuvals.slice(); 
  console.log("INSIDE EDIT"+this.selectedpfs);
  console.log(this.qtypopuvals);


    //Delete the item order id from the stock list
    this.Del_itm_frm_sw(Stkwise_edit_item.orderid);
    this.Del_itm_frm_pw(Stkwise_edit_item.data.orderid,Stkwise_edit_item.data.tradingsymbol,Stkwise_edit_item.portfolio,"sw");
    this.Del_itm_frm_tosub(Stkwise_edit_item.orderid);

  //Form submit value : {"portfolio":["Natrayans","Ananthis"],"tradingsymbol":"ITC","exchange":"NSE","transaction_type":"trantype","order_type":"ordertype","quantity":35,"product":null,"price":null,"trigger_price":null,"disclosed_quantity":null,"validity":"ordervalidity","readonly":false,"orderid":1}

}

/* Parmaters : orderid, 
               toremove from which array type <numeric code>: --> Parameter Remove from sw-Stockwise or pw-Portfoliowise or ts-Tosubmit or all
               position 1 = Stockwise 2 = Portfoliowise  3 = Tosubmit 
               if stockwise and portfolio are to be searched then 1100.  If all to be searched 0001
               stockcode --> Which stock to remove
               Portfolio to remove --> portfolio name
               deletion triggered for --> sw - stockwise or pw - portfolio wise action
Del_itm_frm_portfol(del_orderid,to_del_frm,stk_cd,pf_name,del_for){

  var del_orderid = del_orderid;
  var to_del_frm = to_del_frm;
  var stk_cd  = stk_cd;
  var pf_name = pf_name;
  var del_for = del_for;

  switch (to_del_frm){
    case "100":   //This to delete it from sw
      this.Del_itm_frm_sw(del_orderid);
    case "110":   //This to delte sw & pw
      this.Del_itm_frm_sw(del_orderid);
      this.Del_itm_frm_pw(del_orderid,stk_cd,pf_name);
    case "111":   //This is to delete all
      this.Del_itm_frm_sw(del_orderid);
      this.Del_itm_frm_pw(del_orderid,stk_cd,pf_name);
      this.Del_itm_frm_tosub(del_orderid);
    case "001":
      this.Del_itm_frm_tosub(del_orderid);
    case "011":
      this.Del_itm_frm_pw(del_orderid,stk_cd,pf_name);
      this.Del_itm_frm_tosub(del_orderid);
    case "101":
      this.Del_itm_frm_sw(del_orderid);
      this.Del_itm_frm_tosub(del_orderid);
    case "010":    
      this.Del_itm_frm_pw(del_orderid,stk_cd,pf_name);
  }


}*/




/*
Stockwise edit (editing order id 1)
Load the data:
1) qtypopuvals = myjsontran[].pfpopval
2) selectedpfs = myjsontran[].portfolio
3) Add data to the respective fields.
  check if rForm = myjsontran[] will work;
On submit button to save edited data:
4) delete the order id from stockwise, portfoliowise and tosubmit
5) Call the addStocklist function

Portfolio edit & delete
<dont allow>*/


}


