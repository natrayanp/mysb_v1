import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../natservices/auth.service';
import { NotifyService } from '../../natservices/notify.service';
import {NotificationMessageComponent} from '../../commonmodule/notification-message/notification-message.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { error } from 'selenium-webdriver';

import { SetjwtService } from '../../natservices/setjwtservice.service';
//import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Dialog1Component} from './dialog1/dialog1.component';
import { DbservicesService } from '../../natservices/dbservices.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {
    //dialogRef: MatDialogRef<any>;
    userpasswdlgForm:FormGroup;
    constructor(public auth: AuthService,
        private router: Router,
        private notify: NotifyService,
        private setjwtservice: SetjwtService,
        //public dialog: MatDialog,
        private dbserivce :DbservicesService,
        private fb: FormBuilder ) { 
          this.createloginForm();
        }

    ngOnInit() {   }

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

    passwordregex="/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{8,}$/";

    createloginForm() {
      this.userpasswdlgForm = this.fb.group({
        email: ['',Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
        password:['', Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])]
      });
    }
    
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
    //this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
    this.auth.emailLogin("natrayan@gmail.com", "password")
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

  mymessage="Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content. Whenever you need to, be sure to use margin utilities to keep things nice and tidy."

print(){
    this.notify.update(this.mymessage, 'success');
}
  /// Shared
  private afterSignIn(status): void {
    switch(status){
        case "success":{
            this.getUsers(this.auth.credential.user);
            break;
        }
        case "error":{
             this.notify.update('There is some error!!!'+ this.auth.error.message, 'error');
        }
    }
    // Do after login stuff here, such router redirects, toast messages, etc.
    //this.router.navigate(['/']);

  }



getUsers(natkey) {
  this.dbserivce.dbaction('Set','Jwt',{"natkey":natkey}).subscribe(
    data =>{
            console.log("inside success dbservice");
            var body=data['body'];
            console.log(body['natjwt']);
            localStorage.setItem("natjwt",(body['natjwt']));
            this.router.navigateByUrl('/securedpg/dashboard');
          },
    error =>{
      console.log("inside success dbservice");
      console.log(error);
      if (error.hasOwnProperty('error')){
        this.notify.update('Error!!!'+ error.error.statusdetails, 'error');
      }else{
        this.notify.update('Error!!!'+ error.statusText, 'error');
      }
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