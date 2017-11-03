import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
      message: 'Jazzy jazz jazz'
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
    this.dialogRef = this.dialog.open(Dialog1,this.config);
    this.dialogRef.componentInstance.param1 = "test value";
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.dialogRef = null;
  });
}

}



@Component({
  selector: 'dialog1',
  template: `
  <mat-spinner></mat-spinner>
  <!--h2>You are getting connected</h2>
  <p>Test param: {{ param1 }}</p>
  <p>I'm working on a POC app, and I'm trying get the MdDialog component working. Does any one have a working example of what to pass to the MdDialog open method?</p>
  
  <button md-raised-button (click)="dialogRef.close()">Close dialog</button>
  <mat-form-field>
    <input mdInput tabindex="1" [(ngModel)]="data.message">
  </mat-form-field>
<button mat-button [mat-dialog-close]="data" tabindex="2">Ok</button-->
`
})
export class Dialog1 {
  param1: string;
  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}

