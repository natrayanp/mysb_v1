import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

declare var FB: any;
declare var window: any;

@Component({
  selector: 'app-fbsignin',
  templateUrl: './fbsignin.component.html',
  styleUrls: ['./fbsignin.component.scss']
})
export class FbsigninComponent  {



  constructor(private router: Router){
    // This function initializes the FB variable 
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  window.fbAsyncInit = () => {
      console.log("fbasyncinit")
      

      FB.init({
          appId            : '1679250072145342',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v2.11'
      });
      FB.AppEvents.logPageView();

      FB.Event.subscribe('auth.statusChange', (response => {
        console.log(response);
        if (response.status === 'connected') {
          console.log(FB.getAuthResponse());
          
          console.log("i am logged in");
          this.printmydet();
          this.router.navigateByUrl('/authchk');

        }
    
    }));


  } 
 
  };

  printmydet(){
    FB.api('/me','GET',{fields:'email'},(response => {
      console.log(response);
    }));
  }

  @Output() FBSignInSuccess: EventEmitter<any> = new EventEmitter();

}
