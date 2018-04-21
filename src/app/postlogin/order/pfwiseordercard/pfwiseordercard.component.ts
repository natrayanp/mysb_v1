import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { OrderdbservService } from '../../../natservices/orderdbserv.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NotifyService } from '../../../natservices/notify.service';
import { NotificationComponent } from '../../../commonmodule/notificationmodule/notification/notification.component'
import { DbservicesService } from '../../../natservices/dbservices.service';
import { OrderservService } from '../../../natservices/orderserv.service';

@Component({
  selector: 'app-pfwiseordercard',
  templateUrl: './pfwiseordercard.component.html',
  styleUrls: ['./pfwiseordercard.component.scss']
})
export class PfwiseordercardComponent implements OnInit {
  public pfForm : FormGroup;



  summed: number;
  balanceleft = 0;
  onetimeamtacrosspf = 0;
  sipamtacrosspf = 0;
  selected2: string;
  
  // fundnames: string[];
  mfsummed = 0;
  stksummed = 0;
  today = new Date();
  @Input() Mypfdetail;
  @Input() OnAdd;
  @Input() myindex;
  @Input() onEdit;
  @Input() EAMode;
  @Input() fundnames;
  
  
  @Output() cardsave: EventEmitter<any> = new EventEmitter();
   

  Mypfdetailcpy: any;
  OnAddEdit = false;
 
 emptyPayOff = {
      pfstexchange: '',
      pfsttradingsymbl: '',
      pfstltp: 0,
      pfstamt: 0,
      pfstpercent: 0,
      pfstallotedamt: 0,
      pfsttotunit: 0
    };


    emptymf= {
      ormflistid: '',
      orportfolioid: '',
      ormffundname: '',
      ormffndnameedit: 'edit',
      ormfdathold: '',
      ormffundorderlists: ''
    };




 
  constructor(private pffb: FormBuilder,
             // private router: Router,
            //  private notifyservice: NotificationsService,
              private dbserivce: DbservicesService,
              private orderservice: OrderservService, ) { }

  
  ngOnInit() {
    this.pfForm = this.pffb.group({
      pfPortfolioid: [null],
      pfuserid: [null],
      pfScreen: ['ord', Validators.required],
      pfPortfolioname: [null, Validators.required],
      pfPurpose: [null],
      pfBeneUsers: [null, Validators.required],
      pfStartDt: [null, Validators.required],
      pfTargetDt: [null, Validators.required],
      pfTargetIntRate: [null, Validators.required],
      pfPlannedInvAmt: [0, Validators.required],
      // pfInvAmtFeq:[null,Validators.required],
      pfStkAmtsplittype: [null, Validators.required],
      pfmfAmtsplittype: [null, Validators.required],
      pfSummed: [0],
      pfSiptotal: [0],
      pfOnetimetotal: [0],
      pfStocklists: new FormArray([]),
      pfMFlists: new FormArray([])
      });
      this.Mypfdetail['pfscreen'] = 'ord';
    this.Mypfdetailcpy = JSON.parse(JSON.stringify(this.Mypfdetail));

  }

  chtoupper() {
   // this.Mypfdetail.pfportfolioname = this.Mypfdetail.pfportfolioname.toUpperCase();


  /*
    this.dbserivce.dbaction('pfmain', 'fetch', this.Mypfdetail.pfportfolionam )
    .subscribe(
      record => {
                  console.log(record['body']);
                  let fundnamess = record['body'][0];
                  fundnamess.filter(recs => recs.pfportfolionam == );
                  console.log(this.fundnames);
                  let result = allrecord.filter(recs => recs.orMFfundordelsfreq == trigerrec.orMFfundordelsfreq.value && recs.orMFfundordelsstdt ==trigerrec.orMFfundordelsstdt.value);
      }
    )
  */
  }

  /*
  UserEdit(event) {
    this.cardedit.emit(this.myindex);
  }

  pfexecute(event) {
    this.cardexecute.emit(this.myindex);
  }

  FormCardpopulate() {
    this.Mypfdetailcpy = JSON.parse(JSON.stringify(this.Mypfdetail));
  }

  cancel_cardedit(i) {
    event.preventDefault();
    this.onEdit = !this.onEdit;
    this.cardcancel.emit(this.myindex);
  }

save_cardedit(pfFormfrm) {
   this.cardsave.emit(this.Mypfdetailcpy);
}



showex() {
  if (this.Mypfdetailcpy.pfshowadcrtbtn == 'Y') {
    return true;
  }else {
    return false;
  }
}
*/

onetimeonChange() {
  this.orderservice.pforderdetails[this.myindex].pfsiptotal = this.Mypfdetail.pfsiptotal;
  this.orderservice.pforderdetails[this.myindex].pfonetimetotal = this.Mypfdetail.pfonetimetotal;
  this.orderservice.gettotalacrosspf();
  console.log("emiting");
  //this.calctotalamt.emit();
}

pfconfirm(Mypfdetailcpy) {
  // Mypfdetailcpy.pfnameadd = '';
  // this.EAMode = false;
  console.log(Mypfdetailcpy);
  console.log(this.myindex);
  this.orderservice.formref=this.pfForm;
  this.cardsave.emit(this.myindex);
}





}