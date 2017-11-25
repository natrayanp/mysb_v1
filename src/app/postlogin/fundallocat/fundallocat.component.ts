import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
//import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-fundallocat',
  templateUrl: './fundallocat.component.html',
  styleUrls: ['./fundallocat.component.scss']
})
export class FundallocatComponent implements OnInit {
/*
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

}*/


/*

name = 'Angular 5';
options={
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };
constructor( ) {
    // Create 100 users
  const users: UserData[] = [];
  for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

  // Assign the data to the data source for the table to render
 // this.dataSource = new MatTableDataSource(users);
}

 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
*/
ngOnInit(){

}
/*
displayedColumns = ['id', 'name', 'progress', 'color'];
dataSource: MatTableDataSource<UserData>;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

 applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

addbut(){
 window.alert("addbutton");
}
editbut(){
 window.alert("editbutton");
}


}


/** Builds and returns a new User. */
/*
function createNewUser(id: number): UserData {
const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

return {
  id: id.toString(),
  name: name,
  progress: Math.round(Math.random() * 100).toString(),
  color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
};
}

/** Constants used to fill up our data base. */
/*
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
id: string;
name: string;
progress: string;
color: string;
*/
}

