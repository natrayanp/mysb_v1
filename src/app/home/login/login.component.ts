import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Dialog1Component} from './dialog1/dialog1.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dialogRef: MatDialogRef<any>;
  constructor(public dialog: MatDialog) { }

  config: MatDialogConfig = {
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
      message: 'Login in Progress'
    }
  };

  ngOnInit() {
  }


  openpop(){
    this.open();
    //var natwindow=window.open("https://kite.trade/connect/login?api_key=uptxfbd1y845rxva", '_blank',"toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=700,height=800");
    var natwindow=window.open("http://localhost:8000/login", '_blank',"toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=700,height=800");
    
  }

  open() {
    this.dialogRef = this.dialog.open(Dialog1Component,this.config);
    this.dialogRef.componentInstance.param1 = "test value";
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.dialogRef = null;
  });
}

}