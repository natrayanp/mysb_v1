import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-pfqtypopup',
  templateUrl: './pfqtypopup.component.html',
  styleUrls: ['./pfqtypopup.component.scss']
})

export class PfqtypopupComponent  {

  popupform: FormGroup;
  param1: any;
  payLoad = '';
  sum:number;
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){
  
  }
 
  calcsum(fieldval){
      this.sum=100;
  }

  //this.popupform=this.param1;

}
