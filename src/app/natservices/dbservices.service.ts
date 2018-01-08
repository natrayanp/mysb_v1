import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpEvent, HttpInterceptor, HttpHandler,HttpHeaders, HttpRequest} from '@angular/common/http';


import { environment } from '../../environments/environment';

@Injectable()
export class DbservicesService {

  constructor(private http: HttpClient) { }
  apiurl:string;
  action:string;  
  location: string;




dbaction(screen,functionality,data){
  console.log("inside dbaction");
  console.log(screen+functionality);
  switch (screen+functionality) {
    case "FundAllocFetch":
      {
        var apiurl=environment.FundAllocapiUrl + "/" + environment.FundAllocfetch;
        console.log(apiurl);
        return this.http.get(apiurl);
      }
      case "FundAllocSave":
      {
        var apiurl=environment.FundAllocapiUrl + "/" + environment.FundAllocSave;
        return this.http.post(apiurl, JSON.stringify(data),{observe: 'response'});
      }
      case "ClientCreation":
      {
        var apiurl=environment.bsecustUrl + "/" + environment.bseCustcreate;
        return this.http.get(apiurl);
      }
      case "MandateCreation":
      {
        var apiurl=environment.bsemandatetUrl + "/" + environment.bseMandataecreate;
        return this.http.get(apiurl);
      }
      case "SetJwt":
      {
        var apiurl=environment.SetJwtapiUrl + "/" + environment.SetJwtapiSave;
        return this.http.post(apiurl,data,{observe: 'response'});
      }
      case "RecordSignup":
      {
        var apiurl=environment.RecordSignupapiUrl + "/" + environment.RecordSignupapiSave;
        return this.http.post(apiurl,data,{observe: 'response'});
      }
      case "IFSCfetch":
      {
        var apiurl=environment.IFSCfetchapiUrl + "/" + environment.IFSCapifetch;
        return this.http.post(apiurl,data,{observe: 'response'});
      }
      case "notififetch":
      {
          var apiurl=environment.notifiapiUrl + "/" + environment.notififetch;
          return this.http.get(apiurl,{params: data,observe: 'response'});
      }
      case "registfetch":
      {
        console.log('inside reistfetc');
        var apiurl=environment.registapiUrl + "/" + environment.registfetch;
        return this.getmethod(apiurl,{observe: 'response'});
      }
      case "registfrmdetailsave":
      {
        console.log('inside regisdetlfrmsave');
        var apiurl=environment.registfrmapiUrl + "/" + environment.detailsfrmsave;
        return this.postmethod(apiurl,data,{observe: 'response'});
      }
    /*  case "registfrmdetailsave":
      {
        var apiurl=environment.registfrmapiUrl + "/" + environment.detailsfrmsave;
        this.postmethod(apiurl,data,{observe: 'response'});
      }
      case "registfrmdetailsave":
      {
        var apiurl=environment.registfrmapiUrl + "/" + environment.detailsfrmsave;
        this.postmethod(apiurl,data,{observe: 'response'});
      }
      case "registfrmdetailsave":
      {
        var apiurl=environment.registfrmapiUrl + "/" + environment.detailsfrmsave;
        this.postmethod(apiurl,data,{observe: 'response'});
      }*/
      case "registfrmsubmit":
      {
        console.log('inside registfrmsubmit');
        var apiurl=environment.registfrmapiUrl + "/" + environment.regisfrmsubmit;
        return this.postmethod(apiurl,data,{observe: 'response'});
      }

  }



}

postmethod(apiurl,data,param){
  console.log(typeof(data));
  return this.http.post(apiurl,data,param);
}

getmethod(apiurl,param){
  return this.http.get(apiurl,param);
}

}


  