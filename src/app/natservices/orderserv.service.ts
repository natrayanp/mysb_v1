import { Injectable } from '@angular/core';
import { DbservicesService } from '../natservices/dbservices.service';
import { NotifyService } from '../natservices/notify.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class OrderservService {

  constructor(private dbserivce :DbservicesService,
              private notify: NotifyService,) { this.selectedfund = {}; }

  mforderdetails;
  //errormessage:string;
  selectedfund: any;
  formref: any;
  selected2: string;
  onfetch = false;
  onsavelater = false;
  ordchanged = "YES";
  //ordchanged= new BehaviorSubject("YES");
  sipamtacrosspf= new BehaviorSubject(0);
  onetimeamtacrosspf = new BehaviorSubject(0);
  

  /*
  private _sipamt = new Subject<any | null>();
  onetimeamtacrosspfob = this._onetimeamt.asObservable();
  sipacrosspfob = this._sipamt.asObservable();
*/
getmforderdata(){
    this.onfetch = true;
    this.dbserivce.dbaction('pforder','fetch','').subscribe(
      data =>
            {        
              this.mforderdetails =data['body'];
              console.log(this.mforderdetails);
              // this.totalpf=this.pfdetails.length;
              // this.pfcpydetails=JSON.parse(JSON.stringify((this.pfdetails)));
              this.onfetch = false;
            },
      error => 
            { 
              this.onfetch = false;
              this.mforderdetails = [];
              this.notify.update(error.message, 'error', 'alert');
            },
      () => {
              this.onfetch = false;
            }
    );
  }


  gettotalacrosspf(){
    let onetimeamtacrosspfs = 0;
    let sipamtacrosspfs = 0;

    console.log('gettotal');
    console.log(this.mforderdetails);
    this.mforderdetails.forEach((cure, inder) => {
      if(cure.pfonetimetotal != null) {
     onetimeamtacrosspfs = onetimeamtacrosspfs + Number(cure.pfonetimetotal);
      }
      if(cure.pfsiptotal != null){
        sipamtacrosspfs = sipamtacrosspfs + Number(cure.pfsiptotal);}
     });
     this.ordchanged = 'YES';
     this.onetimeamtacrosspf.next(onetimeamtacrosspfs);
     this.sipamtacrosspf.next(sipamtacrosspfs);
    // this._onetimeamt.next(this.onetimeamtacrosspf);
     // this._sipamt.next(this.sipamtacrosspf);
  }

  addfund(index, value) {
    console.log(index);
    console.log(value);
    console.log(this.mforderdetails);
    this.mforderdetails.splice(index, 1, value);
  }

  setfund(fundname) {
  console.log(fundname);
  console.log(this.selectedfund);
  if (fundname) {
    this.selectedfund = JSON.parse(JSON.stringify(fundname));
    return (fundname ? fundname.pfportfolioname : undefined);
  }else {
    return undefined;
  }
}

saveorder() {
  this.onsavelater = true;
  this.dbserivce.dbaction('pforder', 'saveforlater', this.mforderdetails).subscribe(
    data =>
          {
            this.getmforderdata();
            // this.mforderdetails = data['body'];
            console.log( data['body']);
            this.onsavelater = false;
          },
    error => 
          { 
            this.onsavelater = false;
            this.mforderdetails = [];
            this.notify.update(error.message, 'error', 'alert');
          },
    () => {
            this.onsavelater = false;
          }
  );
}




}
