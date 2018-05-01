import { Injectable } from '@angular/core';
import { DbservicesService } from '../natservices/dbservices.service';
import { NotifyService } from '../natservices/notify.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Injectable()
export class OrderservService {

  constructor(private dbserivce: DbservicesService,
              private notify: NotifyService,
              private route: ActivatedRoute,
              private router: Router) { this.selectedfund = {}; }

  mforderdetails;
  // errormessage:string;
  selectedfund: any;
  formref: any;
  selected2: string;
  onfetch = false;
  onsavelater = false;
  ordchanged = 'YES';
  fundnames = [];
  validateprogress= false;
  orderplacment = false;
  validatefail = false;
  bsevalidationfail= false;
  // ordchanged= new BehaviorSubject("YES");
  sipamtacrosspf= new BehaviorSubject(0);
  onetimeamtacrosspf = new BehaviorSubject(0);
  

  /*
  private _sipamt = new Subject<any | null>();
  onetimeamtacrosspfob = this._onetimeamt.asObservable();
  sipacrosspfob = this._sipamt.asObservable();
*/
getmforderdata(){
    this.onfetch = true;
    this.dbserivce.dbaction('mforder', 'fetch', '').subscribe(
      data =>
            {
              this.mforderdetails = data['body'];
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
  this.dbserivce.dbaction('mforder', 'saveforlater', this.mforderdetails).subscribe(
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



getfundnames() {

  this.dbserivce.dbaction('pfmain', 'fetch', this.mforderdetails )
  .subscribe(
    record => {
                console.log('fetchfetch');
                console.log(record['body'][0]);
                console.log(record['body'][0].length);
                if ( record['body'][0].length > 0 ) {
                    this.fundnames = record['body'][0];
                }
              },
    error =>  {
                this.notify.update(error.message, 'error', 'alert');
              }
          ) ;

}


placeorder() {
    this.validateprogress = true;
    this.router.navigate(['securedpg/mfordcof']);
    this.dbserivce.dbaction('mforder', 'validate', this.mforderdetails )
  .subscribe(
    record => {
                console.log('fetchfetch');
                console.log(record['body']);
                if ((record['body'].failure_recs === null || record['body'].failure_recs.length < 1)
                      && (record['body'].success_recs.length > 0) ) {
                  this.submitorder(record['body'].success_recs);
                  this.validateprogress = false;
                  this.orderplacment = true;
                }
                if (record['body'].success_recs.length > 0) {
                  console.log('data error');
                }
              },
    error =>  {
                this.notify.update(error.message, 'error', 'alert');
                this.validateprogress = false;
                this.validatefail = true;
              }
          ) ;

}

submitorder(succrecs) {
  this.validatefail = false;

  console.log(succrecs);
  this.dbserivce.dbaction('mforder', 'submit', succrecs )
  .subscribe(
    record => {
                console.log('submitorder');
                console.log(record['body']);
                if (record['body'].failure_recs === null && (record['body'].success_recs.length > 0) ) {
                  this.order_payment(record['body'].success_recs);
                }
                this.orderplacment = false;
              },
    error =>  {
                this.orderplacment = false;
                this.bsevalidationfail = true;

                this.notify.update(error.message, 'error', 'alert');
              }
          ) ;

}

order_payment(orderrec){
  this.bsevalidationfail = false;

  console.log(orderrec);
  this.dbserivce.dbaction('mforder', 'payment', orderrec )
  .subscribe(
    record => {
                console.log('submitorder');
                console.log(record['body']);
              },
    error =>  {
                this.notify.update(error.message, 'error', 'alert');
              }
          ) ;
}

}
