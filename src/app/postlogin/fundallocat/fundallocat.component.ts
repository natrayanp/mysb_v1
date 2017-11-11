import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-fundallocat',
  templateUrl: './fundallocat.component.html',
  styleUrls: ['./fundallocat.component.scss']
})
export class FundallocatComponent implements OnInit {

  public allocForm : FormGroup;
  allocfrdb: any;
  allocfrdbcpy: any;
    onEdit=true;
constructor(private alocfb: FormBuilder) {}

empty_allocfrdb={
  alocledgerbal: 0,
  alocallocated: 0,
  alocbalance: 0,
  alocsummed: 0,
  alocpflists: [
    {
        alocpfname: "",
        alocpfallocated : 0,
        alocpfblocked:  0,
        alocpfnewallocated: 0,
        alocpftotal:  0
    }
  ]
};

empty_alocpflists={
  alocpfname: "",
  alocpfallocated : 0,
  alocpfblocked:  0,
  alocpfnewallocated: 0,
  alocpftotal:  0
};

ngOnInit(){
  this.allocForm = this.alocfb.group({ 
      alocledgerbal:[0],
      alocallocated:[0],
      alocbalance:[0],
      alocsummed: [0],      
      alocpflists: new FormArray([])  
      });
  
  //Get to get the data from DB : START
  //this.allocfrdb={};
  
  this.allocfrdb={
    alocledgerbal: 1000,
    alocallocated: 100,
    alocbalance: 100,
    alocsummed: 1000,
    alocpflists: [
      {
          alocpfname: "Nattt",
          alocpfallocated : 100,
          alocpfblocked:  0,
          alocpfnewallocated: 0,
          alocpftotal:  100
      },
      {
        alocpfname: "anana",
        alocpfallocated : 100,
        alocpfblocked:  0,
        alocpfnewallocated: 0,
        alocpftotal:  100
    }
    ]};
  //Get to get the data from DB : START
  this.allocfrdbcpy=JSON.parse(JSON.stringify(this.allocfrdb));
  this.populatevalue();
}

initpflistItemRows(payOffObj) {

  return new FormGroup({
      alocpfname : new FormControl(payOffObj.alocpfname),
      alocpfallocated: new FormControl(payOffObj.alocpfallocated),
      alocpfblocked: new FormControl(payOffObj.alocpfblocked),
      alocpfnewallocated: new FormControl(payOffObj.alocpfnewallocated),
      alocpftotal: new FormControl(payOffObj.alocpftotal)      
  });
}


populatevalue(){
  this.allocfrdbcpy=JSON.parse(JSON.stringify(this.allocfrdb));



  if(this.allocfrdbcpy !=null){
   
    if(this.allocfrdbcpy.alocpflists != null){
      
    this.allocfrdbcpy.alocpflists.forEach(
      (aloclist) => {
          console.log(aloclist);
          var scontrol = <FormArray>this.allocForm.controls['alocpflists'];
          
          scontrol.push(this.initpflistItemRows(aloclist)); 

      }
    );
  }
  }

}



addNewPFRow() {
  event.preventDefault(); // ensure this button doesn't try to submit the form

    if(this.allocfrdbcpy.alocpflists == null){
      this.allocfrdbcpy.alocpflists=[];
    }

 this.allocfrdbcpy.alocpflists.push(JSON.parse(JSON.stringify(this.empty_alocpflists)));
    const control = <FormArray>this.allocForm.controls['alocpflists'];
    control.push(this.initpflistItemRows(this.empty_alocpflists));
}


deleteNewPFRow(index: number) {
  this.allocfrdbcpy.alocpflists.splice(index,1);
  const control = <FormArray>this.allocForm.controls['alocpflists'];
  control.removeAt(index);
}

}
