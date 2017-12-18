import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DbservicesService } from '../../natservices/dbservices.service';

@Component({
  selector: 'app-fundallocat',
  templateUrl: './fundallocat.component.html',
  styleUrls: ['./fundallocat.component.scss']
})
export class FundallocatComponent implements OnInit {
  natrayans:any;
  displayedColumns = ['Portfolioname','pendingcurrent','pendingpast' ,'allocatedamt', 'blockedamt','newallocation','totalamt'];
  dataSource: MatTableDataSource<any>;
  summed:number = 0;
  unallocated:number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  alocpflists_f:any;
  natcpy:any;

  constructor( private dbserivce :DbservicesService) {
    this.natrayans= {
      alocledgerbal: 2000,
      alocunallocated: 0,
      alocsummed: 0,
      alocpflists: []};
  
    /*
    {
        alocpfname: "Natrayan",
        alocpfallocated :1000,
        alocpfusedtoday:  0,
        alocpfnewallocated: 0,
        alocpftotal: 0
    },
    {
        alocpfname: "kumar",
        alocpfallocated :1000,
        alocpfusedtoday:  0,
        alocpfnewallocated: 0,
        alocpftotal: 0
    }
  ]};*/
    
 

   

  
  }

  ngOnInit(){
    this.getdata();

  }


  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    /*this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    */

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

doSomething(){

  this.natrayans.alocpflists.forEach((item, index) => item.alocpftotal=item.alocpfallocated+item.alocpfnewallocated);
  this.summed=this.natrayans.alocpflists.reduce((acc,cur) => acc + cur.alocpfnewallocated,0);
  this.unallocated = this.natrayans.alocledgerbal-this.summed;
  console.log(this.natrayans.alocpflists);
}

dos(element){
  this.doSomething();
  if(this.unallocated<0){
    element.alocpfnewallocated=0;
    this.doSomething();
  }

}

setzero(){
  this.natrayans.alocpflists.forEach(element => {     
  element.alocpfnewallocated=0;

  });
  
  this.doSomething();
}

getdata(){
  this.dbserivce.dbaction('FundAlloc','Fetch','none').subscribe(
    data =>
          {
            this.alocpflists_f=JSON.stringify(data);
            this.natrayans.alocpflists=JSON.parse(this.alocpflists_f);
            console.log("success fetch");
            console.log(data);
            console.log(this.natrayans);
            this.dataSource = new MatTableDataSource(this.natrayans.alocpflists);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;  
            this.doSomething();              
          }
          );
          
}
/*
addNewAllocAmt(){

  this.natcpy = JSON.parse(JSON.stringify(this.natrayans.alocpflists));
  console.log(this.natcpy);
  for(var i=0; i< this.natcpy.length;i++){
    delete this.natcpy[i].pfportfolioname;
    delete this.natcpy[i].alocpfallocated;
    delete this.natcpy[i].alocpfusedtoday;
    delete this.natcpy[i].alocpftotal;
  }

  
  this.dbserivce.dbaction('FundAlloc','Save',JSON.stringify(this.natcpy)).subscribe(
    data =>
          {
            if((data.body['natstatus']=='success') ) {
              this.getdata();              
              console.log("saved successfully");
              //this.notifyservice.success("Saved successfully",data.body['statusdetails']);
              //this.showcancelalrt=false;
              //this.dberror = false;
              }
          });

}*/
}