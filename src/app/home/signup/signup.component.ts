import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../natservices/auth.service';
import { NotifyService } from '../../natservices/notify.service';
import { NotificationComponent } from '../../commonmodule/notificationmodule/notification/notification.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { error } from 'selenium-webdriver';

import { SetjwtService } from '../../natservices/setjwtservice.service';
//import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
//import { Dialog1Component} from './dialog1/dialog1.component';
import { DbservicesService } from '../../natservices/dbservices.service';
import { Signup } from '../../natdatamodel/natdatamodel'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(public auth: AuthService,
    private router: Router,
    private notify: NotifyService,
    private setjwtservice: SetjwtService,
    //public dialog: MatDialog,
    private dbserivce :DbservicesService,
    private fb: FormBuilder ) {
                                this.createSignupForm();
                                this.createuserpasswordForm();
                              }

signcls =Signup;
signupForm: FormGroup;
userpasswdForm:FormGroup;

ngOnInit() {   }

createSignupForm() {
  this.signupForm = this.fb.group({
    name: ['',Validators.compose([Validators.required,Validators.maxLength(70),Validators.pattern(/[A-Za-z]{3,70}/)])],
    adhaar:['', Validators.compose([Validators.required,Validators.maxLength(12),Validators.pattern(/[0-9]{12}/)])],
    pan : ['', Validators.compose([Validators.required, Validators.maxLength(10),Validators.pattern(/[a-zA-Z0-9]{10}/)])],
    mobile : ['', Validators.compose([Validators.required,Validators.maxLength(10),Validators.pattern(/[0-9]{10}/)])]
  });
}


createuserpasswordForm() {
  this.userpasswdForm = this.fb.group({
    email: ['',Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
    password:['', Validators.compose([Validators.required,Validators.maxLength(10),Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])]
  });
}

/*
validateAadharNumber(String aadharNumber){
  Pattern aadharPattern = Pattern.compile("\\d{12}");
  boolean isValidAadhar = aadharPattern.matcher(aadharNumber).matches();
  if(isValidAadhar){
      isValidAadhar = VerhoeffAlgorithm.validateVerhoeff(aadharNumber);
  }
  return isValidAadhar;
}*/

/*    config: MatDialogConfig = {
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

  open() {
    this.dialogRef = this.dialog.open(Dialog1Component,this.config);
    this.dialogRef.componentInstance.param1 = "test value";
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.dialogRef = null;
  });
}

*/

 /// Social Login
signInWithGithub(): void {
this.auth.githubLogin()
.then((user) =>{ 
                  console.log("inside user");
                  this.afterSignIn(user);                     
              }
    );
}

signInWithGoogle(): void {
this.auth.googleLogin()
.then((user) =>{ 
                  console.log("inside user");
                  this.afterSignIn(user);                     
              }
    );
}

signInWithFacebook(): void {
this.auth.facebookLogin()
.then((user) =>{ 
                  console.log("inside user");
                  this.afterSignIn(user);                     
              }
    );
}

signInWithTwitter(): void {
this.auth.twitterLogin()
  .then((user) =>{ 
                    console.log("inside user");
                    this.afterSignIn(user);                     
                }
        );
}


emaillogin(): void {
this.auth.emailLogin(this.userpasswdForm.value['email'], this.userpasswdForm.value['password'])
.then((user) =>{ 
                console.log("inside user");
                this.afterSignIn(user);                     
               }
        );
}

/// Anonymous Sign In
signInAnonymously() {
this.auth.anonymousLogin()
  .then((user) => this.afterSignIn(user));
}

logout(){
this.auth.signOut("nonavigation");    
}


print(){
this.notify.update('Welcome to Firestarter!!!', 'success','alert');
}
/// Shared
private afterSignIn(status): void {
switch(status){
    case "success":{
        this.signupUsers(this.auth.credential.user);
        break;
    }
    case "error":{
         this.notify.update('There is some error!!!'+ this.auth.error.message, 'error','alert');
    }
}
// Do after login stuff here, such router redirects, toast messages, etc.
//this.router.navigate(['/']);

}



signupUsers(natkey) {
this.dbserivce.dbaction('Record','Signup',{"natkey":natkey,"signupvalue":this.signupForm.value}).subscribe(
data =>{
        console.log("inside success dbservice");
        console.log(data);
        var body=data['body'];
        console.log(body);

        if(body.hasOwnProperty('natstatus') && body.hasOwnProperty('statusdetails')){          
          this.notify.update(body.statusdetails,body.natstatus,'alert');
        }
        else{
         this.notify.update("action successful",'success','alert');
        }
        this.signupForm.reset();
        this.userpasswdForm.reset();   

        this.auth.signOut("nonavigation");
      },
error =>{
  console.log("inside success dbservice :error section");
  console.log(error);
  if (error.hasOwnProperty('error')){
    if(error.error.hasOwnProperty('statusdetails')){
      this.notify.update('Error!!!'+ error.error.statusdetails, 'error','alert');
    }else{
      this.notify.update('Error!!!'+ error.statusText, 'error','alert');
    }
  }else{
    this.notify.update('Error!!!'+ error.statusText, 'error','alert');
  }
  this.auth.signOut("nonavigation");
    }
      );

/*
this.setjwtservice.login(natkey)
.subscribe(
  (data) => {
    localStorage.setItem("natjwt",(data['natjwt']));
    window.opener.location="/securedpg/dashboard";               
  }, 
  (error) => {
    console.log('error ' );
  });
}
*/
}



}