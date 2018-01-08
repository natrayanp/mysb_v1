import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../natservices/auth.service';
import { NotifyService } from '../../natservices/notify.service';


@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {

  userpasswdreForm:FormGroup;
  hvcode:boolean;
  passnomatch:boolean = false;

  constructor(private fb: FormBuilder,
              public auth: AuthService) { }

  ngOnInit() {
    this.createloginForm();
  }

  createloginForm() {
    this.userpasswdreForm = this.fb.group({
      email: ['',Validators.compose([Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])],
     /* newpassword:['', Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])],
      confirmPassword:['', Validators.compose([Validators.required,Validators.pattern(/^[A-Za-z](?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?]{7,9}$/)])],
      vericode:['', Validators.required]*/
    });
  }

  tooglehvcode(event){   
    this.hvcode=event.checked;
  }

  verifypass(event){
    console.log('inside');
    if (this.userpasswdreForm.controls['newpassword'].value == this.userpasswdreForm.controls['confirmPassword'].value){
      this.passnomatch= false;
    }else{
      this.passnomatch=true;
    }
    console.log(this.passnomatch);
  }


    emailpasswordreset(){
      this.auth.resetPassword(this.userpasswdreForm.controls['email'].value)
      .then((user) =>{ 
                      this.userpasswdreForm.reset();
                      this.userpasswdreForm.markAsUntouched();
                      this.userpasswdreForm.markAsPristine();
                      
                      console.log('reset email sent');
                    }
          );
      }

       



  }
}


