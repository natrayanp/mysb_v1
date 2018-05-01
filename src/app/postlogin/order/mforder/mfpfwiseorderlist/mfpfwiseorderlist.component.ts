import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NotifyService } from '../../../../natservices/notify.service';
// import { NotificationComponent } from '../../../../commonmodule/notificationmodule/notification/notification.component'
import { DbservicesService } from '../../../../natservices/dbservices.service';
import { OrderservService } from '../../../../natservices/orderserv.service';
import { startWith, tap, delay } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'mfpfwiseorderlist',
  templateUrl: './mfpfwiseorderlist.component.html',
  styleUrls: ['./mfpfwiseorderlist.component.scss']
})
export class mfpfwiseorderlistComponent implements OnInit {

  selectedinvtyp:string[] = [];
  selectedfundlists:string[] = [];
  selectedpfs: string[] = [];
  fundnames = [];
  fundnamescpy = [];
  shofndselect = false;
  onetimeamtacrosspf = 0;
  sipamtacrosspf = 0;
  showit: boolean;
  onAddpfmode= false;
  onAddmfmode= false;
  onfetch= true;
  message1 = "You don't have any portfolio yet.....Click on Add to start your journey";
  editi: number;
  totalpf: number;
  isEAModeon = false;
  editmode = true;

  pfdetails;
  pfcpydetails;

  empty_pfdetails=  {
    pfportfolioid: null,
    pfuserid: null,
    pfscreen:'ord',
    pfnameadd:null,
    pfportfolioname: null,
    pfpurpose: null,
    pfbeneUsers: null,
    pfstartdt: null,
    pftargetdt: null,
    pftargetintrate: null,
    pfplannedinvamt: 0,
    pfinvamtfeq:null,
    pfstkamtsplittype: "%",
    pfmfamtsplittype:"%",
    pfsummed:null,
    pfshowadcrtbtn:"",
    pfsiptotal:0,
    pfonetimetotal:0,
    pfstklist: [
     /* {
        pfstexchange: "",
        pfsttradingsymbl: "",
        pfstltp: 0,
        pfstamt: 0,
        pfstpercent: 0,
        pfstallotedamt: 0,
        pfsttotunit: 0
      }*/
    ],
    pfmflist:[
    /*  {
        pfmffundname: "",
        pfmfnav: 0,
        pfmfamt: 0,
        pfmfpercent: 0,
        pfmfallotedamt: 0
      }*/
    ]
  };


  addonestklst(){
    this.onAddpfmode=!this.onAddpfmode;
  }

  public orForm : FormGroup;

constructor(private orfb: FormBuilder,
            private notify: NotifyService,
            private orderservice: OrderservService,
            private dbserivce: DbservicesService,
            private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    console.log("inside pfwiseorder");
    //this.onfetch=this.orderservice.onfetch;
    this.fetchmforderdata();
    //this.gettotalacrosspf();  
    //this.addPortfolio();
    //this.test();
    
  }
  ngAfterViewChecked(){
    this.getordchanged();
  }

  fetchmforderdata(){
    this.orderservice.getmforderdata();
    //this.pfdetails =this.orderservice.pforderdetails;
    //this.pfcpydetails=JSON.parse(JSON.stringify((this.orderservice.pforderdetails)));    
  }
  
  addNewPortfolio() {
    console.log("inside [] outside");
    console.log(this.fundnames.length==0);

    if (this.fundnames.length === 0){
      console.log("inside []");
      this.dbserivce.dbaction('pfmain', 'fetch', this.orderservice.mforderdetails )
      .subscribe(
        record => {
                    console.log('fetchfetch');
                    console.log(record['body'][0]);
                    console.log(record['body'][0].length);
                    if ( record['body'][0].length > 0 ) {
                        console.log('fetchfetch true');
                        this.fundnames = record['body'][0];
                        this.fundnamescpy = this.fundnames;
                        let dd = JSON.parse(JSON.stringify(this.empty_pfdetails));
                        dd.pfnameadd = 'edit';
                        this.orderservice.mforderdetails.push(dd);
                        this.isEAModeon = true;
                    } else {
                      this.notify.update("All Porfolios' are already in order list","info","alert");
                        this.fundnames.push('allused');
                    }
                  /*  let fundnamess = record['body'][0];
                    fundnamess.filter(recs => recs.pfportfolionam == );
                    console.log(this.fundnames);
                    let result = allrecord.filter(recs => recs.orMFfundordelsfreq == trigerrec.orMFfundordelsfreq.value && recs.orMFfundordelsstdt ==trigerrec.orMFfundordelsstdt.value);*/
        }
      );

    }else if (this.fundnames[0] === 'allused') {
      console.log("inside [] allused");
      this.notify.update("All Porfolios' are already in order list","info","alert");
    
    }else if(this.fundnames.length >0) {
        console.log("inside [] have record");
        let dd = JSON.parse(JSON.stringify(this.empty_pfdetails));
        dd.pfnameadd = 'edit';
        this.orderservice.mforderdetails.push(dd);
        this.isEAModeon = true;
    }
}


cardasave(ind) {
  console.log(ind);
  console.log(this.fundnames);
  console.log(this.orderservice.mforderdetails[ind]);

  const eventrec = this.fundnames.filter(rec => rec.pfportfolioname === this.orderservice.selected2);  
  console.log(eventrec[0]);
  if (eventrec.length === 1) {
    this.orderservice.addfund(ind, eventrec[0]);
    this.orderservice.mforderdetails[ind].pfnameadd = '';
    this.isEAModeon = false;
    // remove the item from fundnames to ensure it has pf's not in order list: START
      let removeitemindex =-1;
      this.fundnames.forEach((cure, inder) => {
        if (cure.pfportfolioname === this.orderservice.selected2) {
          removeitemindex = inder;
        }
      });
      if (removeitemindex !== -1) {
        this.fundnames.splice(removeitemindex, 1);
      }
      if (this.fundnames.length === 0){
        this.fundnames.push('allused');
      }

    // remove the item from fundnames to ensure it has pf's not in order list: START
    } else {
      this.orderservice.formref.controls.pfPortfolioname.setErrors({'nameincorct': true});
    }
}

getordchanged(){  
  if (this.orderservice.ordchanged =="YES"){
    console.log("inside getorderchanged true");
    this.showit = true;
    
  }else{
    console.log("inside getorderchanged false");
    this.showit = false;
  }
  this.cdRef.detectChanges();
}

savordforlater(){
  this.orderservice.saveorder();
  this.orderservice.getfundnames();
  this.fundnames = this.orderservice.fundnames;
  this.showit = false;
}

placeorder(){
  this.orderservice.saveorder();
  this.orderservice.getfundnames();
  this.fundnames = this.orderservice.fundnames;
  this.editmode = false;
}

confirmorder() {
  this.orderservice.placeorder();
}

backbtn(){
  this.showit = true;
  this.editmode = true;
}





}
